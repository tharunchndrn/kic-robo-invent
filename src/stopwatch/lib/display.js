import { STAGES, activeTeam, lastFinished, totalMs } from './competition.js'
import { isIdle, isRunning } from './timer.js'

/*
 * What an arena's big screen shows, derived from its state. The clock is the
 * point of the screen, so it always has a meaningful number on it:
 *
 *   running   the live stage time
 *   paused    the stage time, frozen
 *   stopped   a stage just finished — its recorded time, held until the next
 *             stage starts (rather than dropping straight to zero)
 *   ready     the run's first stage, waiting at zero
 *   finished  the run is over — its total, held until the next run starts
 *   idle      nothing has run yet
 *
 * Live modes return `clock` (painted every frame); held modes return `ms`
 * (or `dnf`).
 */
export function displayReading(state) {
  const run = state.run
  const team = activeTeam(state)
  const upNext = state.teams.find((t) => t.id === state.selectedTeamId && t.id !== run?.teamId) ?? null

  if (run && team) {
    const i = run.stageIndex
    if (isRunning(run.clock)) return { mode: 'running', team, stageIndex: i, label: STAGES[i], clock: run.clock }
    if (!isIdle(run.clock)) return { mode: 'paused', team, stageIndex: i, label: STAGES[i], clock: run.clock }
    if (i > 0) {
      const prev = team.stages[i - 1]
      return {
        mode: 'stopped',
        team,
        stageIndex: i,
        label: STAGES[i - 1],
        next: STAGES[i],
        ms: prev?.status === 'done' ? prev.ms : null,
        dnf: prev?.status === 'dnf',
      }
    }
    return { mode: 'ready', team, stageIndex: i, label: STAGES[i], ms: 0 }
  }

  const last = lastFinished(state.teams)
  if (last) {
    const total = totalMs(last)
    return { mode: 'finished', team: last, upNext, stageIndex: null, label: 'Total', ms: total, dnf: total == null }
  }

  return { mode: 'idle', team: upNext, upNext, stageIndex: null, label: STAGES[0], ms: 0 }
}
