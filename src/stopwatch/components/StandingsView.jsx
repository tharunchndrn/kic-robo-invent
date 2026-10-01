import { RoboInventLockup } from '../../components/BrandLogo'
import { ARENAS, combineTeams } from '../lib/arenas.js'
import { STAGES, activeTeam, partialTotalMs } from '../lib/competition.js'
import { isIdle, isRunning } from '../lib/timer.js'
import { useCompetition } from '../hooks/useCompetition.js'
import { useConnection } from '../hooks/useConnection.js'
import { useFullscreen } from '../hooks/useFullscreen.js'
import { useLiveElapsed } from '../hooks/useLiveElapsed.js'
import Leaderboard from './Leaderboard.jsx'
import ScreenControls from './ScreenControls.jsx'
import { ConnectionBadge, LiveDot } from './ui.jsx'

const PER_COLUMN = 10

/*
 * Main-screen board: both arenas ranked together on total time, with a live
 * strip showing what each arena is running right now.
 */
export default function StandingsView() {
  const online = useConnection()
  const arenaA = useCompetition({ arena: 'A' })
  const arenaB = useCompetition({ arena: 'B' })
  const byArena = { A: arenaA.state, B: arenaB.state }
  const teams = combineTeams(byArena)
  const [fullscreen, toggleFullscreen] = useFullscreen()

  return (
    <div
      className="relative min-h-screen bg-paper grain flex flex-col overflow-hidden select-none"
      onClick={() => !fullscreen && toggleFullscreen()}
    >
      <div className="absolute inset-0 bleed-warm-soft pointer-events-none" aria-hidden />
      <div className="absolute inset-0 paper-grid opacity-50 pointer-events-none" aria-hidden />

      <header className="relative flex items-center justify-between gap-6 px-6 sm:px-10 lg:px-14 pt-6 sm:pt-8">
        <div className="flex items-center gap-5 sm:gap-7 min-w-0">
          <RoboInventLockup className="h-10 sm:h-14 w-auto" />
          <span className="h-10 w-px bg-rule" aria-hidden />
          <span className="display text-2xl sm:text-4xl whitespace-nowrap">Overall standings</span>
        </div>
        <div className="flex items-center gap-4">
          {online === false && <ConnectionBadge online={online} />}
          <ScreenControls fullscreen={fullscreen} onToggleFullscreen={toggleFullscreen} />
        </div>
      </header>

      <div className="relative grid sm:grid-cols-2 gap-4 sm:gap-6 px-6 sm:px-10 lg:px-14 mt-8">
        {ARENAS.map((a) => (
          <ArenaStrip key={a.id} arena={a} state={byArena[a.id]} />
        ))}
      </div>

      <main className="relative flex-1 px-6 sm:px-10 lg:px-14 py-10">
        <p className="eyebrow">Both arenas &mdash; ranked by total time</p>
        <div className="mt-6 grid xl:grid-cols-2 gap-x-14 border-t border-rule">
          <Leaderboard teams={teams} size="lg" limit={PER_COLUMN} />
          <Leaderboard teams={teams} size="lg" from={PER_COLUMN} limit={PER_COLUMN} />
        </div>
      </main>
    </div>
  )
}

function ArenaStrip({ arena, state }) {
  const run = state.run
  const team = activeTeam(state)
  const running = isRunning(run?.clock)
  const ready = run != null && isIdle(run.clock)
  const clockRef = useLiveElapsed(run?.clock ?? null, { idleText: '—' })
  const totalRef = useLiveElapsed(run?.clock ?? null, { offsetMs: team ? partialTotalMs(team) : 0, idleText: '' })

  return (
    <div className="panel px-6 py-5 flex items-center gap-6">
      <span className="display text-4xl text-flare shrink-0">{arena.id}</span>
      <div className="min-w-0 flex-1">
        <span className="flex items-center gap-2.5">
          <LiveDot active={running} />
          <span className="eyebrow-bare text-ink-mute">
            {run ? `${running ? 'Running' : ready ? 'Ready' : 'Paused'} — ${STAGES[run.stageIndex]}` : 'Between runs'}
          </span>
        </span>
        <p className="mt-2 font-semibold text-xl lg:text-2xl tracking-[-0.02em] truncate">{team?.name ?? arena.name}</p>
      </div>
      <div className="text-right shrink-0">
        <span ref={clockRef} className={`block font-mono tnum text-3xl lg:text-4xl ${running ? 'text-ink-deep' : 'text-ink-mute'}`} />
        <span ref={totalRef} className="block mt-1 font-mono tnum text-sm text-ink-faint" />
      </div>
    </div>
  )
}
