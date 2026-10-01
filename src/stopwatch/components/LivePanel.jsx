import { STAGES, activeTeam, lastFinished, partialTotalMs, primaryAction, totalMs } from '../lib/competition.js'
import { formatMs } from '../lib/format.js'
import { isIdle, isRunning } from '../lib/timer.js'
import { useLiveElapsed } from '../hooks/useLiveElapsed.js'
import StageStepper from './StageStepper.jsx'
import { Kbd, LiveDot } from './ui.jsx'

/*
 * The operator's main surface: who's on, which stage, the clock, and every
 * control for the run. The clock is sized to be read from across the room.
 */
export default function LivePanel({ state, onPrimary, onCommand }) {
  const team = activeTeam(state)
  const run = state.run
  const running = isRunning(run?.clock)
  const paused = run != null && !running
  const ready = run != null && isIdle(run.clock)
  const primary = primaryAction(state)
  const upNext = !run ? state.teams.find((t) => t.id === state.selectedTeamId) : null
  const last = !run ? lastFinished(state.teams) : null
  const anyQueued = state.teams.some((t) => t.status === 'queued')

  const clockRef = useLiveElapsed(run?.clock ?? null)
  const totalRef = useLiveElapsed(run?.clock ?? null, { offsetMs: team ? partialTotalMs(team) : 0 })

  const shown = team ?? upNext

  return (
    <section className="frame bleed-warm-soft" aria-label="Live timer">
      <div className="absolute inset-0 paper-grid opacity-60 pointer-events-none" aria-hidden />

      <div className="relative px-5 sm:px-8 lg:px-12 py-7 sm:py-10">
        {/* Who's on */}
        <div className="grid lg:grid-cols-12 gap-x-10 gap-y-7 items-end">
          <div className="lg:col-span-6 min-w-0">
            <span className="flex items-center gap-2.5">
              <LiveDot active={running} />
              <span className="eyebrow-bare text-ink-mute">
                {run ? `${ready ? 'Ready' : paused ? 'Paused' : 'Now running'} — ${STAGES[run.stageIndex]}` : anyQueued ? 'Up next' : 'Standby'}
              </span>
            </span>
            <h1 className="display mt-4 text-[40px] sm:text-[56px] lg:text-[64px] truncate" title={shown?.name}>
              {shown?.name ?? (anyQueued ? 'Pick a team' : 'Queue empty')}
            </h1>
            {shown && (shown.number || shown.school) && (
              <p className="mt-2 font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute truncate">
                {[shown.number && `No. ${shown.number}`, shown.school].filter(Boolean).join(' · ')}
              </p>
            )}
          </div>

          <div className="lg:col-span-6">
            <StageStepper stages={team?.stages} activeIndex={run?.stageIndex ?? null} paused={paused} ready={ready} />
          </div>
        </div>

        {/* Clock */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <span
            ref={clockRef}
            role="timer"
            aria-label="Stage time"
            className={`font-display font-semibold tnum leading-[0.8] tracking-[-0.05em] text-[clamp(4.5rem,16vw,15rem)] transition-colors duration-300 ${
              running ? 'text-ink-deep' : paused ? 'text-ink-mute' : 'text-ink-faint'
            }`}
          />
          <div className="pb-2 sm:pb-4">
            <p className="eyebrow-bare text-ink-faint">Run total</p>
            <span ref={totalRef} className="mt-2 block font-mono tnum text-2xl sm:text-3xl text-ink-soft" />
          </div>
        </div>

        <div className="mt-8 hairline" />

        {/* Controls */}
        <div className="mt-6 flex flex-col xl:flex-row xl:items-center gap-4 xl:gap-8">
          <button
            type="button"
            onClick={onPrimary}
            disabled={!primary}
            className="btn btn-flare h-16 sm:h-[72px] px-8 sm:px-10 text-[13px] sm:text-sm xl:min-w-[280px] disabled:opacity-40 disabled:pointer-events-none"
          >
            {primary?.label ?? 'Start run'}
            <Kbd>Space</Kbd>
          </button>

          {run ? (
            <div className="flex flex-wrap gap-2.5">
              {!ready && (
                <button type="button" className="btn btn-ghost" onClick={() => onCommand('togglePause')}>
                  {running ? 'Pause' : 'Resume'} <Kbd>P</Kbd>
                </button>
              )}
              {paused && run.clock.accumulatedMs > 0 && (
                <button type="button" className="btn btn-ghost" onClick={() => onCommand('finishStage')}>
                  Finish stage
                </button>
              )}
              <button type="button" className="btn btn-ghost" onClick={() => onCommand('resetStage')}>
                Reset stage
              </button>
              <button type="button" className="btn btn-ghost hover:bg-violet hover:border-violet hover:text-carbon" onClick={() => onCommand('dnfStage')}>
                DNF stage
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => onCommand('endRun')}>
                End run
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => onCommand('cancelRun')}>
                Cancel run
              </button>
            </div>
          ) : (
            <p className="text-[14.5px] leading-relaxed text-ink-soft max-w-[52ch]">
              {state.teams.length === 0
                ? 'Add a team below to get started.'
                : upNext
                  ? <>Press <Kbd>Space</Kbd> when the robot leaves the start line. Each later stage waits for you to start it.</>
                  : anyQueued
                    ? 'Pick a queued team from the table below.'
                    : 'Every team has run. Add another, or re-run one from the table below.'}
              {last && (
                <span className="block mt-1.5 text-ink-mute">
                  Last run: <span className="text-ink">{last.name}</span> &mdash;{' '}
                  <span className="tnum font-mono">{totalMs(last) != null ? formatMs(totalMs(last)) : 'DNF'}</span>
                </span>
              )}
            </p>
          )}
        </div>

        <p className="mt-5 font-mono text-[10px] tracking-[0.14em] uppercase text-ink-faint">
          <Kbd>Space</Kbd> {run ? 'finish stage / start' : 'start run'} &nbsp;·&nbsp; <Kbd>P</Kbd> pause / resume
        </p>
      </div>
    </section>
  )
}
