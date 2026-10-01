import { STAGES, totalMs } from './competition.js'
import { formatMs } from './format.js'
import { rankTeams } from './ranking.js'

function cell(value) {
  const str = String(value ?? '')
  return /[",\r\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str
}

function stageCell(stage) {
  if (!stage) return ''
  return stage.status === 'dnf' ? 'DNF' : formatMs(stage.ms)
}

/**
 * Results in leaderboard order (ranked by total — pass the combined list for
 * an overall ranking across arenas), followed by teams that
 * haven't run yet. Each time appears twice — formatted for people, and as raw
 * milliseconds for anyone re-sorting in a spreadsheet.
 */
export function buildResultsCsv(teams) {
  const ranked = rankTeams(teams)
  const rankedIds = new Set(ranked.map((r) => r.team.id))
  const rows = [
    ...ranked,
    ...teams.filter((t) => !rankedIds.has(t.id)).map((team) => ({ team, rank: null })),
  ]

  const header = [
    'Rank', 'Arena', 'Team', 'Team No.', 'School', 'Status',
    ...STAGES, 'Total',
    ...STAGES.map((s) => `${s} (ms)`), 'Total (ms)',
  ]

  const lines = rows.map(({ team, rank }) => {
    const total = totalMs(team)
    return [
      rank ?? '',
      team.arena ?? '',
      team.name,
      team.number,
      team.school,
      team.status.toUpperCase(),
      ...team.stages.map(stageCell),
      total == null ? '' : formatMs(total),
      ...team.stages.map((s) => (s?.status === 'done' ? Math.round(s.ms) : '')),
      total == null ? '' : Math.round(total),
    ]
  })

  return [header, ...lines].map((line) => line.map(cell).join(',')).join('\r\n')
}

export function downloadCsv(csv, filename) {
  // BOM so Excel opens UTF-8 school names correctly.
  const blob = new Blob(['﻿', csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
