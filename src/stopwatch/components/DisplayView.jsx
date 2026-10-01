import { RoboInventLockup } from '../../components/BrandLogo'
import { partialTotalMs } from '../lib/competition.js'
import { displayReading } from '../lib/display.js'
import { formatMs } from '../lib/format.js'
import { useCompetition } from '../hooks/useCompetition.js'
import { useConnection } from '../hooks/useConnection.js'
import { useFullscreen } from '../hooks/useFullscreen.js'
import { useLiveElapsed } from '../hooks/useLiveElapsed.js'
import Leaderboard from './Leaderboard.jsx'
import ScreenControls from './ScreenControls.jsx'
import StageStepper from './StageStepper.jsx'
import { ConnectionBadge, LiveDot } from './ui.jsx'

// Status word above the clock, and the clock's colour, per display mode.
const look = {
  running: { word: 'Running', word_c: 'text-flare', clock: 'text-ink-deep' },
  paused: { word: 'Paused', word_c: 'text-ink-mute', clock: 'text-ink-mute' },
  stopped: { word: 'Stopped', word_c: 'text-moss', clock: 'text-moss' },
  ready: { word: 'Ready', word_c: 'text-ink-soft', clock: 'text-ink-faint' },
  finished: { word: 'Finished', word_c: 'text-flare', clock: 'text-flare' },
  idle: { word: 'Up next', word_c: 'text-ink-mute', clock: 'text-ink-faint' },
}

function caption(r) {
  switch (r.mode) {
    case 'running':
      return `${r.label} stage`
    case 'paused':
      return `${r.label} stage — paused`
    case 'stopped':
      return `${r.label} ${r.dnf ? 'did not finish' : 'time'} · ${r.next} next`
    case 'ready':
      return `${r.label} stage — waiting to start`
    case 'finished':
      return r.dnf ? 'Run did not finish' : 'Total time'
    default:
      return 'Waiting for the first run'
  }
}

/*
 * One arena's big screen — a smart board or projector beside the arena,
 * mostly read by the judges. The clock fills the width, and it always holds
 * a meaningful number: when a stage stops, its time stays up until the next
 * stage starts; when a run ends, its total stays up until the next run.
 *
 * Mirrors the arena from Firebase and derives the clock from shared
 * server-time stamps, so it matches the judges' console even if this
 * machine's clock is off. Tap anywhere to go full screen.
 */
export default function DisplayView({ arena }) {
  const online = useConnection()
  const { state, synced } = useCompetition({ arena: arena.id })
  const [fullscreen, toggleFullscreen] = useFullscreen()

  const r = displayReading(state)
  const t = look[r.mode]
  const live = r.clock ?? null
  const inRun = ['running', 'paused', 'stopped', 'ready'].includes(r.mode)

  const clockRef = useLiveElapsed(live)
  const totalRef = useLiveElapsed(live, { offsetMs: inRun ? partialTotalMs(r.team) : 0 })

  return (
    <div
      className="relative h-dvh min-h-[600px] bg-paper grain flex flex-col overflow-hidden select-none"
      onClick={() => !fullscreen && toggleFullscreen()}
    >
      <div className="absolute inset-0 bleed-warm-soft pointer-events-none" aria-hidden />
      <div className="absolute inset-0 paper-grid opacity-50 pointer-events-none" aria-hidden />

      {/* Arena + controls */}
      <header className="relative flex items-center justify-between gap-6 px-[3vw] pt-[2.5vh]">
        <div className="flex items-center gap-[2vw] min-w-0">
          <RoboInventLockup className="h-[clamp(2.5rem,5.5vh,4.5rem)] w-auto" />
          <span className="h-[5vh] w-px bg-rule" aria-hidden />
          <span className="display text-[clamp(2rem,5.5vh,4.5rem)] text-flare whitespace-nowrap">{arena.name}</span>
        </div>
        <div className="flex items-center gap-4">
          {(online === false || !synced) && <ConnectionBadge online={synced ? online : null} />}
          <ScreenControls fullscreen={fullscreen} onToggleFullscreen={toggleFullscreen} />
        </div>
      </header>

      {/* Landscape boards: team, clock and stages down the left two-thirds
          (three-quarters on wide boards),
          the arena's top 5 down the right — beside the clock, not under it,
          so the standings never take height away from the time. Portrait and
          small screens stack everything in one column. */}
      <main className="relative flex-1 min-h-0 grid grid-rows-[auto_minmax(0,1fr)_auto_auto] lg:landscape:grid-cols-12 lg:landscape:grid-rows-[auto_minmax(0,1fr)_auto] gap-x-[3vw] 2xl:gap-x-[2.5vw] gap-y-[2.5vh] px-[3vw] pt-[3vh] pb-[3.5vh]">
        {/* Who and what state */}
        <div className="lg:landscape:col-span-8 2xl:landscape:col-span-9 min-w-0 flex items-end justify-between gap-8 portrait:flex-col portrait:items-start portrait:gap-[2vh]">
          <div className="min-w-0 max-w-full">
            <p className={`flex items-center gap-3 font-mono font-semibold uppercase tracking-[0.2em] text-[clamp(1rem,3.2vh,2.25rem)] ${t.word_c}`}>
              {r.mode === 'running' && <LiveDot />}
              {t.word}
            </p>
            <h1 className="display mt-[1.2vh] text-[length:clamp(2rem,min(8.5vh,7.5vw),8rem)] truncate">{r.team?.name ?? 'Robo-Invent 2026'}</h1>
            {r.team?.school && (
              <p className="mt-[0.8vh] font-mono text-[clamp(0.85rem,2vh,1.5rem)] tracking-[0.14em] uppercase text-ink-mute truncate">
                {r.team.school}
              </p>
            )}
          </div>
          {inRun && (
            <div className="shrink-0 text-right portrait:text-left pb-[0.5vh]">
              <p className="eyebrow-bare text-ink-faint text-[clamp(0.7rem,1.5vh,1rem)]">Run total</p>
              <span ref={totalRef} className="mt-[0.8vh] block font-mono tnum text-[clamp(1.5rem,5vh,4rem)] text-ink-soft" />
            </div>
          )}
        </div>

        {/* Arena standings */}
        <aside className="order-last lg:landscape:order-none lg:landscape:col-span-4 2xl:landscape:col-span-3 lg:landscape:row-span-3 min-w-0 flex flex-col justify-end">
          <p className="eyebrow">{arena.name} &mdash; top 5</p>
          <div className="mt-3 border-t border-rule">
            <Leaderboard teams={state.teams} limit={5} size="compact" emptyText="Finished runs appear here." />
          </div>
        </aside>

        {/* The clock. Its box is a size container, so the digits scale to the
            space it actually has and can never spill over the rows around it.
            Clock and caption sit near the top of that space, close to the
            team name, with any spare height left above the stage row. */}
        <div className="lg:landscape:col-span-8 2xl:landscape:col-span-9 min-h-0 [container-type:size] flex flex-col justify-start pt-[2.5vh]">
          <span
            ref={live ? clockRef : undefined}
            key={live ? 'live' : 'held'}
            role="timer"
            className={`block font-display font-semibold tnum leading-[0.8] tracking-[-0.05em] text-[length:min(26.6cqw,calc(100cqh-10vh))] ${
              r.dnf ? 'text-violet' : t.clock
            }`}
          >
            {live ? null : r.dnf ? 'DNF' : formatMs(r.ms ?? 0)}
          </span>
          <p className="shrink-0 mt-[3vh] font-mono uppercase tracking-[0.16em] text-[clamp(0.9rem,2.6vh,2rem)] text-ink-soft truncate">
            {caption(r)}
            {r.mode === 'finished' && r.upNext && (
              <span className="text-ink-mute"> &nbsp;·&nbsp; Up next: <span className="text-ink">{r.upNext.name}</span></span>
            )}
          </p>
        </div>

        {/* Stages */}
        <div className="lg:landscape:col-span-8 2xl:landscape:col-span-9">
          <StageStepper
            stages={r.team?.stages}
            activeIndex={r.stageIndex}
            paused={r.mode === 'paused' || r.mode === 'stopped' || r.mode === 'ready'}
            ready={r.mode === 'stopped' || r.mode === 'ready'}
            size="lg"
          />
        </div>
      </main>

      {!fullscreen && (
        <p className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.16em] uppercase text-ink-faint pointer-events-none">
          Tap anywhere for full screen
        </p>
      )}
    </div>
  )
}
