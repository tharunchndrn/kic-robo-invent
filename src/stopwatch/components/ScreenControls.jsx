import { LAUNCHER_HREF } from '../lib/screens.js'
import { useIdleHide } from '../hooks/useIdleHide.js'

/*
 * Touch-sized "Change screen" / "Full screen" buttons for wall screens and
 * smart boards. They fade out when nobody's touching the screen, and come
 * back on any tap or pointer movement.
 */
export default function ScreenControls({ fullscreen, onToggleFullscreen }) {
  const visible = useIdleHide()

  return (
    <div
      className={`flex items-center gap-3 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={(e) => e.stopPropagation()}
    >
      <a href={LAUNCHER_HREF} className="btn btn-ghost h-12 sm:h-14 px-6 text-[11px] sm:text-xs bg-card/60">
        Change screen
      </a>
      <button type="button" onClick={onToggleFullscreen} className="btn btn-ghost h-12 sm:h-14 px-6 text-[11px] sm:text-xs bg-card/60">
        {fullscreen ? 'Exit full screen' : 'Full screen'}
      </button>
    </div>
  )
}
