import lockup from '../assets/brand/robo-invent-lockup.png'
import lockupColour from '../assets/brand/robo-invent-lockup-colour.png'

/*
 * Official event mark, shipped as two files — white-on-transparent for the
 * dark theme, full-colour for light — index.css swaps which is in the
 * document flow. Both pre-cropped to the same artwork bounds so sizing is
 * done purely with height utilities.
 *
 *   1956 x 622 (3.14:1) — icon + "KIC ROBO-INVENT 2026"
 *
 * The square icon variants live alongside these in src/assets/brand/ if a
 * future layout needs them.
 */
export function RoboInventLockup({ className = '' }) {
  return (
    <>
      <img
        src={lockup}
        alt="KIC Robo-Invent 2026"
        className={`logo-dark ${className}`}
        width={1956}
        height={622}
        draggable={false}
      />
      <img
        src={lockupColour}
        alt="KIC Robo-Invent 2026"
        className={`logo-light ${className}`}
        width={1956}
        height={622}
        draggable={false}
      />
    </>
  )
}
