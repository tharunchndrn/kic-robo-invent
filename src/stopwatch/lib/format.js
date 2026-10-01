/*
 * Stopwatch convention: readings are truncated, never rounded up — a robot
 * that took 12.348s did not take 12.35s.
 */
export function formatMs(ms, { hundredths = true } = {}) {
  if (ms == null || !Number.isFinite(ms)) return '—'
  const total = Math.max(0, Math.floor(ms))
  const cs = Math.floor((total % 1000) / 10)
  const s = Math.floor(total / 1000) % 60
  const m = Math.floor(total / 60000) % 60
  const h = Math.floor(total / 3600000)

  const ss = String(s).padStart(2, '0')
  const frac = hundredths ? `.${String(cs).padStart(2, '0')}` : ''
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${ss}${frac}`
  return `${String(m).padStart(2, '0')}:${ss}${frac}`
}

/**
 * Parses what an operator would type to correct a time: "1:02.35", "62.35",
 * "01:02", "1:01:02.5". Returns milliseconds, or null if it isn't a time.
 */
export function parseTime(input) {
  const str = String(input ?? '').trim()
  const match = /^(?:(?:(\d+):)?(\d{1,2}):)?(\d+)(?:\.(\d{1,3}))?$/.exec(str)
  if (!match) return null

  const [, h, m, s, frac] = match
  const hasMinutes = m != null
  const seconds = Number(s)
  // Once minutes are given, seconds is a clock field and must stay under 60.
  if (hasMinutes && seconds >= 60) return null
  if (h != null && Number(m) >= 60) return null

  const ms =
    (Number(h ?? 0) * 3600 + Number(m ?? 0) * 60 + seconds) * 1000 +
    (frac ? Number(frac.padEnd(3, '0')) : 0)
  return ms
}
