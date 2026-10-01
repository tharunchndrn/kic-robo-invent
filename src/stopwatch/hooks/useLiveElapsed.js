import { useLayoutEffect, useRef } from 'react'
import { formatMs } from '../lib/format.js'
import { elapsedMs, isRunning, now } from '../lib/timer.js'

/*
 * Paints a clock's reading into a DOM node every animation frame, without
 * going through React state — a 60fps re-render of the whole board just to
 * move the hundredths would be wasteful. Each frame derives the reading from
 * timestamps, so dropped or throttled frames never cost accuracy.
 *
 * `offsetMs` is added to the reading (a running total across stages).
 * Returns a ref for an element whose children React must not manage.
 */
export function useLiveElapsed(clock, { offsetMs = 0, idleText } = {}) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const paint = () => {
      el.textContent = clock || idleText == null ? formatMs(offsetMs + elapsedMs(clock, now())) : idleText
    }
    paint()
    if (!isRunning(clock)) return

    let raf
    const loop = () => {
      paint()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [clock, offsetMs, idleText])

  return ref
}
