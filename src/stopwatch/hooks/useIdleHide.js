import { useEffect, useState } from 'react'

/*
 * Screen chrome (buttons) that gets out of the way: visible on any touch or
 * pointer movement, hidden again after `ms` of nothing.
 */
export function useIdleHide(ms = 4000) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let timer = setTimeout(() => setVisible(false), ms)
    const wake = () => {
      setVisible(true)
      clearTimeout(timer)
      timer = setTimeout(() => setVisible(false), ms)
    }
    const events = ['pointermove', 'pointerdown', 'keydown', 'touchstart']
    events.forEach((e) => window.addEventListener(e, wake, { passive: true }))
    return () => {
      clearTimeout(timer)
      events.forEach((e) => window.removeEventListener(e, wake))
    }
  }, [ms])

  return visible
}
