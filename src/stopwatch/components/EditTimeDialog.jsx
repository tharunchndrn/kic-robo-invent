import { useState } from 'react'
import { STAGES } from '../lib/competition.js'
import { formatMs, parseTime } from '../lib/format.js'
import { Dialog } from './ui.jsx'

const describe = (stage) => (stage?.status === 'done' ? formatMs(stage.ms) : 'DNF')

/*
 * Two steps on purpose: type the correction, then confirm it against the
 * original. A recorded time only changes after the operator has seen both.
 * `target` is { team, stageIndex } or null.
 */
export default function EditTimeDialog({ target, onClose, onSave }) {
  return (
    <Dialog open={target != null} onClose={onClose} title="Correct a time">
      {target && <EditTimeForm key={`${target.team.id}-${target.stageIndex}`} {...target} onClose={onClose} onSave={onSave} />}
    </Dialog>
  )
}

function EditTimeForm({ team, stageIndex, onClose, onSave }) {
  const current = team.stages[stageIndex]
  const [mode, setMode] = useState(current?.status === 'dnf' ? 'dnf' : 'done')
  const [text, setText] = useState(current?.status === 'done' ? formatMs(current.ms) : '')
  const [pending, setPending] = useState(null)
  const [error, setError] = useState('')

  const review = (e) => {
    e.preventDefault()
    if (mode === 'dnf') return setPending({ status: 'dnf' })
    const ms = parseTime(text)
    if (ms == null) return setError('Use mm:ss.cc — for example 01:23.45 or 83.45')
    setPending({ status: 'done', ms })
  }

  if (pending) {
    return (
      <>
        <p className="mt-4 display text-[26px] sm:text-[30px]">Confirm correction</p>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
          {team.name} &middot; {STAGES[stageIndex]}
        </p>
        <div className="mt-5 flex items-baseline gap-4 font-mono tnum text-2xl">
          <span className="text-ink-mute line-through decoration-1">{describe(current)}</span>
          <span aria-hidden className="text-ink-faint text-base">&rarr;</span>
          <span className="text-flare">{describe(pending)}</span>
        </div>
        <div className="mt-8 flex flex-wrap justify-end gap-3">
          <button type="button" className="btn btn-ghost" onClick={() => setPending(null)}>
            Back
          </button>
          <button
            type="button"
            className="btn btn-flare"
            autoFocus
            onClick={() => {
              onSave(team.id, stageIndex, pending)
              onClose()
            }}
          >
            Save correction
          </button>
        </div>
      </>
    )
  }

  return (
    <form onSubmit={review} noValidate>
      <p className="mt-4 display text-[26px] sm:text-[30px]">
        {team.name} &mdash; {STAGES[stageIndex]}
      </p>
      <p className="mt-3 text-[14.5px] text-ink-soft">
        Recorded: <span className="font-mono tnum text-ink">{describe(current)}</span>
      </p>

      <fieldset className="mt-6 flex gap-2">
        <legend className="sr-only">Result</legend>
        {[
          { value: 'done', label: 'Time' },
          { value: 'dnf', label: 'DNF' },
        ].map((opt) => (
          <label
            key={opt.value}
            className={`btn cursor-pointer px-5 py-2.5 ${mode === opt.value ? 'btn-solid' : 'btn-ghost'}`}
          >
            <input
              type="radio"
              name="mode"
              value={opt.value}
              checked={mode === opt.value}
              onChange={() => {
                setMode(opt.value)
                setError('')
              }}
              className="sr-only"
            />
            {opt.label}
          </label>
        ))}
      </fieldset>

      {mode === 'done' && (
        <label className="mt-6 block">
          <span className="field-label">Corrected time (mm:ss.cc)</span>
          <input
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              setError('')
            }}
            autoFocus
            inputMode="decimal"
            autoComplete="off"
            className="field mt-2 font-mono tnum text-2xl"
            aria-invalid={error ? true : undefined}
          />
        </label>
      )}
      {error && <p role="alert" className="mt-3 text-[13.5px] text-violet">{error}</p>}

      <div className="mt-8 flex flex-wrap justify-end gap-3">
        <button type="button" className="btn btn-ghost" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn-flare">
          Review change
        </button>
      </div>
    </form>
  )
}
