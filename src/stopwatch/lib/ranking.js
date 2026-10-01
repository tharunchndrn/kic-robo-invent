import { STATUS, partialTotalMs, stagesDone, totalMs } from './competition.js'

/*
 * Leaderboard ordering.
 *
 * By total: teams that cleared all three stages rank first, fastest total
 * wins. DNF runs rank below every completed run, ordered by how far they got
 * (more stages cleared beats fewer) and then by the time those stages took.
 *
 * By stage: only teams that cleared that stage are ranked, on that stage's
 * time alone. Teams that DNF'd it are listed after, unranked.
 *
 * Teams still queued or mid-run aren't on the board yet. Ties share a rank
 * and the next rank skips (1, 1, 3).
 */

export const RANK_BY_TOTAL = 'total'

function withRanks(rows, sameAs) {
  let rank = 0
  return rows.map((row, i) => {
    if (i === 0 || !sameAs(rows[i - 1], row)) rank = i + 1
    return { ...row, rank }
  })
}

const byName = (a, b) => a.team.name.localeCompare(b.team.name)

export function rankTeams(teams, by = RANK_BY_TOTAL) {
  const finished = teams.filter((t) => t.status === STATUS.completed || t.status === STATUS.dnf)

  if (by === RANK_BY_TOTAL) {
    const rows = finished.map((team) => ({
      team,
      completed: team.status === STATUS.completed,
      cleared: stagesDone(team),
      value: totalMs(team) ?? partialTotalMs(team),
    }))
    rows.sort(
      (a, b) =>
        Number(b.completed) - Number(a.completed) ||
        b.cleared - a.cleared ||
        a.value - b.value ||
        byName(a, b),
    )
    return withRanks(rows, (a, b) => a.completed === b.completed && a.cleared === b.cleared && a.value === b.value)
  }

  const stage = Number(by)
  const ranked = finished
    .filter((t) => t.stages[stage]?.status === 'done')
    .map((team) => ({ team, completed: true, value: team.stages[stage].ms }))
    .sort((a, b) => a.value - b.value || byName(a, b))
  const unranked = finished
    .filter((t) => t.stages[stage]?.status !== 'done')
    .map((team) => ({ team, completed: false, value: null, rank: null }))
    .sort(byName)

  return [...withRanks(ranked, (a, b) => a.value === b.value), ...unranked]
}
