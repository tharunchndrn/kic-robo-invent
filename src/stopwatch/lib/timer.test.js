import { test } from 'node:test'
import assert from 'node:assert/strict'
import { elapsedMs, idleClock, isRunning, pauseClock, resumeClock, startClock } from './timer.js'

test('a running clock reads the time since it started', () => {
  const clock = startClock(1000)
  assert.equal(isRunning(clock), true)
  assert.equal(elapsedMs(clock, 1000), 0)
  assert.equal(elapsedMs(clock, 4250.5), 3250.5)
})

test('pausing banks the elapsed time and freezes the reading', () => {
  const paused = pauseClock(startClock(0), 2000)
  assert.equal(isRunning(paused), false)
  assert.equal(elapsedMs(paused, 2000), 2000)
  assert.equal(elapsedMs(paused, 99999), 2000)
})

test('resuming continues from the banked time, excluding the paused gap', () => {
  let clock = startClock(0)
  clock = pauseClock(clock, 1500)
  clock = resumeClock(clock, 10000)
  assert.equal(elapsedMs(clock, 10500), 2000)
})

test('pause and resume are idempotent', () => {
  const running = startClock(0)
  assert.equal(resumeClock(running, 500), running)
  const paused = pauseClock(running, 500)
  assert.equal(pauseClock(paused, 900), paused)
})

test('the reading depends only on timestamps, so a reload restores it exactly', () => {
  const stored = JSON.parse(JSON.stringify(startClock(1_700_000_000_000)))
  assert.equal(elapsedMs(stored, 1_700_000_065_430), 65_430)
})

test('an idle clock reads zero and a clock never reads negative', () => {
  assert.equal(elapsedMs(idleClock(), 5000), 0)
  assert.equal(elapsedMs(startClock(5000), 4000), 0)
})
