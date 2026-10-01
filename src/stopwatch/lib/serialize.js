import { STAGES, initialState, isValidState } from './competition.js'

/*
 * Realtime Database storage format.
 *
 * The database drops nulls and turns arrays into keyed objects (or leaves
 * holes), so app state can't be stored as-is: `stages: [done, null, null]`
 * would come back as `[done]`. Encoding writes keyed objects only — teams by
 * id with an explicit `order`, stages by index — and decoding rebuilds the
 * exact app shape, filling every missing value back in as null.
 */

export function encodeState(state) {
  const teams = {}
  state.teams.forEach((t, order) => {
    const stages = {}
    t.stages.forEach((s, i) => {
      if (s) stages[i] = s.status === 'done' ? { status: 'done', ms: s.ms } : { status: 'dnf' }
    })
    teams[t.id] = {
      order,
      name: t.name,
      number: t.number,
      school: t.school,
      status: t.status,
      stages,
      createdAt: t.createdAt ?? 0,
      ...(t.finishedAt != null && { finishedAt: t.finishedAt }),
    }
  })

  const run = state.run && {
    teamId: state.run.teamId,
    stageIndex: state.run.stageIndex,
    clock: {
      accumulatedMs: state.run.clock.accumulatedMs,
      ...(state.run.clock.segmentStartedAt != null && { segmentStartedAt: state.run.clock.segmentStartedAt }),
    },
    ...(state.run.startedAt != null && { startedAt: state.run.startedAt }),
    ...(state.run.stageClosedAt != null && { stageClosedAt: state.run.stageClosedAt }),
  }

  return {
    version: state.version,
    updatedAt: state.updatedAt ?? 0,
    teams,
    ...(state.selectedTeamId != null && { selectedTeamId: state.selectedTeamId }),
    ...(run && { run }),
  }
}

export function decodeState(value) {
  if (!value || typeof value !== 'object') return null

  const teams = Object.entries(value.teams ?? {})
    .map(([id, t]) => ({
      id,
      name: t.name ?? '',
      number: t.number ?? '',
      school: t.school ?? '',
      status: t.status,
      stages: STAGES.map((_, i) => {
        const s = t.stages?.[i]
        if (!s) return null
        return s.status === 'done' ? { status: 'done', ms: s.ms } : { status: 'dnf', ms: null }
      }),
      createdAt: t.createdAt ?? 0,
      finishedAt: t.finishedAt ?? null,
      order: t.order ?? 0,
    }))
    .sort((a, b) => a.order - b.order)
    .map((t) => {
      const team = { ...t }
      delete team.order
      return team
    })

  const r = value.run
  const run = r
    ? {
        teamId: r.teamId,
        stageIndex: r.stageIndex ?? 0,
        clock: { accumulatedMs: r.clock?.accumulatedMs ?? 0, segmentStartedAt: r.clock?.segmentStartedAt ?? null },
        startedAt: r.startedAt ?? null,
        stageClosedAt: r.stageClosedAt ?? null,
      }
    : null

  const state = {
    ...initialState(),
    version: value.version,
    updatedAt: value.updatedAt ?? 0,
    teams,
    selectedTeamId: value.selectedTeamId ?? null,
    run,
  }
  return isValidState(state) ? state : null
}
