/*
 * Drift-free stage clock.
 *
 * Nothing here counts ticks. A clock is two numbers — time banked from
 * earlier segments, plus the timestamp the current segment started at (null
 * while paused) — and elapsed time is always derived from "now". Rendering
 * can stall, the tab can be throttled or reloaded, and the reading is still
 * exact the next time anyone asks.
 *
 * Timestamps are epoch milliseconds with sub-millisecond precision (see
 * `now()`), so a clock written to localStorage can be picked up again after
 * a reload, or by another tab, and keep running from the same instant.
 */

// How far this machine's clock is from the shared server clock. Every machine
// stamps and reads times in server time, so a display whose clock is a few
// seconds off still shows exactly what the judges' laptop shows.
let clockOffsetMs = 0

export function setClockOffset(ms) {
  clockOffsetMs = Number.isFinite(ms) ? ms : 0
}

// performance.now() is smooth and high-resolution but counts from page load;
// anchoring it to Date.now() makes it an epoch time that survives reloads and
// matches what Firebase measures its server offset against. If the two drift
// apart (the machine slept, or its clock was changed), re-anchor.
const hasPerf = typeof performance !== 'undefined' && typeof performance.now === 'function'
let anchor = hasPerf ? Date.now() - performance.now() : 0

function localNow() {
  if (!hasPerf) return Date.now()
  const t = anchor + performance.now()
  const wall = Date.now()
  if (Math.abs(t - wall) > 1000) {
    anchor = wall - performance.now()
    return wall
  }
  return t
}

export function now() {
  return localNow() + clockOffsetMs
}

/** Stopped at zero, waiting to be started. */
export function idleClock() {
  return { accumulatedMs: 0, segmentStartedAt: null }
}

/** Running from zero as of `at`. */
export function startClock(at) {
  return { accumulatedMs: 0, segmentStartedAt: at }
}

export function isRunning(clock) {
  return clock != null && clock.segmentStartedAt != null
}

/** Stopped at zero — a stage that's ready but hasn't been started. */
export function isIdle(clock) {
  return clock != null && clock.segmentStartedAt == null && clock.accumulatedMs === 0
}

export function elapsedMs(clock, at) {
  if (!clock) return 0
  const live = clock.segmentStartedAt == null ? 0 : Math.max(0, at - clock.segmentStartedAt)
  return clock.accumulatedMs + live
}

export function pauseClock(clock, at) {
  if (!isRunning(clock)) return clock
  return { accumulatedMs: elapsedMs(clock, at), segmentStartedAt: null }
}

export function resumeClock(clock, at) {
  if (isRunning(clock)) return clock
  return { accumulatedMs: clock.accumulatedMs, segmentStartedAt: at }
}
