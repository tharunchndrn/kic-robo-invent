import lockup from '../assets/brand/robo-invent-lockup.png'

/*
 * Official event mark. This is the white variant, pre-cropped to its artwork,
 * so sizing is done purely with height utilities.
 *
 *   1956 x 622 (3.14:1) — icon + "KIC ROBO-INVENT 2026"
 *
 * The square icon and the colour variants live alongside it in
 * src/assets/brand/ if a future layout needs them.
 */
export function RoboInventLockup({ className = '' }) {
  return (
    <img
      src={lockup}
      alt="KIC Robo-Invent 2026"
      className={className}
      width={1956}
      height={622}
      draggable={false}
    />
  )
}
