import { test } from 'node:test'
import assert from 'node:assert/strict'
import { rankTeams } from './ranking.js'
import { buildResultsCsv } from './csv.js'
import { formatMs, parseTime } from './format.js'

const done = (ms) => ({ status: 'done', ms })
const dnf = { status: 'dnf', ms: null }

function team(id, status, stages) {
  return { id, name: id, number: '', school: '', status, stages }
}

const teams = [
  team('Slow', 'completed', [done(20_000), done(30_000), done(40_000)]),
  team('Fast', 'completed', [done(10_000), done(20_000), done(30_000)]),
  team('TwoStages', 'dnf', [done(5000), done(5000), dnf]),
  team('OneStage', 'dnf', [done(1000), dnf, dnf]),
  team('Waiting', 'queued', [null, null, null]),
]

test('total ranking puts completed runs first, then DNFs by progress', () => {
  const rows = rankTeams(teams)
  assert.deepEqual(rows.map((r) => r.team.id), ['Fast', 'Slow', 'TwoStages', 'OneStage'])
  assert.deepEqual(rows.map((r) => r.rank), [1, 2, 3, 4])
  assert.equal(rows[0].value, 60_000)
})

test('stage ranking only ranks teams that cleared that stage', () => {
  const rows = rankTeams(teams, 2)
  assert.deepEqual(rows.map((r) => r.team.id), ['Fast', 'Slow', 'OneStage', 'TwoStages'])
  assert.deepEqual(rows.map((r) => r.rank), [1, 2, null, null])
})

test('ties share a rank and the next rank skips', () => {
  const tied = [
    team('A', 'completed', [done(1), done(1), done(1)]),
    team('B', 'completed', [done(1), done(1), done(1)]),
    team('C', 'completed', [done(2), done(2), done(2)]),
  ]
  assert.deepEqual(rankTeams(tied).map((r) => r.rank), [1, 1, 3])
})

test('formatMs truncates to hundredths', () => {
  assert.equal(formatMs(0), '00:00.00')
  assert.equal(formatMs(12_348), '00:12.34')
  assert.equal(formatMs(62_999), '01:02.99')
  assert.equal(formatMs(3_723_450), '1:02:03.45')
  assert.equal(formatMs(null), '—')
})

test('parseTime accepts the formats an operator would type', () => {
  assert.equal(parseTime('1:02.35'), 62_350)
  assert.equal(parseTime('62.35'), 62_350)
  assert.equal(parseTime('01:02'), 62_000)
  assert.equal(parseTime('12.5'), 12_500)
  assert.equal(parseTime('1:01:02.5'), 3_662_500)
  assert.equal(parseTime('1:75'), null)
  assert.equal(parseTime('abc'), null)
  assert.equal(parseTime(''), null)
})

test('CSV lists ranked teams then unrun teams, escaping awkward names', () => {
  const csv = buildResultsCsv([
    ...teams,
    { ...team('Robo, "Prime"', 'completed', [done(1000), done(1000), done(1000)]), arena: 'B' },
  ])
  const lines = csv.split('\r\n')
  assert.match(lines[0], /^Rank,Arena,Team,Team No\.,School,Status,Easy,Medium,Hard,Total/)
  assert.equal(lines[1].startsWith('1,B,"Robo, ""Prime""",,,COMPLETED,00:01.00,00:01.00,00:01.00,00:03.00'), true)
  assert.match(lines[4], /TwoStages,,,DNF,00:05.00,00:05.00,DNF,,5000,5000,,$/)
  assert.match(lines[6], /^,,Waiting,,,QUEUED/)
})
