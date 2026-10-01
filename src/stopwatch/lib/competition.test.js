import { test } from 'node:test'
import assert from 'node:assert/strict'
import { STATUS, initialState, isDuplicateName, primaryAction, reducer, totalMs } from './competition.js'

function run(actions, state = initialState()) {
  return actions.reduce(reducer, state)
}

const twoTeams = [
  { type: 'addTeam', id: 'a', name: 'Alpha Bots', at: 0 },
  { type: 'addTeam', id: 'b', name: 'Beta Builders', number: '07', school: 'Trinity', at: 0 },
]

const team = (state, id) => state.teams.find((t) => t.id === id)

test('adding teams queues them and pre-selects the first', () => {
  const s = run(twoTeams)
  assert.deepEqual(s.teams.map((t) => t.status), [STATUS.queued, STATUS.queued])
  assert.equal(s.selectedTeamId, 'a')
  assert.equal(team(s, 'b').school, 'Trinity')
})

test('duplicate team names are rejected regardless of case and spacing', () => {
  const s = run([...twoTeams, { type: 'addTeam', id: 'c', name: '  alpha   BOTS ', at: 0 }])
  assert.equal(s.teams.length, 2)
  assert.equal(isDuplicateName(s.teams, 'ALPHA bots'), true)
  assert.equal(isDuplicateName(s.teams, 'Alpha Bots', 'a'), false)
})

test('finishing a stage locks its time and holds the next stage at zero', () => {
  const s = run([
    ...twoTeams,
    { type: 'startRun', at: 1000 },
    { type: 'finishStage', at: 13_500 },
  ])
  assert.deepEqual(team(s, 'a').stages[0], { status: 'done', ms: 12_500 })
  assert.equal(s.run.stageIndex, 1)
  assert.deepEqual(s.run.clock, { accumulatedMs: 0, segmentStartedAt: null })
  assert.equal(s.run.stageClosedAt, 13_500)
})

test('the next stage times only from when the operator starts it', () => {
  const s = run([
    ...twoTeams,
    { type: 'startRun', at: 0 },
    { type: 'finishStage', at: 10_000 },
    { type: 'resume', at: 25_000 },
    { type: 'finishStage', at: 32_000 },
  ])
  assert.equal(team(s, 'a').stages[1].ms, 7000)
})

test('a stage that was never started cannot be finished', () => {
  const s = run([...twoTeams, { type: 'startRun', at: 0 }, { type: 'finishStage', at: 10_000 }])
  assert.equal(reducer(s, { type: 'finishStage', at: 11_000 }), s)
})

test('a full run records three stages, completes, and selects the next team', () => {
  const s = run([
    ...twoTeams,
    { type: 'startRun', at: 0 },
    { type: 'finishStage', at: 10_000 },
    { type: 'resume', at: 15_000 },
    { type: 'finishStage', at: 35_000 },
    { type: 'resume', at: 40_000 },
    { type: 'finishStage', at: 70_000 },
  ])
  const a = team(s, 'a')
  assert.equal(a.status, STATUS.completed)
  assert.deepEqual(a.stages.map((x) => x.ms), [10_000, 20_000, 30_000])
  assert.equal(totalMs(a), 60_000)
  assert.equal(s.run, null)
  assert.equal(s.selectedTeamId, 'b')
})

test('only one team can run at a time', () => {
  const s = run([...twoTeams, { type: 'startRun', at: 0 }, { type: 'startRun', id: 'b', at: 5 }])
  assert.equal(s.run.teamId, 'a')
  assert.equal(team(s, 'b').status, STATUS.queued)
})

test('paused time is excluded from the stage time', () => {
  const s = run([
    ...twoTeams,
    { type: 'startRun', at: 0 },
    { type: 'togglePause', at: 4000 },
    { type: 'togglePause', at: 9000 },
    { type: 'finishStage', at: 10_000 },
  ])
  assert.equal(team(s, 'a').stages[0].ms, 5000)
})

test('resetting a stage zeroes and holds the clock until resumed', () => {
  const s = run([
    ...twoTeams,
    { type: 'startRun', at: 0 },
    { type: 'resetStage', at: 7000 },
    { type: 'resume', at: 20_000 },
    { type: 'finishStage', at: 23_000 },
  ])
  assert.equal(team(s, 'a').stages[0].ms, 3000)
})

test('DNF on a stage skips to the next; a DNF anywhere makes the run DNF', () => {
  const s = run([
    ...twoTeams,
    { type: 'startRun', at: 0 },
    { type: 'finishStage', at: 10_000 },
    { type: 'resume', at: 12_000 },
    { type: 'dnfStage', at: 50_000 },
    { type: 'resume', at: 55_000 },
    { type: 'finishStage', at: 70_000 },
  ])
  const a = team(s, 'a')
  assert.deepEqual(a.stages.map((x) => x.status), ['done', 'dnf', 'done'])
  assert.equal(a.stages[2].ms, 15_000)
  assert.equal(a.status, STATUS.dnf)
  assert.equal(totalMs(a), null)
})

test('ending a run marks the current and remaining stages DNF', () => {
  const s = run([
    ...twoTeams,
    { type: 'startRun', at: 0 },
    { type: 'finishStage', at: 10_000 },
    { type: 'endRun', at: 20_000 },
  ])
  assert.deepEqual(team(s, 'a').stages.map((x) => x.status), ['done', 'dnf', 'dnf'])
  assert.equal(s.run, null)
})

test('cancelling a run returns the team to the queue with nothing recorded', () => {
  const s = run([
    ...twoTeams,
    { type: 'startRun', at: 0 },
    { type: 'finishStage', at: 10_000 },
    { type: 'cancelRun', at: 12_000 },
  ])
  assert.equal(team(s, 'a').status, STATUS.queued)
  assert.deepEqual(team(s, 'a').stages, [null, null, null])
})

test('editing a time corrects it and re-derives the team status', () => {
  let s = run([
    ...twoTeams,
    { type: 'startRun', at: 0 },
    { type: 'dnfStage', at: 1000 },
    { type: 'resume', at: 1000 },
    { type: 'finishStage', at: 2000 },
    { type: 'resume', at: 2000 },
    { type: 'finishStage', at: 3000 },
  ])
  assert.equal(team(s, 'a').status, STATUS.dnf)

  s = reducer(s, { type: 'editStage', teamId: 'a', stageIndex: 0, value: { status: 'done', ms: 42_000 } })
  assert.equal(team(s, 'a').status, STATUS.completed)
  assert.equal(totalMs(team(s, 'a')), 44_000)
})

test('the live stage of a running team cannot be edited, earlier stages can', () => {
  let s = run([...twoTeams, { type: 'startRun', at: 0 }, { type: 'finishStage', at: 9000 }])
  const before = s
  s = reducer(s, { type: 'editStage', teamId: 'a', stageIndex: 1, value: { status: 'done', ms: 1 } })
  assert.equal(s, before)

  s = reducer(s, { type: 'editStage', teamId: 'a', stageIndex: 0, value: { status: 'done', ms: 8500 } })
  assert.equal(team(s, 'a').stages[0].ms, 8500)
  assert.equal(team(s, 'a').status, STATUS.running)
})

test('a running team cannot be removed', () => {
  const s = run([...twoTeams, { type: 'startRun', at: 0 }, { type: 'removeTeam', id: 'a' }])
  assert.equal(s.teams.length, 2)
})

test('the primary action follows the run: start, finish each stage, start the next', () => {
  let s = run(twoTeams)
  assert.equal(primaryAction(s).type, 'startRun')
  s = reducer(s, { type: 'startRun', at: 0 })
  assert.deepEqual(primaryAction(s), { type: 'finishStage', label: 'Finish Easy' })
  s = reducer(s, { type: 'resetStage', at: 10 })
  assert.deepEqual(primaryAction(s), { type: 'resume', label: 'Start Easy' })
  s = run([{ type: 'resume', at: 20 }, { type: 'finishStage', at: 1000 }], s)
  assert.deepEqual(primaryAction(s), { type: 'resume', label: 'Start Medium' })
  s = run([{ type: 'resume', at: 1500 }, { type: 'finishStage', at: 2000 }, { type: 'resume', at: 2500 }], s)
  assert.deepEqual(primaryAction(s), { type: 'finishStage', label: 'Finish run' })
  assert.equal(primaryAction(run([{ type: 'clearAll' }], s)), null)
})
