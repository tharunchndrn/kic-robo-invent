import { test } from 'node:test'
import assert from 'node:assert/strict'
import { initialState, reducer } from './competition.js'
import { combineTeams } from './arenas.js'
import { decodeState, encodeState } from './serialize.js'

/** What the Realtime Database does to a stored value: drops nulls, keeps objects. */
function throughDatabase(value) {
  return JSON.parse(JSON.stringify(value, (_k, v) => (v === null ? undefined : v)))
}

function play(actions) {
  return { ...actions.reduce(reducer, initialState()), updatedAt: 1234 }
}

test('state survives a round trip through the database unchanged', () => {
  const state = play([
    { type: 'addTeam', id: 'a', name: 'Alpha', number: '1', school: 'Trinity', at: 0 },
    { type: 'addTeam', id: 'b', name: 'Beta', at: 0 },
    { type: 'addTeam', id: 'c', name: 'Gamma', at: 0 },
    { type: 'startRun', at: 100 },
    { type: 'finishStage', at: 5100 },
    { type: 'resume', at: 6000 },
    { type: 'dnfStage', at: 9000 },
    { type: 'resume', at: 9500 },
    { type: 'pause', at: 9900 },
  ])
  assert.deepEqual(decodeState(throughDatabase(encodeState(state))), state)
})

test('team order is kept even though teams are stored by id', () => {
  const state = play([
    { type: 'addTeam', id: 'zzz', name: 'First', at: 0 },
    { type: 'addTeam', id: 'aaa', name: 'Second', at: 0 },
  ])
  const back = decodeState(throughDatabase(encodeState(state)))
  assert.deepEqual(back.teams.map((t) => t.name), ['First', 'Second'])
})

test('an empty arena round-trips, and junk decodes to null', () => {
  const empty = { ...initialState(), updatedAt: 0 }
  assert.deepEqual(decodeState(throughDatabase(encodeState(empty))), empty)
  assert.equal(decodeState(null), null)
  assert.equal(decodeState({ version: 99 }), null)
})

test('combining arenas tags each team with its arena', () => {
  const a = play([{ type: 'addTeam', id: '1', name: 'One', at: 0 }])
  const b = play([{ type: 'addTeam', id: '2', name: 'Two', at: 0 }])
  assert.deepEqual(combineTeams({ A: a, B: b }).map((t) => `${t.arena}:${t.name}`), ['A:One', 'B:Two'])
})
