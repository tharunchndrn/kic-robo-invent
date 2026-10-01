import { useCallback, useEffect, useRef, useState } from 'react'
import { STAGES, STATUS, primaryAction } from '../lib/competition.js'
import { buildResultsCsv, downloadCsv } from '../lib/csv.js'
import { RANK_BY_TOTAL } from '../lib/ranking.js'
import { elapsedMs, now } from '../lib/timer.js'
import { combineTeams, otherArena } from '../lib/arenas.js'
import { savedPasscode, savePasscode } from '../lib/firebase.js'
import { LAUNCHER_HREF } from '../lib/screens.js'
import { useCompetition } from '../hooks/useCompetition.js'
import { useConnection } from '../hooks/useConnection.js'
import EditTimeDialog from './EditTimeDialog.jsx'
import Header from './Header.jsx'
import Leaderboard, { RankTabs } from './Leaderboard.jsx'
import LivePanel from './LivePanel.jsx'
import TeamForm from './TeamForm.jsx'
import TeamTable from './TeamTable.jsx'
import PasscodeGate from './PasscodeGate.jsx'
import { ConfirmDialog, SectionHead } from './ui.jsx'

// A double-tap of Space shouldn't close a stage and start the next one (or
// close two stages) — nothing real happens this fast.
const MIN_STAGE_MS = 600

function newId() {
  return crypto.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

function csvFilename() {
  const d = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `robo-invent-2026-results-${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}.csv`
}

/*
 * Judges' console for one arena. Locked behind the event passcode; once
 * unlocked, every change syncs to that arena's display and the standings.
 */
export default function OperatorView({ arena }) {
  const [passcode, setPasscode] = useState(savedPasscode)
  const online = useConnection()

  if (!passcode) {
    return (
      <div className="relative min-h-screen bg-paper grain">
        <Header arena={arena} online={online} />
        <PasscodeGate arena={arena} onUnlock={setPasscode} />
      </div>
    )
  }

  return (
    <Console
      arena={arena}
      passcode={passcode}
      online={online}
      onLock={() => {
        savePasscode('')
        setPasscode('')
      }}
    />
  )
}

function Console({ arena, passcode, online, onLock }) {
  const { state, dispatch, error } = useCompetition({ arena: arena.id, role: 'operator', passcode })
  const other = otherArena(arena.id)
  const { state: otherState } = useCompetition({ arena: other.id })
  const [confirm, setConfirm] = useState(null)
  const [editTarget, setEditTarget] = useState(null)
  const [rankBy, setRankBy] = useState(RANK_BY_TOTAL)
  const [scope, setScope] = useState('arena')

  const allTeams = combineTeams({ [arena.id]: state, [other.id]: otherState })
  const boardTeams = scope === 'arena' ? state.teams : allTeams

  // Key handlers read the latest state through a ref so the listener stays put.
  const stateRef = useRef(state)
  useEffect(() => {
    stateRef.current = state
  }, [state])

  const runPrimary = useCallback(() => {
    const current = stateRef.current
    const action = primaryAction(current)
    if (!action) return
    const at = now()
    if (action.type === 'finishStage' && elapsedMs(current.run.clock, at) < MIN_STAGE_MS) return
    if (action.type === 'resume' && current.run.stageClosedAt != null && at - current.run.stageClosedAt < MIN_STAGE_MS) return
    dispatch({ type: action.type })
  }, [dispatch])

  const teamName = () => stateRef.current.teams.find((t) => t.id === stateRef.current.run?.teamId)?.name
  const stageName = () => STAGES[stateRef.current.run?.stageIndex ?? 0]

  // Run controls. The destructive ones ask first; the clock keeps running
  // while the dialog is open, and the action is stamped when confirmed.
  const runCommand = (type) => {
    const ask = {
      resetStage: {
        title: 'Reset stage',
        heading: `Reset ${stageName()} to zero?`,
        body: 'The clock goes back to 00:00.00 and holds. Press Space to start it again when the robot is re-placed.',
        confirmLabel: 'Reset stage',
      },
      dnfStage: {
        title: 'Did not finish',
        heading: `Mark ${stageName()} as DNF?`,
        body:
          stateRef.current.run?.stageIndex === STAGES.length - 1
            ? `${teamName()}'s run will end.`
            : `${STAGES[stateRef.current.run?.stageIndex + 1]} will be ready to start.`,
        confirmLabel: 'Mark DNF',
      },
      endRun: {
        title: 'End run',
        heading: `End ${teamName()}'s run?`,
        body: `${stageName()} and any stages after it are recorded as DNF.`,
        confirmLabel: 'End run',
      },
      cancelRun: {
        title: 'Cancel run',
        heading: `Cancel ${teamName()}'s run?`,
        body: 'For a false start. Any times recorded in this run are discarded and the team goes back in the queue.',
        confirmLabel: 'Discard run',
      },
    }[type]

    if (ask) setConfirm({ ...ask, onConfirm: () => dispatch({ type }) })
    else dispatch({ type })
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return
      if (document.querySelector('dialog[open]')) return
      const target = e.target
      if (target.closest?.('input, textarea, select, [contenteditable="true"]')) return

      if (e.code === 'Space') {
        e.preventDefault()
        // A focused button would also "click" on keyup — drop focus so Space only does one thing.
        if (target.closest?.('button, a')) target.blur()
        runPrimary()
      } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault()
        dispatch({ type: 'togglePause' })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [runPrimary, dispatch])

  const finishedCount = boardTeams.filter((t) => t.status === STATUS.completed || t.status === STATUS.dnf).length

  return (
    <div className="relative min-h-screen bg-paper grain">
      <Header arena={arena} online={online}>
        <a
          href={`/stopwatch/?arena=${arena.id}&view=display`}
          target="_blank"
          rel="noopener"
          className="btn btn-ghost h-9 sm:h-11 px-4 sm:px-5"
        >
          Display <span aria-hidden>&#8599;</span>
        </a>
        <a href={LAUNCHER_HREF} className="hidden lg:inline-flex btn btn-ghost h-9 sm:h-11 px-4 sm:px-5">
          Change screen
        </a>
        <button type="button" onClick={onLock} className="hidden sm:inline-flex btn btn-ghost h-9 sm:h-11 px-4 sm:px-5">
          Lock
        </button>
      </Header>

      {error && (
        <div role="alert" className="px-3 sm:px-5 pt-4">
          <p className="mx-auto max-w-[1800px] panel border-violet/50 px-5 py-3.5 text-[14px] text-violet">
            {error}{' '}
            <button type="button" onClick={onLock} className="ulink ml-2">
              Re-enter passcode
            </button>
          </p>
        </div>
      )}

      <main className="relative px-3 sm:px-5 pt-6 sm:pt-8 pb-20">
        <div className="mx-auto max-w-[1800px] space-y-16 lg:space-y-20">
          <LivePanel state={state} onPrimary={runPrimary} onCommand={runCommand} />

          <div className="grid 2xl:grid-cols-12 gap-x-10 gap-y-16 px-2 sm:px-3 lg:px-7">
            {/* Teams */}
            <section className="2xl:col-span-8 min-w-0" aria-labelledby="teams-heading">
              <SectionHead index="02" label="Teams" title={<span id="teams-heading">Running order</span>}>
                <button
                  type="button"
                  className="btn btn-ghost"
                  disabled={allTeams.length === 0}
                  title="All teams from both arenas, ranked overall"
                  onClick={() => downloadCsv(buildResultsCsv(allTeams), csvFilename())}
                >
                  Export CSV
                </button>
                <button
                  type="button"
                  className="btn btn-ghost hover:bg-violet hover:border-violet hover:text-carbon"
                  disabled={state.teams.length === 0}
                  onClick={() =>
                    setConfirm({
                      title: 'Clear arena data',
                      heading: `Delete every team in ${arena.name}?`,
                      body: (
                        <>
                          This removes all {state.teams.length} {arena.name} teams and their results from every screen,
                          and can't be undone. {other.name} is not affected.{' '}
                          <strong className="text-ink">Export a CSV first</strong> if you need a copy.
                        </>
                      ),
                      confirmLabel: 'Clear everything',
                      onConfirm: () => dispatch({ type: 'clearAll' }),
                    })
                  }
                >
                  Clear arena data
                </button>
              </SectionHead>

              <div className="mt-8 space-y-5">
                <TeamForm teams={allTeams} onAdd={(team) => dispatch({ type: 'addTeam', id: newId(), ...team })} />
                <TeamTable
                  state={state}
                  onSelect={(id) => dispatch({ type: 'selectTeam', id })}
                  onStart={(id) => dispatch({ type: 'startRun', id })}
                  onEditTime={(team, stageIndex) => setEditTarget({ team, stageIndex })}
                  onRequeue={(team) =>
                    setConfirm({
                      title: 'Re-run team',
                      heading: `Send ${team.name} back to the queue?`,
                      body: 'Their recorded times are cleared so they can run again.',
                      confirmLabel: 'Clear times & queue',
                      onConfirm: () => dispatch({ type: 'requeueTeam', id: team.id }),
                    })
                  }
                  onRemove={(team) =>
                    setConfirm({
                      title: 'Remove team',
                      heading: `Remove ${team.name}?`,
                      body: team.status === STATUS.queued ? null : 'Their recorded times are deleted with them.',
                      confirmLabel: 'Remove team',
                      onConfirm: () => dispatch({ type: 'removeTeam', id: team.id }),
                    })
                  }
                />
              </div>
            </section>

            {/* Leaderboard */}
            <section className="2xl:col-span-4 min-w-0" aria-labelledby="board-heading">
              <SectionHead index="03" label="Leaderboard" title={<span id="board-heading">Standings</span>} />
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <div role="tablist" aria-label="Which teams" className="inline-flex gap-1 rounded-full border border-rule p-1">
                  {[
                    { value: 'arena', label: arena.name },
                    { value: 'overall', label: 'Overall' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      role="tab"
                      aria-selected={scope === opt.value}
                      onClick={() => setScope(opt.value)}
                      className={`font-mono text-[10px] tracking-[0.14em] uppercase rounded-full px-3.5 py-2 transition-colors duration-300 ${
                        scope === opt.value ? 'bg-flare text-carbon' : 'text-ink-mute hover:text-ink'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <RankTabs by={rankBy} onChange={setRankBy} />
                <span className="ml-auto font-mono text-[10px] tracking-[0.14em] uppercase text-ink-faint tnum">
                  {finishedCount} / {boardTeams.length} run
                </span>
              </div>
              <div className="mt-5">
                <Leaderboard teams={boardTeams} by={rankBy} />
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-ink-mute">
                {rankBy === RANK_BY_TOTAL
                  ? 'Completed runs rank first by total time. DNF runs follow, ordered by stages cleared, then time.'
                  : `Ranked on ${STAGES[Number(rankBy)]} time alone. Teams that didn't finish this stage are listed unranked.`}
              </p>
            </section>
          </div>
        </div>
      </main>

      <footer className="px-5 sm:px-8 lg:px-12 pb-8">
        <div className="mx-auto max-w-[1800px] pt-6 border-t border-rule flex flex-col sm:flex-row justify-between gap-3">
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-faint">
            &copy; 2026 NIBM &middot; Kandy Innovation Centre
          </p>
          <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-faint">
            Synced to every screen &middot; kept on this device if offline
          </p>
        </div>
      </footer>

      <ConfirmDialog request={confirm} onClose={() => setConfirm(null)} />
      <EditTimeDialog
        target={editTarget}
        onClose={() => setEditTarget(null)}
        onSave={(teamId, stageIndex, value) => dispatch({ type: 'editStage', teamId, stageIndex, value })}
      />
    </div>
  )
}
