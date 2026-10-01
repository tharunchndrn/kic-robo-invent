import { useEffect, useState } from 'react'

/** Full-screen state for projector pages, plus a toggle. */
export function useFullscreen() {
  const [fullscreen, setFullscreen] = useState(() => document.fullscreenElement != null)

  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement != null)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const toggle = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    else document.documentElement.requestFullscreen?.().catch(() => {})
  }

  return [fullscreen, toggle]
}
