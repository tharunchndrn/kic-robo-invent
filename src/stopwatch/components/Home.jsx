import { useState } from 'react'
import { arenaById } from '../lib/arenas.js'
import { STAGES, STATUS, activeTeam } from '../lib/competition.js'
import { SCREENS, rememberScreen, rememberedScreen } from '../lib/screens.js'
import { useCompetition } from '../hooks/useCompetition.js'
import { useConnection } from '../hooks/useConnection.js'
import Header from './Header.jsx'
import { LiveDot } from './ui.jsx'

/*
 * Event-day launcher. Every machine opens /stopwatch/ and taps its job. Tiles
 * are sized for smart boards and touch screens, and the choice is remembered
 * so the device goes straight to its screen next time.
 */
export default function Home() {
  const online = useConnection()
  const [current, setCurrent] = useState(rememberedScreen)
  const [remember, setRemember] = useState(true)

  const open = (screen) => {
    rememberScreen(remember ? screen.id : null)
    window.location.assign(screen.href)
  }

  const group = (kind) => SCREENS.filter((s) => s.kind === kind || (kind === 'display' && s.kind === 'standings'))

  return (
    <div className="relative min-h-screen bg-paper grain">
      <Header online={online} />

      <main className="relative px-5 sm:px-8 lg:px-12 pt-10 sm:pt-14 pb-20">
        <div className="mx-auto max-w-[1800px]">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
            <div>
              <p className="eyebrow">Grand finale &mdash; stopwatch</p>
              <h1 className="display mt-5 text-[11vw] sm:text-[7vw] lg:text-[4.5vw]">Choose this screen</h1>
            </div>
            <label className="flex items-center gap-4 cursor-pointer select-none panel px-5 py-4">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-6 h-6 accent-[var(--color-flare)]"
              />
              <span className="text-[15px] text-ink-soft max-w-[30ch] leading-snug">
                Open this screen automatically next time on this device
              </span>
            </label>
          </div>

          {current && (
            <p className="mt-6 flex flex-wrap items-center gap-3 text-[15px] text-ink-soft">
              This device opens <span className="text-ink font-semibold">{current.label}</span> automatically.
              <button
                type="button"
                className="ulink"
                onClick={() => {
                  rememberScreen(null)
                  setCurrent(null)
                }}
              >
                Stop that
              </button>
            </p>
          )}

          <section className="mt-12" aria-labelledby="screens-heading">
            <h2 id="screens-heading" className="eyebrow-bare text-ink-mute">
              Wall screens &amp; smart boards
            </h2>
            <div className="mt-5 grid md:grid-cols-3 gap-4 sm:gap-5">
              {group('display').map((s) => (
                <Tile key={s.id} screen={s} current={current?.id === s.id} onOpen={open} primary />
              ))}
            </div>
          </section>

          <section className="mt-12" aria-labelledby="consoles-heading">
            <h2 id="consoles-heading" className="eyebrow-bare text-ink-mute">
              Judges&rsquo; laptops &mdash; runs the clock, needs the passcode
            </h2>
            <div className="mt-5 grid md:grid-cols-2 gap-4 sm:gap-5">
              {group('console').map((s) => (
                <Tile key={s.id} screen={s} current={current?.id === s.id} onOpen={open} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

function Tile({ screen, current, onOpen, primary = false }) {
  const arena = arenaById(screen.arena)

  return (
    <button
      type="button"
      onClick={() => onOpen(screen)}
      className={`frame text-left px-7 sm:px-9 py-8 sm:py-10 min-h-[200px] flex flex-col justify-between gap-8 transition-colors duration-300 hover:border-flare focus-visible:border-flare active:scale-[0.99] ${
        current ? 'border-flare' : ''
      }`}
    >
      <div className="absolute inset-0 paper-grid opacity-50 pointer-events-none" aria-hidden />
      <div className="relative w-full flex items-start justify-between gap-4">
        <span className="eyebrow-bare text-ink-mute">
          {screen.kind === 'console' ? 'Judges’ console' : screen.kind === 'standings' ? 'Both arenas' : 'Display'}
        </span>
        {current && <span className="eyebrow-bare text-flare">This device</span>}
      </div>
      <div className="relative w-full">
        <p className={`display ${primary ? 'text-[44px] sm:text-[52px]' : 'text-[36px] sm:text-[44px]'}`}>
          {arena ? arena.name : 'Standings'}
        </p>
        <div className="mt-4 flex items-center justify-between gap-4">
          {arena ? <ArenaStatus arena={arena} /> : <span className="text-[15px] text-ink-soft">Both arenas ranked together</span>}
          <span className={`btn ${primary ? 'btn-flare' : 'btn-ghost'} h-12 px-6 shrink-0`}>
            Open <span aria-hidden>&#8594;</span>
          </span>
        </div>
      </div>
    </button>
  )
}

function ArenaStatus({ arena }) {
  const { state, synced } = useCompetition({ arena: arena.id })
  const team = activeTeam(state)
  const done = state.teams.filter((t) => t.status === STATUS.completed || t.status === STATUS.dnf).length

  if (!synced) return <span className="text-[15px] text-ink-mute">Connecting…</span>
  return (
    <span className="flex items-center gap-2.5 text-[15px] text-ink-soft min-w-0">
      <LiveDot active={team != null} />
      <span className="truncate">
        {team ? (
          <>
            <span className="text-ink font-semibold">{team.name}</span> &middot; {STAGES[state.run.stageIndex]}
          </>
        ) : (
          <span className="tnum">
            {done} / {state.teams.length} teams run
          </span>
        )}
      </span>
    </span>
  )
}
