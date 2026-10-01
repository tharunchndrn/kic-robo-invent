import { STAGES } from '../lib/competition.js'
import { formatMs } from '../lib/format.js'

/*
 * Three-step progress rail: Easy → Medium → Hard. Each step shows its
 * recorded time once closed, "Live" while running, and a rule underneath
 * that fills as the run advances.
 */
function stepState(stage, index, activeIndex) {
  if (stage?.status === 'done') return 'done'
  if (stage?.status === 'dnf') return 'dnf'
  if (index === activeIndex) return 'live'
  return 'pending'
}

const tone = {
  done: { bar: 'bg-moss', label: 'text-ink', value: 'text-moss' },
  dnf: { bar: 'bg-violet', label: 'text-ink-soft', value: 'text-violet' },
  live: { bar: 'bg-flare', label: 'text-ink', value: 'text-flare' },
  pending: { bar: 'bg-rule', label: 'text-ink-faint', value: 'text-ink-faint' },
}

export default function StageStepper({ stages, activeIndex = null, paused = false, ready = false, size = 'md' }) {
  const big = size === 'lg'

  return (
    <ol className="grid grid-cols-3 gap-2 sm:gap-3" aria-label="Stage progress">
      {STAGES.map((name, i) => {
        const state = stepState(stages?.[i], i, activeIndex)
        const t = tone[state]
        const value =
          state === 'done' ? formatMs(stages[i].ms)
          : state === 'dnf' ? 'DNF'
          : state === 'live' ? (ready ? 'Ready' : paused ? 'Paused' : 'Live')
          : 'Pending'

        return (
          <li key={name} aria-current={state === 'live' ? 'step' : undefined}>
            <div className={`h-1 rounded-full ${t.bar} ${state === 'live' && !paused ? 'animate-pulse' : ''}`} />
            <div className="mt-3 flex items-baseline gap-2">
              <span className={`font-mono tnum ${big ? 'text-xs sm:text-sm' : 'text-[10px]'} text-ink-faint`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={`font-display font-bold uppercase tracking-[-0.02em] ${big ? 'text-xl sm:text-3xl lg:text-4xl' : 'text-base sm:text-lg'} ${t.label}`}
              >
                {name}
              </span>
            </div>
            <p
              className={`mt-1 font-mono tnum uppercase tracking-[0.08em] ${big ? 'text-base sm:text-xl lg:text-2xl' : 'text-[12px] sm:text-[13px]'} ${t.value}`}
            >
              {value}
            </p>
          </li>
        )
      })}
    </ol>
  )
}
