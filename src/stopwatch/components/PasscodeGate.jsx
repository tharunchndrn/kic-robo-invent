import { useState } from 'react'
import { savePasscode, verifyPasscode } from '../lib/firebase.js'
import { LAUNCHER_HREF } from '../lib/screens.js'

/*
 * Judges' consoles change results, so they need the event passcode once per
 * device. The database rules check it on every write; this screen just
 * confirms it before handing over the controls.
 */
export default function PasscodeGate({ arena, onUnlock }) {
  const [code, setCode] = useState('')
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    const value = code.trim()
    if (!value) return setError('Enter the event passcode.')
    setChecking(true)
    setError('')
    try {
      await verifyPasscode(arena.id, value)
      savePasscode(value)
      onUnlock(value)
    } catch (err) {
      setError(/permission/i.test(err?.message ?? '') ? 'That passcode isn’t right.' : 'Couldn’t reach the server — check the connection and try again.')
    } finally {
      setChecking(false)
    }
  }

  return (
    <main className="relative px-3 sm:px-5 pt-10 sm:pt-16 pb-20">
      <form onSubmit={submit} className="frame mx-auto max-w-[560px] px-7 sm:px-10 py-10 sm:py-12" noValidate>
        <div className="absolute inset-0 paper-grid opacity-50 pointer-events-none" aria-hidden />
        <div className="relative">
          <p className="eyebrow">Judges&rsquo; console &mdash; {arena.name}</p>
          <h1 className="display mt-5 text-[38px] sm:text-[48px]">Enter passcode</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-soft max-w-[40ch]">
            Only judges&rsquo; consoles can start the clock or change times. This device remembers the passcode after
            the first time.
          </p>

          <label className="mt-9 block">
            <span className="field-label">Event passcode</span>
            <input
              type="password"
              value={code}
              onChange={(e) => {
                setCode(e.target.value)
                setError('')
              }}
              autoFocus
              autoComplete="current-password"
              className="field mt-2 font-mono text-lg tracking-[0.12em]"
              aria-invalid={error ? true : undefined}
            />
          </label>
          {error && <p role="alert" className="mt-3 text-[13.5px] text-violet">{error}</p>}

          <div className="mt-9 flex flex-wrap items-center justify-between gap-4">
            <a href={LAUNCHER_HREF} className="ulink text-[14px]">
              Choose another screen
            </a>
            <button type="submit" className="btn btn-flare" disabled={checking}>
              {checking ? 'Checking…' : 'Unlock console'}
            </button>
          </div>
        </div>
      </form>
    </main>
  )
}
