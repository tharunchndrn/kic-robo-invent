import { test } from 'node:test'
import assert from 'node:assert/strict'
import { initialState, reducer } from './competition.js'
import { displayReading } from './display.js'

const play = (actions, state = initialState()) => actions.reduce(reducer, state)
const teams = [
  { type: 'addTeam', id: 'a', name: 'Alpha', at: 0 },
  { type: 'addTeam', id: 'b', name: 'Beta', at: 0 },
]

test('before anything runs the screen is idle on the next team', () => {
  const r = displayReading(play(teams))
  assert.equal(r.mode, 'idle')
  assert.equal(r.team.name, 'Alpha')
})

test('running and paused stages hand over the live clock', () => {
  let s = play([...teams, { type: 'startRun', at: 0 }])
  assert.equal(displayReading(s).mode, 'running')
  s = reducer(s, { type: 'pause', at: 2000 })
  const r = displayReading(s)
  assert.equal(r.mode, 'paused')
  assert.equal(r.clock.accumulatedMs, 2000)
})

test('a finished stage stays on screen until the next one starts', () => {
  let s = play([...teams, { type: 'startRun', at: 0 }, { type: 'finishStage', at: 12_340 }])
  let r = displayReading(s)
  assert.deepEqual([r.mode, r.label, r.next, r.ms], ['stopped', 'Easy', 'Medium', 12_340])

  s = reducer(s, { type: 'resume', at: 20_000 })
  assert.equal(displayReading(s).mode, 'running')

  s = reducer(s, { type: 'dnfStage', at: 25_000 })
  r = displayReading(s)
  assert.deepEqual([r.mode, r.label, r.dnf], ['stopped', 'Medium', true])
})

test('a reset first stage reads as ready at zero', () => {
  const r = displayReading(play([...teams, { type: 'startRun', at: 0 }, { type: 'resetStage', at: 500 }]))
  assert.deepEqual([r.mode, r.ms], ['ready', 0])
})

test('a finished run holds its total, with the next team lined up', () => {
  const s = play([
    ...teams,
    { type: 'startRun', at: 0 },
    { type: 'finishStage', at: 1000 },
    { type: 'resume', at: 2000 },
    { type: 'finishStage', at: 4000 },
    { type: 'resume', at: 5000 },
    { type: 'finishStage', at: 8000 },
  ])
  const r = displayReading(s)
  assert.deepEqual([r.mode, r.team.name, r.ms, r.upNext.name], ['finished', 'Alpha', 6000, 'Beta'])

  const next = displayReading(reducer(s, { type: 'startRun', at: 9000 }))
  assert.deepEqual([next.mode, next.team.name], ['running', 'Beta'])
})

test('a DNF run is held as DNF', () => {
  const s = play([...teams, { type: 'startRun', at: 0 }, { type: 'endRun', at: 3000 }])
  const r = displayReading(s)
  assert.deepEqual([r.mode, r.dnf, r.ms], ['finished', true, null])
})
