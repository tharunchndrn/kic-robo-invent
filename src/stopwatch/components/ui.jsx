import { useEffect, useRef } from 'react'
import { STATUS } from '../lib/competition.js'

/* Small pieces shared across the operator and audience views. */

const statusStyles = {
  [STATUS.queued]: 'border-rule text-ink-mute',
  [STATUS.running]: 'border-flare bg-flare text-carbon',
  [STATUS.completed]: 'border-moss/50 text-moss',
  [STATUS.dnf]: 'border-violet/50 text-violet',
}

const statusLabels = {
  [STATUS.queued]: 'Queued',
  [STATUS.running]: 'Running',
  [STATUS.completed]: 'Completed',
  [STATUS.dnf]: 'DNF',
}

export function StatusChip({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] uppercase border rounded-full px-2.5 py-1 whitespace-nowrap ${statusStyles[status]}`}
    >
      {status === STATUS.running && <span className="w-1.5 h-1.5 rounded-full bg-carbon animate-pulse" aria-hidden />}
      {statusLabels[status]}
    </span>
  )
}

export function Kbd({ children }) {
  return (
    <kbd className="font-mono text-[10px] tracking-[0.08em] uppercase border border-current/30 rounded-md px-1.5 py-0.5 leading-none opacity-80">
      {children}
    </kbd>
  )
}

/** The pulsing dot used by the site's countdown, for anything live. */
export function LiveDot({ active = true }) {
  return (
    <span className="relative flex w-2 h-2">
      {active && <span className="absolute inset-0 rounded-full bg-flare opacity-60 animate-ping" />}
      <span className={`relative w-2 h-2 rounded-full ${active ? 'bg-flare' : 'bg-ink-faint'}`} />
    </span>
  )
}

/*
 * Native <dialog> — it brings focus trapping, Esc-to-close and the top layer
 * for free. Contents unmount while closed so form state starts fresh.
 */
export function Dialog({ open, onClose, title, children }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-label={title}
      className="m-auto w-[min(92vw,480px)] rounded-panel bg-card text-ink border border-rule p-0 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)] backdrop:bg-void/75 backdrop:backdrop-blur-sm"
    >
      {open && (
        <div className="p-7 sm:p-8">
          <p className="eyebrow-bare text-ink-mute">{title}</p>
          {children}
        </div>
      )}
    </dialog>
  )
}

/** `request` is { title, heading, body, confirmLabel, onConfirm } or null. */
export function ConfirmDialog({ request, onClose }) {
  return (
    <Dialog open={request != null} onClose={onClose} title={request?.title ?? 'Confirm'}>
      {request && (
        <>
          <p className="mt-4 display text-[26px] sm:text-[30px]">{request.heading}</p>
          {request.body && <div className="mt-4 text-[15px] leading-relaxed text-ink-soft">{request.body}</div>}
          <div className="mt-8 flex flex-wrap justify-end gap-3">
            <button type="button" className="btn btn-ghost" onClick={onClose} autoFocus>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-flare"
              onClick={() => {
                request.onConfirm()
                onClose()
              }}
            >
              {request.confirmLabel ?? 'Confirm'}
            </button>
          </div>
        </>
      )}
    </Dialog>
  )
}

/** Section header in the site's style: numbered eyebrow, heading left, aside right. */
export function SectionHead({ index, label, title, children }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
      <div>
        <p className="eyebrow">
          {index} &mdash; {label}
        </p>
        <h2 className="display mt-4 text-[34px] sm:text-[44px]">{title}</h2>
      </div>
      {children && <div className="flex flex-wrap items-center gap-2.5">{children}</div>}
    </div>
  )
}

/** Small arena marker for lists that mix both arenas. */
export function ArenaTag({ id, big = false }) {
  return (
    <span
      className={`inline-flex items-center justify-center align-middle font-mono font-medium border border-rule text-ink-mute rounded-md mr-2 -mt-0.5 ${
        big ? 'text-sm px-2 py-0.5' : 'text-[10px] px-1.5 py-0.5'
      }`}
      title={`Arena ${id}`}
    >
      {id}
    </span>
  )
}

/** Live / offline status of this page's link to Firebase. */
export function ConnectionBadge({ online, detail }) {
  const state = online == null ? 'connecting' : online ? 'live' : 'offline'
  const label = { connecting: 'Connecting', live: 'Synced', offline: 'Offline' }[state]
  return (
    <span
      title={detail ?? (state === 'offline' ? 'Saving on this device — will sync when the connection returns' : undefined)}
      className={`inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] uppercase rounded-full border px-3 py-1.5 whitespace-nowrap ${
        state === 'live' ? 'border-moss/40 text-moss' : state === 'offline' ? 'border-violet/50 text-violet' : 'border-rule text-ink-mute'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${state === 'live' ? 'bg-moss' : state === 'offline' ? 'bg-violet animate-pulse' : 'bg-ink-faint animate-pulse'}`} />
      {label}
    </span>
  )
}
