import { motion } from 'framer-motion'

/*
 * Side elevation of the competition rover, drawn as an engineering study
 * rather than a render: bone hairlines on a dark plate, one cyan for
 * anything the robot senses or emits. Differential drive — one powered wheel
 * visible in profile, castor at the rear.
 */

const INK = '#e9eff5'
const MUTE = '#7c8c9c'
const RULE = '#2c4459'
const FLARE = '#12b5de'
/* Body fill and the plate the dimension label sits on — matches the
   paper-deep band this drawing lives in. */
const BODY = '#112232'
const PLATE = '#0c1927'

const GROUND = 350
const IR_BEAMS = [414, 431, 448, 465, 482]

export default function RoverSchematic({ className = '' }) {
  return (
    <motion.svg
      viewBox="0 0 640 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Technical side elevation of an autonomous line-following rover"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ---------------------------------------------------------------
          GROUND PLANE + THE LINE THE ROBOT IS FOLLOWING
          --------------------------------------------------------------- */}
      <g>
        {Array.from({ length: 29 }).map((_, i) => (
          <line
            key={`tick-${i}`}
            x1={62 + i * 19}
            y1={GROUND + 3}
            x2={56 + i * 19}
            y2={GROUND + 13}
            stroke={RULE}
            strokeWidth="1"
          />
        ))}
        <line x1="56" y1={GROUND} x2="612" y2={GROUND} stroke={INK} strokeWidth="1.5" />
        <line
          x1="56"
          y1={GROUND}
          x2="612"
          y2={GROUND}
          stroke={FLARE}
          strokeWidth="3"
          strokeDasharray="26 14"
          style={{ animation: 'dash-run 14s linear infinite' }}
          opacity="0.9"
        />
      </g>

      {/* ---------------------------------------------------------------
          THE ROVER — held still like a drawing; only the parts that
          actually move or emit are animated.
          --------------------------------------------------------------- */}
      <g>
        {/* Chassis deck */}
        <rect x="145" y="228" width="340" height="48" rx="12" fill={BODY} stroke={INK} strokeWidth="2" />
        <line x1="145" y1="252" x2="485" y2="252" stroke={RULE} strokeWidth="1" strokeDasharray="4 5" />

        {/* Battery pack slung under the deck */}
        <rect x="296" y="276" width="112" height="26" rx="5" fill={BODY} stroke={INK} strokeWidth="1.5" />
        {[314, 330, 346, 362, 378, 394].map((x) => (
          <line key={`cell-${x}`} x1={x} y1="280" x2={x} y2="298" stroke={RULE} strokeWidth="1" />
        ))}

        {/* Controller board on the deck */}
        <rect x="206" y="190" width="124" height="38" rx="5" fill={BODY} stroke={INK} strokeWidth="1.8" />
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={`pin-${i}`} x1={216 + i * 8} y1="190" x2={216 + i * 8} y2="196" stroke={MUTE} strokeWidth="1.4" />
        ))}
        <rect x="238" y="203" width="30" height="17" rx="2" fill={INK} />
        <circle cx="292" cy="211" r="5" fill="none" stroke={MUTE} strokeWidth="1.4" />
        <circle cx="312" cy="211" r="3" fill={FLARE}>
          <animate attributeName="opacity" values="1;0.15;1" dur="1.6s" repeatCount="indefinite" />
        </circle>

        {/* Telemetry mast */}
        <line x1="352" y1="228" x2="352" y2="152" stroke={INK} strokeWidth="1.8" />
        <circle cx="352" cy="148" r="5" fill={FLARE} />
        {[14, 24, 34].map((r, i) => (
          <circle key={`ping-${r}`} cx="352" cy="148" r={r} fill="none" stroke={FLARE} strokeWidth="1" opacity="0">
            <animate
              attributeName="opacity"
              values="0.55;0"
              dur="2.4s"
              begin={`${i * 0.8}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}

        {/* Ultrasonic range finder, standing on the nose */}
        <rect x="462" y="182" width="56" height="46" rx="6" fill={BODY} stroke={INK} strokeWidth="1.8" />
        <circle cx="478" cy="205" r="11" fill="none" stroke={INK} strokeWidth="1.5" />
        <circle cx="478" cy="205" r="5" fill="none" stroke={MUTE} strokeWidth="1" />
        <circle cx="502" cy="205" r="11" fill="none" stroke={INK} strokeWidth="1.5" />
        <circle cx="502" cy="205" r="5" fill="none" stroke={MUTE} strokeWidth="1" />

        {/* Sonar cone */}
        <g>
          <line x1="520" y1="200" x2="606" y2="168" stroke={FLARE} strokeWidth="1" strokeDasharray="5 5" />
          <line x1="520" y1="212" x2="606" y2="246" stroke={FLARE} strokeWidth="1" strokeDasharray="5 5" />
          {[
            { d: 'M 540 190 Q 552 206 540 222', delay: '0s' },
            { d: 'M 562 180 Q 578 206 562 232', delay: '0.5s' },
            { d: 'M 584 170 Q 604 206 584 242', delay: '1s' },
          ].map((arc) => (
            <path key={arc.d} d={arc.d} fill="none" stroke={FLARE} strokeWidth="1.6" strokeLinecap="round" opacity="0">
              <animate attributeName="opacity" values="0;0.85;0" dur="1.8s" begin={arc.delay} repeatCount="indefinite" />
            </path>
          ))}
        </g>

        {/* IR reflectance array under the nose */}
        <line x1="410" y1="276" x2="410" y2="302" stroke={INK} strokeWidth="1.4" />
        <line x1="478" y1="276" x2="478" y2="302" stroke={INK} strokeWidth="1.4" />
        <rect x="398" y="302" width="88" height="13" rx="3" fill={INK} />
        {IR_BEAMS.map((x, i) => (
          <line
            key={`ir-${x}`}
            x1={x}
            y1="317"
            x2={x}
            y2={GROUND - 2}
            stroke={FLARE}
            strokeWidth="1.6"
            strokeDasharray="3 4"
            opacity="0.75"
          >
            <animate
              attributeName="opacity"
              values="0.2;0.9;0.2"
              dur="1.4s"
              begin={`${i * 0.12}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}

        {/* Rear castor */}
        <line x1="168" y1="276" x2="168" y2="312" stroke={INK} strokeWidth="1.6" />
        <circle cx="168" cy="330" r="20" fill={BODY} stroke={INK} strokeWidth="1.8" />
        <circle cx="168" cy="330" r="5" fill={MUTE} />

        {/* Drive wheel */}
        <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'wheel-spin 6s linear infinite' }}>
          <circle cx="250" cy="300" r="50" fill={BODY} stroke={INK} strokeWidth="2.5" />
          <circle cx="250" cy="300" r="41" fill="none" stroke={RULE} strokeWidth="1" strokeDasharray="3 6" />
          <circle cx="250" cy="300" r="30" fill="none" stroke={INK} strokeWidth="1.5" />
          {Array.from({ length: 6 }).map((_, i) => {
            const a = (i * Math.PI) / 3
            return (
              <line
                key={`spoke-${i}`}
                x1={250 + Math.cos(a) * 11}
                y1={300 + Math.sin(a) * 11}
                x2={250 + Math.cos(a) * 29}
                y2={300 + Math.sin(a) * 29}
                stroke={INK}
                strokeWidth="1.4"
              />
            )
          })}
          <circle cx="250" cy="300" r="10" fill={FLARE} />
        </g>
      </g>

      {/* ---------------------------------------------------------------
          CALLOUTS — leader lines terminated with a dot, drawing-office style
          --------------------------------------------------------------- */}
      <g fontFamily="'JetBrains Mono', monospace" fontSize="9.5" letterSpacing="1.6" fill={MUTE}>
        <g>
          <circle cx="502" cy="205" r="2.5" fill={FLARE} />
          <path d="M 502 205 L 556 132 L 620 132" stroke={RULE} strokeWidth="1" fill="none" />
          <text x="556" y="124" textAnchor="middle">SONAR / 4 M</text>
        </g>
        <g>
          <circle cx="268" cy="209" r="2.5" fill={FLARE} />
          <path d="M 268 209 L 196 132 L 116 132" stroke={RULE} strokeWidth="1" fill="none" />
          <text x="196" y="124" textAnchor="middle">MCU</text>
        </g>
        <g>
          <circle cx="448" cy="309" r="2.5" fill={FLARE} />
          <path d="M 448 309 L 556 394 L 626 394" stroke={RULE} strokeWidth="1" fill="none" />
          <text x="556" y="386" textAnchor="middle">IR ARRAY &#215;5</text>
        </g>

        {/* Overall-width dimension */}
        <g>
          <line x1="145" y1="404" x2="145" y2="418" stroke={RULE} strokeWidth="1" />
          <line x1="518" y1="404" x2="518" y2="418" stroke={RULE} strokeWidth="1" />
          <line x1="145" y1="411" x2="518" y2="411" stroke={RULE} strokeWidth="1" />
          <rect x="284" y="402" width="96" height="18" fill={PLATE} />
          <text x="332" y="416" textAnchor="middle">250 MM MAX</text>
        </g>
      </g>
    </motion.svg>
  )
}
