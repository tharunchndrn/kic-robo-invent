import { elapsedMs, idleClock, isIdle, isRunning, pauseClock, resumeClock, startClock } from './timer.js'

/*
 * Competition state machine. Pure: every action that depends on time carries
 * its own `at` timestamp, so the reducer never reads a clock and the whole
 * flow can be replayed in tests.
 *
 * A team's run walks Easy → Medium → Hard. Each stage ends either with a
 * recorded time ("done") or a DNF. The next stage then waits at zero until
 * the operator starts it — the robot has to be set up for it first.
 */

export const STAGES = ['Easy', 'Medium', 'Hard']

export const STATUS = {
  queued: 'queued',
  running: 'running',
  completed: 'completed',
  dnf: 'dnf',
}

export const STORAGE_VERSION = 1

export function initialState() {
  return { version: STORAGE_VERSION, teams: [], selectedTeamId: null, run: null }
}

export function emptyStages() {
  return STAGES.map(() => null)
}

// --- Derived values -------------------------------------------------------

export function normaliseName(name) {
  return String(name ?? '').trim().replace(/\s+/g, ' ')
}

export function isDuplicateName(teams, name, exceptId = null) {
  const key = normaliseName(name).toLowerCase()
  return teams.some((t) => t.id !== exceptId && t.name.toLowerCase() === key)
}

export function stagesDone(team) {
  return team.stages.filter((s) => s?.status === 'done').length
}

/** Sum of the recorded stage times — the official total only when all three are done. */
export function partialTotalMs(team) {
  return team.stages.reduce((sum, s) => (s?.status === 'done' ? sum + s.ms : sum), 0)
}

export function totalMs(team) {
  return stagesDone(team) === STAGES.length ? partialTotalMs(team) : null
}

function finishedStatus(stages) {
  return stages.every((s) => s?.status === 'done') ? STATUS.completed : STATUS.dnf
}

export function activeTeam(state) {
  return state.run ? state.teams.find((t) => t.id === state.run.teamId) ?? null : null
}

/** The next team waiting after `afterId` in queue order, wrapping to the front. */
export function nextQueuedId(teams, afterId = null) {
  const queued = teams.filter((t) => t.status === STATUS.queued)
  if (queued.length === 0) return null
  const idx = teams.findIndex((t) => t.id === afterId)
  const after = queued.find((t) => teams.indexOf(t) > idx)
  return (after ?? queued[0]).id
}

// --- Reducer --------------------------------------------------------------

function updateTeam(state, id, fn) {
  return { ...state, teams: state.teams.map((t) => (t.id === id ? fn(t) : t)) }
}

/** Locks the current stage as `result` and moves on — or ends the run after Hard. */
function closeStage(state, result, at) {
  const { run } = state
  const team = activeTeam(state)
  if (!run || !team) return state

  const stages = team.stages.map((s, i) => (i === run.stageIndex ? result : s))

  if (run.stageIndex + 1 < STAGES.length) {
    return {
      ...updateTeam(state, team.id, (t) => ({ ...t, stages })),
      run: { ...run, stageIndex: run.stageIndex + 1, clock: idleClock(), stageClosedAt: at },
    }
  }

  const ended = updateTeam(state, team.id, (t) => ({ ...t, stages, status: finishedStatus(stages), finishedAt: at }))
  return { ...ended, run: null, selectedTeamId: nextQueuedId(ended.teams, team.id) }
}

export function reducer(state, action) {
  switch (action.type) {
    case 'hydrate':
      return action.state

    case 'addTeam': {
      const name = normaliseName(action.name)
      if (!name || isDuplicateName(state.teams, name)) return state
      const team = {
        id: action.id,
        name,
        number: String(action.number ?? '').trim(),
        school: String(action.school ?? '').trim(),
        status: STATUS.queued,
        stages: emptyStages(),
        createdAt: action.at,
        finishedAt: null,
      }
      return {
        ...state,
        teams: [...state.teams, team],
        // First team in an empty queue is ready to go without an extra click.
        selectedTeamId: state.selectedTeamId ?? (state.run ? null : team.id),
      }
    }

    case 'removeTeam': {
      if (state.run?.teamId === action.id) return state
      const teams = state.teams.filter((t) => t.id !== action.id)
      return {
        ...state,
        teams,
        selectedTeamId: state.selectedTeamId === action.id ? nextQueuedId(teams) : state.selectedTeamId,
      }
    }

    case 'selectTeam': {
      const team = state.teams.find((t) => t.id === action.id)
      if (!team || team.status !== STATUS.queued) return state
      return { ...state, selectedTeamId: action.id }
    }

    case 'startRun': {
      if (state.run) return state
      const id = action.id ?? state.selectedTeamId
      const team = state.teams.find((t) => t.id === id)
      if (!team || team.status !== STATUS.queued) return state
      return {
        ...updateTeam(state, id, (t) => ({ ...t, status: STATUS.running, stages: emptyStages(), finishedAt: null })),
        selectedTeamId: id,
        run: { teamId: id, stageIndex: 0, clock: startClock(action.at), startedAt: action.at, stageClosedAt: null },
      }
    }

    case 'finishStage': {
      // A stage that was never started has no time to record.
      if (!state.run || isIdle(state.run.clock)) return state
      const ms = Math.round(elapsedMs(state.run.clock, action.at))
      return closeStage(state, { status: 'done', ms }, action.at)
    }

    case 'dnfStage':
      if (!state.run) return state
      return closeStage(state, { status: 'dnf', ms: null }, action.at)

    case 'endRun': {
      // Current stage and everything after it is a DNF.
      let next = state
      while (next.run) next = closeStage(next, { status: 'dnf', ms: null }, action.at)
      return next
    }

    case 'pause':
      if (!state.run) return state
      return { ...state, run: { ...state.run, clock: pauseClock(state.run.clock, action.at) } }

    case 'resume':
      if (!state.run) return state
      return { ...state, run: { ...state.run, clock: resumeClock(state.run.clock, action.at) } }

    case 'togglePause':
      if (!state.run) return state
      return reducer(state, { type: isRunning(state.run.clock) ? 'pause' : 'resume', at: action.at })

    case 'resetStage':
      // Back to 00:00.00 and held — the robot is being re-placed, and the
      // clock waits for the operator to start it again.
      if (!state.run) return state
      return { ...state, run: { ...state.run, clock: idleClock() } }

    case 'cancelRun': {
      // False start: the team goes back in the queue with nothing recorded.
      const team = activeTeam(state)
      if (!team) return state
      return {
        ...updateTeam(state, team.id, (t) => ({ ...t, status: STATUS.queued, stages: emptyStages() })),
        run: null,
        selectedTeamId: team.id,
      }
    }

    case 'editStage': {
      // `value` is { status: 'done', ms } or { status: 'dnf' }. Only stages
      // that have already been closed can be corrected.
      const team = state.teams.find((t) => t.id === action.teamId)
      if (!team || !team.stages[action.stageIndex]) return state
      const isActive = state.run?.teamId === team.id
      if (isActive && action.stageIndex >= state.run.stageIndex) return state

      const value =
        action.value.status === 'done'
          ? { status: 'done', ms: Math.max(0, Math.round(action.value.ms)) }
          : { status: 'dnf', ms: null }
      const stages = team.stages.map((s, i) => (i === action.stageIndex ? value : s))
      return updateTeam(state, team.id, (t) => ({
        ...t,
        stages,
        status: isActive ? t.status : finishedStatus(stages),
      }))
    }

    case 'requeueTeam': {
      if (state.run?.teamId === action.id) return state
      const next = updateTeam(state, action.id, (t) => ({
        ...t,
        status: STATUS.queued,
        stages: emptyStages(),
        finishedAt: null,
      }))
      return { ...next, selectedTeamId: next.selectedTeamId ?? (next.run ? null : action.id) }
    }

    case 'clearAll':
      return initialState()

    default:
      return state
  }
}

/** Rejects anything in storage that isn't shaped like our state. */
export function isValidState(value) {
  return (
    value != null &&
    typeof value === 'object' &&
    value.version === STORAGE_VERSION &&
    Array.isArray(value.teams) &&
    value.teams.every((t) => t && typeof t.id === 'string' && Array.isArray(t.stages) && t.stages.length === STAGES.length)
  )
}

/*
 * What the big button (and Space) does right now. Shared so the key and the
 * button can never disagree. Returns null when there's nothing to do.
 */
export function primaryAction(state) {
  if (!state.run) {
    const team = state.teams.find((t) => t.id === state.selectedTeamId && t.status === STATUS.queued)
    return team ? { type: 'startRun', label: 'Start run' } : null
  }
  const stage = STAGES[state.run.stageIndex]
  if (isRunning(state.run.clock)) {
    return { type: 'finishStage', label: state.run.stageIndex === STAGES.length - 1 ? 'Finish run' : `Finish ${stage}` }
  }
  return { type: 'resume', label: state.run.clock.accumulatedMs === 0 ? `Start ${stage}` : 'Resume' }
}

/** The team whose run ended most recently, for "last result" displays. */
export function lastFinished(teams) {
  return teams.reduce(
    (latest, t) => (t.finishedAt != null && (latest == null || t.finishedAt > latest.finishedAt) ? t : latest),
    null,
  )
}
