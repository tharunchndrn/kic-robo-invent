import { useEffect, useRef, useState } from 'react'

/*
 * Plan view of the Smart City course, drawn as a site plan: bone kerbs on a
 * dark sheet, one cyan racing line, and a rover that drives the route.
 * Sized as a side panel, not a centrepiece — telemetry sits inline in the
 * header rather than as a separate row, so the whole thing stays compact.
 */

const INK = '#e9eff5'
const MUTE = '#7c8c9c'
const FAINT = '#4a5f74'
const ASPHALT = '#16283a'
const PLATE = '#08111c'
const FLARE = '#12b5de'
const MOSS = '#3cc98f'

const ROUTE = [
  { x: 50, y: 320 },
  { x: 50, y: 180 },
  { x: 150, y: 180 },
  { x: 150, y: 80 },
  { x: 200, y: 80 },
  { x: 220, y: 55 },
  { x: 240, y: 105 },
  { x: 260, y: 80 },
  { x: 300, y: 80 },
  { x: 300, y: 220 },
  { x: 330, y: 220 },
  { x: 350, y: 250 },
  { x: 370, y: 220 },
  { x: 400, y: 220 },
  { x: 400, y: 320 },
  { x: 225, y: 320 },
  { x: 50, y: 320 },
]

const CHECKPOINTS = [
  { x: 150, y: 180, label: 'CP1' },
  { x: 300, y: 80, label: 'CP2' },
  { x: 300, y: 220, label: 'CP3' },
  { x: 400, y: 320, label: 'CP4' },
]

const SIGNALS = [
  { x: 150, y: 130, label: 'SIG 1' },
  { x: 300, y: 150, label: 'SIG 2' },
]

const OBSTACLES = [
  { x: 230, y: 80, label: 'B1' },
  { x: 350, y: 220, label: 'B2' },
]

const PATH_D = ROUTE.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

export default function SmartCityTrack() {
  const [progress, setProgress] = useState(0)
  const frame = useRef(null)

  useEffect(() => {
    let start = null
    const duration = 14000

    const step = (t) => {
      if (start === null) start = t
      setProgress(((t - start) % duration) / duration)
      frame.current = requestAnimationFrame(step)
    }

    frame.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame.current)
  }, [])

  // Position the rover along the polyline.
  const segments = ROUTE.length - 1
  const index = Math.min(Math.floor(progress * segments), segments - 1)
  const t = progress * segments - index
  const from = ROUTE[index]
  const to = ROUTE[index + 1]

  const x = from.x + (to.x - from.x) * t
  const y = from.y + (to.y - from.y) * t

  let heading = Math.round(Math.atan2(to.y - from.y, to.x - from.x) * (180 / Math.PI))
  if (heading < 0) heading += 360

  const dodging = (index >= 4 && index <= 7) || (index >= 10 && index <= 12)
  const atSignal = index === 3 || index === 9

  const state = dodging
    ? { text: 'Bypassing', tone: FLARE, speed: 0.5 }
    : atSignal
      ? { text: 'Holding', tone: MUTE, speed: 0.7 }
      : { text: 'Cruising', tone: MOSS, speed: 1.0 }

  const signalRed = progress > 0.35 && progress < 0.65

  return (
    <div className="theme-dark-locked panel overflow-hidden">
      {/* Sheet header — carries the live telemetry inline, no separate row */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 sm:px-5 py-3 border-b border-rule">
        <span className="flex items-center gap-2">
          <span className="relative flex w-1.5 h-1.5 shrink-0">
            <span className="absolute inset-0 rounded-full bg-flare opacity-60 animate-ping" />
            <span className="relative w-1.5 h-1.5 rounded-full bg-flare" />
          </span>
          <span className="eyebrow-bare text-ink-mute">Course schematic</span>
        </span>

        <span className="flex items-center gap-3 sm:gap-4 font-mono text-[9.5px] tracking-[0.1em] uppercase">
          <span className="text-ink-faint">
            LAP <span className="text-ink tnum">{Math.round(progress * 100).toString().padStart(2, '0')}%</span>
          </span>
          <span className="text-ink-faint">
            HDG <span className="text-ink tnum">{heading.toString().padStart(3, '0')}&deg;</span>
          </span>
          <span style={{ color: state.tone }}>{state.text}</span>
        </span>
      </div>

      {/* Position rail — where the rover is right now, at a glance */}
      <div className="px-4 sm:px-5 py-2.5 border-b border-rule bg-paper-deep/50">
        <div className="h-1 rounded-full bg-rule-soft overflow-hidden">
          <div
            className="h-full rounded-full bg-flare transition-[width] duration-200 ease-linear"
            style={{ width: `${Math.max(progress * 100, 2)}%` }}
          />
        </div>
      </div>

      {/* Drawing */}
      <div className="relative bg-paper paper-grid-fine">
        <svg viewBox="0 0 500 380" className="w-full h-auto block" preserveAspectRatio="xMidYMid meet">
          <defs>
            <pattern id="rt-hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="5" stroke={FLARE} strokeWidth="1.4" />
            </pattern>
            <pattern id="rt-check" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="4" height="4" fill={INK} />
              <rect x="4" y="4" width="4" height="4" fill={INK} />
            </pattern>
          </defs>

          {/* Registration marks, one per corner */}
          {[[18, 18], [482, 18], [18, 362], [482, 362]].map(([cx, cy]) => (
            <g key={`reg-${cx}-${cy}`} stroke={FAINT} strokeWidth="1">
              <line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} />
              <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} />
            </g>
          ))}

          {/* Roadway: ink kerbs, paper asphalt, dashed centre line */}
          <path d={PATH_D} fill="none" stroke={INK} strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
          <path d={PATH_D} fill="none" stroke={ASPHALT} strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
          <path d={PATH_D} fill="none" stroke={FAINT} strokeWidth="0.9" strokeDasharray="6 8" strokeLinecap="round" />

          {/* The line the robot follows */}
          <path
            d={PATH_D}
            fill="none"
            stroke={FLARE}
            strokeWidth="2.2"
            strokeDasharray="26 44"
            strokeLinecap="round"
            style={{ animation: 'dash-run 22s linear infinite' }}
          />

          {/* Start / finish gate */}
          <g transform="translate(50 320)">
            <rect x="-13" y="-3" width="26" height="6" fill="url(#rt-check)" />
            <line x1="-14" y1="-13" x2="-14" y2="13" stroke={MOSS} strokeWidth="1.6" />
            <line x1="14" y1="-13" x2="14" y2="13" stroke={MOSS} strokeWidth="1.6" />
            <text x="0" y="30" textAnchor="middle" fill={MOSS} fontFamily="'JetBrains Mono', monospace" fontSize="8" letterSpacing="1.2">
              START
            </text>
          </g>

          {/* Checkpoints */}
          {CHECKPOINTS.map((cp) => (
            <g key={cp.label} transform={`translate(${cp.x} ${cp.y})`}>
              <circle r="8" fill={PLATE} stroke={INK} strokeWidth="1.4" />
              <circle r="2.5" fill={INK} />
              <text x="13" y="3" fill={MUTE} fontFamily="'JetBrains Mono', monospace" fontSize="8" letterSpacing="1.2">
                {cp.label}
              </text>
            </g>
          ))}

          {/* Traffic signals */}
          {SIGNALS.map((sig, i) => {
            const red = signalRed && i === 0
            const tone = red ? FLARE : MOSS
            return (
              <g key={sig.label} transform={`translate(${sig.x} ${sig.y})`}>
                <line x1="-9" y1="0" x2="0" y2="0" stroke={INK} strokeWidth="1.2" />
                <rect x="-17" y="-6" width="8" height="12" rx="2" fill={PLATE} stroke={INK} strokeWidth="1.2" />
                <circle cx="-13" cy="0" r="2.4" fill={tone}>
                  <animate attributeName="opacity" values="0.35;1;0.35" dur="1.6s" repeatCount="indefinite" />
                </circle>
                <text x="6" y="3" fill={MUTE} fontFamily="'JetBrains Mono', monospace" fontSize="7.5" letterSpacing="1.1">
                  {sig.label}
                </text>
              </g>
            )
          })}

          {/* Obstacles */}
          {OBSTACLES.map((obs) => (
            <g key={obs.label} transform={`translate(${obs.x} ${obs.y})`}>
              <circle r="13" fill="none" stroke={FLARE} strokeWidth="0.8" strokeDasharray="2 3" opacity="0.6" />
              <rect x="-6" y="-6" width="12" height="12" fill="url(#rt-hatch)" stroke={FLARE} strokeWidth="1.3" />
              <text x="11" y="-8" fill={FLARE} fontFamily="'JetBrains Mono', monospace" fontSize="7.5" letterSpacing="1.1">
                {obs.label}
              </text>
            </g>
          ))}

          {/* Rover */}
          <g transform={`translate(${x} ${y})`}>
            <circle r="15" fill="none" stroke={INK} strokeWidth="0.8" opacity="0.25">
              <animate attributeName="r" values="9;19;9" dur="2.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.35;0;0.35" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <circle r="7.5" fill={INK} />
            <g transform={`rotate(${heading - 90})`}>
              <path d="M -3.5 3 L 0 -8 L 3.5 3 Z" fill={FLARE} />
            </g>
          </g>
        </svg>

        {/* Sheet annotations */}
        <span className="absolute top-2.5 left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-[0.16em] uppercase text-ink-faint select-none">
          Scale 1:120
        </span>
      </div>
    </div>
  )
}
