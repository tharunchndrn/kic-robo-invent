import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Cpu, Navigation, AlertTriangle, ShieldCheck, Activity } from 'lucide-react'

export default function SmartCityTrack() {
  const [progress, setProgress] = useState(0)
  const animRef = useRef(null)

  useEffect(() => {
    let start = null
    const duration = 12000 // 12 seconds for a complete circuit run

    const animate = (timestamp) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const p = (elapsed % duration) / duration
      setProgress(p)
      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  // Closed loop route with built-in obstacle avoidance maneuvers
  const route = [
    { x: 50, y: 320 },   // Start / Finish Gate
    { x: 50, y: 180 },   // Straight run
    { x: 150, y: 180 },  // Curve 1
    { x: 150, y: 80 },   // Straight run past Signal 1

    // Obstacle Avoidance Maneuver 1 (Zig-zag)
    { x: 200, y: 80 },
    { x: 220, y: 55 },   // Dodge up
    { x: 240, y: 105 },  // Dodge down
    { x: 260, y: 80 },   // Recover path
    { x: 300, y: 80 },   // Straight run

    { x: 300, y: 220 },  // Curve 2 past Signal 2

    // Obstacle Avoidance Maneuver 2 (Loop curve)
    { x: 330, y: 220 },
    { x: 350, y: 250 },  // Dodge down
    { x: 370, y: 220 },  // Recover path
    { x: 400, y: 220 },

    { x: 400, y: 320 },  // Final turn
    { x: 225, y: 320 },  // Return straight
    { x: 50, y: 320 },   // Seamless loop close
  ]

  // Checkpoints
  const checkpoints = [
    { x: 150, y: 180, label: 'CP1' },
    { x: 300, y: 80, label: 'CP2' },
    { x: 300, y: 220, label: 'CP3' },
    { x: 400, y: 320, label: 'CP4' },
  ]

  // Traffic signals
  const signals = [
    { x: 150, y: 130, label: 'SIG 1' },
    { x: 300, y: 150, label: 'SIG 2' },
  ]

  // Obstacles (visual placement near dodge points)
  const obstacles = [
    { x: 230, y: 80, label: 'B_01' },
    { x: 350, y: 220, label: 'B_02' },
  ]

  // Generate SVG path string
  const pathD = route.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  // Calculate robot position along route
  const totalSegments = route.length - 1
  const currentSegment = Math.floor(progress * totalSegments)
  const segProgress = (progress * totalSegments) - currentSegment
  const from = route[Math.min(currentSegment, route.length - 1)]
  const to = route[Math.min(currentSegment + 1, route.length - 1)]

  const robotX = from.x + (to.x - from.x) * segProgress
  const robotY = from.y + (to.y - from.y) * segProgress

  // Dynamic Telemetry Calculations
  const dx = to.x - from.x
  const dy = to.y - from.y
  let heading = Math.round(Math.atan2(dy, dx) * (180 / Math.PI))
  if (heading < 0) heading += 360

  // Detect speed & action profile based on position
  let action = 'SYS_OK: CRUISING'
  let speed = 1.0 // m/s
  let sensorStatus = 'SCANNING: ALL CLEAR'
  let battery = 98 - Math.floor(progress * 3) // Dynamic battery drain simulation

  if ((currentSegment >= 4 && currentSegment <= 7) || (currentSegment >= 10 && currentSegment <= 12)) {
    action = 'ALERT: OBSTACLE DETECTED'
    speed = 0.5
    sensorStatus = 'SONAR: PATH REDIRECT'
  } else if (currentSegment === 3 || currentSegment === 9) {
    action = 'WAIT: INTERSECTION DECAL'
    speed = 0.7
    sensorStatus = 'IR: ACQUIRING SIGNALS'
  } else if (currentSegment === 14) {
    action = 'STAT: LAP COMPLETED'
    speed = 1.2
    sensorStatus = 'SYS: MARKER CONFIRMED'
  }

  return (
    <div className="cyber-card p-6 rounded-sm bg-cyber-dark/40 border border-cyber-border shadow-2xl relative overflow-hidden group">
      {/* Dynamic scan line overlay */}
      <div className="absolute inset-0 bg-scan-lines opacity-[0.03] pointer-events-none" />

      {/* Futuristic Header */}
      <div className="flex items-center justify-between mb-4 relative z-10 border-b border-cyber-border/40 pb-3">
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-neon-cyan animate-pulse" />
          <span className="font-orbitron text-[10px] tracking-[0.25em] text-white glow-text uppercase font-bold">
            EXAMPLE SCHEMATIC TRACK
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-orbitron text-[8px] text-text-dim uppercase tracking-wider">GRID_KANDY_2026</span>
          <div className="flex items-center gap-1 bg-neon-cyan/10 px-2 py-0.5 border border-neon-cyan/30 rounded-sm">
            <Cpu size={10} className="text-neon-cyan animate-spin" style={{ animationDuration: '6s' }} />
            <span className="font-orbitron text-[8px] text-neon-cyan font-bold tracking-widest">LIVE SIM</span>
          </div>
        </div>
      </div>

      {/* Main Track Display Area */}
      <div className="relative bg-cyber-black border border-cyber-border/60 rounded-sm overflow-hidden shadow-inner" style={{ aspectRatio: '500/380' }}>

        {/* Futuristic Map Brackets */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-neon-cyan/40" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-neon-cyan/40" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-neon-cyan/40" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-neon-cyan/40" />

        {/* Holographic Watermarks / Text Inside Map */}
        <div className="absolute top-4 left-6 font-orbitron text-[7px] text-neon-cyan/30 tracking-widest uppercase select-none">
          SYS_SECTOR: CENTRAL_KANDY<br />
          SCALE: 1:120
        </div>
        <div className="absolute bottom-4 right-6 font-orbitron text-[7px] text-text-dim/40 tracking-widest select-none text-right">
          CHASSIS_SYS: ACTIVE<br />
          FREQ_BW: 5.8GHZ_BAND
        </div>

        {/* SVG Drawing Canvas */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 380" preserveAspectRatio="xMidYMid meet">

          {/* Subtle Grid System */}
          {Array.from({ length: 11 }).map((_, i) => (
            <line key={`vg${i}`} x1={i * 50} y1={0} x2={i * 50} y2={380} stroke="rgba(0,240,255,0.02)" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`hg${i}`} x1={0} y1={i * 50} x2={500} y2={i * 50} stroke="rgba(0,240,255,0.02)" strokeWidth="0.5" />
          ))}

          {/* Glowing Crosshairs at major intersections */}
          {[[100, 100], [200, 200], [300, 300], [400, 100], [100, 300]].map(([cx, cy], idx) => (
            <g key={`ch${idx}`} className="opacity-10" transform={`translate(${cx}, ${cy})`}>
              <line x1="-5" y1="0" x2="5" y2="0" stroke="#00f0ff" strokeWidth="0.5" />
              <line x1="0" y1="-5" x2="0" y2="5" stroke="#00f0ff" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="1.5" fill="none" stroke="#00f0ff" strokeWidth="0.5" />
            </g>
          ))}

          {/* ========================================================
              HIGH-FIDELITY CYBER HIGHWAY ROAD LANE DRAWING
              ======================================================== */}
          {/* 1. Translucent Road Base (Dark cyber asphalt) */}
          <path d={pathD} fill="none" stroke="rgba(30, 41, 59, 0.9)" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" />
          <path d={pathD} fill="none" stroke="rgba(15, 23, 42, 0.95)" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />

          {/* 2. Double Neon Guardrails (Outer borders of the track) */}
          <path d={pathD} fill="none" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
          <path d={pathD} fill="none" stroke="rgba(0, 240, 255, 0.25)" strokeWidth="19" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 8" />

          {/* 3. Center Lane Divider Line */}
          <path d={pathD} fill="none" stroke="rgba(0, 240, 255, 0.45)" strokeWidth="0.75" strokeDasharray="4 6" strokeLinecap="round" strokeLinejoin="round" />

          {/* 4. Active Laser Flow Overlay (Sweeping light impulse) */}
          <motion.path
            d={pathD}
            fill="none"
            stroke="rgba(0, 240, 255, 0.7)"
            strokeWidth="1.5"
            strokeDasharray="20 40"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ strokeDashoffset: -120 }}
            transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          />

          {/* Checkpoints (Refined glowing nodes) */}
          {checkpoints.map((cp) => (
            <g key={cp.label} transform={`translate(${cp.x}, ${cp.y})`}>
              <circle cx="0" cy="0" r="8" fill="rgba(15,23,42,0.9)" stroke="rgba(0,240,255,0.4)" strokeWidth="1" />
              <circle cx="0" cy="0" r="2" fill="#00f0ff" className="animate-ping" style={{ animationDuration: '3s' }} />
              <text x="-4" y="2.5" fill="rgba(0,240,255,0.8)" fontSize="5.5" fontFamily="Orbitron" className="select-none font-bold">{cp.label}</text>
            </g>
          ))}

          {/* Obstacles (Avoidance Barriers with Tech Styling) */}
          {obstacles.map((obs, i) => (
            <g key={`obs${i}`} transform={`translate(${obs.x}, ${obs.y})`}>
              {/* Outer hazard zone circle */}
              <circle cx="0" cy="0" r="12" fill="rgba(239,68,68,0.05)" stroke="rgba(239,68,68,0.25)" strokeWidth="0.5" strokeDasharray="2 2" />
              {/* Core barrier diamond */}
              <rect x="-6" y="-6" width="12" height="12" fill="rgba(239,68,68,0.15)" stroke="#ef4444" strokeWidth="1" transform="rotate(45)" />
              {/* Hazard line inside */}
              <line x1="-3" y1="-3" x2="3" y2="3" stroke="#ef4444" strokeWidth="1.5" />
              {/* Label */}
              <text x="8" y="2.5" fill="#ef4444" fontSize="6.5" fontFamily="Orbitron" letterSpacing="0.05em" className="font-bold select-none">{obs.label}</text>
            </g>
          ))}

          {/* Start / Finish Checkered Gate */}
          <g transform={`translate(${50}, ${320})`}>
            {/* Holographic backdrop */}
            <rect x="-10" y="-18" width="20" height="36" fill="rgba(0,240,255,0.02)" stroke="rgba(0,240,255,0.1)" strokeWidth="0.5" />

            {/* Gate Pillars */}
            <line x1="-12" y1="-18" x2="-12" y2="18" stroke="rgba(0,240,255,0.4)" strokeWidth="1" />
            <line x1="12" y1="-18" x2="12" y2="18" stroke="rgba(0,240,255,0.4)" strokeWidth="1" />

            {/* Checkered Start Line */}
            <line x1="-12" y1="0" x2="12" y2="0" stroke="white" strokeWidth="3" strokeDasharray="2 2" />
            <circle cx="0" cy="0" r="3.5" fill="none" stroke="#22c55e" strokeWidth="1" />
            <circle cx="0" cy="0" r="1.5" fill="#22c55e" />

            {/* Glowing Tag */}
            <text x="16" y="2.5" fill="#22c55e" fontSize="7" fontFamily="Orbitron" fontWeight="bold" letterSpacing="0.1em" className="glow-text select-none">START_GATE</text>
          </g>

          {/* Traffic Signals (Custom Post structure) */}
          {signals.map((sig, i) => {
            const isRed = progress > 0.35 && progress < 0.65 && i === 0;
            const sigColor = isRed ? '#ef4444' : '#22c55e';
            return (
              <g key={sig.label} transform={`translate(${sig.x}, ${sig.y})`}>
                {/* Structural post line */}
                <line x1="-8" y1="0" x2="0" y2="0" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                {/* Signal box */}
                <rect x="-14" y="-5" width="6" height="10" rx="1" fill="#111" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                {/* Glowing light lens */}
                <circle cx="-11" cy="0" r="3.5" fill={sigColor} opacity="0.2" />
                <circle cx="-11" cy="0" r="1.75" fill={sigColor}>
                  <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
                </circle>
                {/* Label */}
                <text x="6" y="2.5" fill={sigColor} fontSize="6" fontFamily="Orbitron" fontWeight="bold" className="opacity-80 select-none">{sig.label}</text>
              </g>
            );
          })}

          {/* ========================================================
              ADVANCED COMPASS ROBOT CHASSIS SPRITE
              ======================================================== */}
          <g transform={`translate(${robotX}, ${robotY})`}>
            {/* Outer rotating vector compass rings */}
            <circle cx="0" cy="0" r="16" fill="none" stroke="rgba(0,240,255,0.1)" strokeWidth="0.75" strokeDasharray="3 4">
              <animate attributeName="transform" type="rotate" from="0" to="360" dur="8s" repeatCount="indefinite" />
            </circle>
            <circle cx="0" cy="0" r="11" fill="none" stroke="rgba(0,240,255,0.2)" strokeWidth="0.5" />

            {/* Inner radar scan wave */}
            <circle cx="0" cy="0" r="13" fill="none" stroke="rgba(0,240,255,0.2)" strokeWidth="1">
              <animate attributeName="r" values="8;20;8" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="1.8s" repeatCount="indefinite" />
            </circle>

            {/* Solid mechanical-style chassis block */}
            <circle cx="0" cy="0" r="7.5" fill="#0b1329" stroke="#00f0ff" strokeWidth="1.5" />

            {/* Heading vector arrow */}
            <g transform={`rotate(${heading - 90})`}>
              {/* Direction pointer */}
              <path d="M-4,3 L0,-9 L4,3 Z" fill="#00f0ff" stroke="#00f0ff" strokeWidth="0.5" />
              {/* Laser eye */}
              <circle cx="0" cy="-3" r="1.5" fill="white" />
            </g>

            {/* Mini core spark */}
            <circle cx="0" cy="0" r="1" fill="#fff" />
          </g>
        </svg>
      </div>

      {/* Real-time HUD Telemetry Interface */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-cyber-black border border-cyber-border/70 p-3 rounded-sm font-orbitron relative">
        {/* Dynamic bracket design inside HUD */}
        <div className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-neon-cyan/40" />
        <div className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-neon-cyan/40" />

        <div className="flex flex-col border-r border-cyber-border/30 pr-2">
          <span className="text-[7px] tracking-widest text-text-dim uppercase font-semibold">HEADING_VECTOR</span>
          <span className="text-[10px] text-neon-cyan flex items-center gap-1 mt-1 font-bold">
            <Navigation size={10} style={{ transform: `rotate(${heading}deg)` }} className="text-neon-cyan transition-transform duration-200" />
            HDG: {heading.toString().padStart(3, '0')}°
          </span>
        </div>

        <div className="flex flex-col sm:border-r border-cyber-border/30 pr-2 pl-1">
          <span className="text-[7px] tracking-widest text-text-dim uppercase font-semibold">VELOCITY_REG</span>
          <span className="text-[10px] text-white mt-1 font-bold">
            SPD: {speed.toFixed(2)} m/s
          </span>
        </div>

        <div className="flex flex-col border-r border-cyber-border/30 pr-2 pl-1">
          <span className="text-[7px] tracking-widest text-text-dim uppercase font-semibold">POWER_CELL</span>
          <span className="text-[10px] text-neon-cyan mt-1 font-bold">
            BAT: {battery}%
          </span>
        </div>

        <div className="flex flex-col pl-1">
          <span className="text-[7px] tracking-widest text-text-dim uppercase font-semibold">NAV_LOGIC</span>
          <span className={`text-[9px] mt-1 flex items-center gap-1 font-bold truncate ${action.includes('ALERT') ? 'text-neon-red animate-pulse' : action.includes('WAIT') ? 'text-neon-amber' : 'text-neon-green'
            }`}>
            {action.includes('ALERT') ? (
              <AlertTriangle size={10} className="text-neon-red flex-shrink-0 animate-bounce" />
            ) : (
              <ShieldCheck size={10} className="text-neon-green flex-shrink-0" />
            )}
            {action}
          </span>
        </div>
      </div>

      {/* Legend Block */}
      <div className="mt-4 flex flex-wrap gap-4 text-[8px] font-orbitron tracking-widest text-text-dim border-t border-cyber-border/20 pt-3">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full shadow-[0_0_8px_rgba(0,240,255,0.5)]" />
          RI_AUTONOMOUS_BOT
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-neon-green rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          START_FINISH_GATE
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-neon-red rounded-full shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
          DODGE_BARRIERS
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-[1.5px] bg-neon-cyan opacity-40" />
          LANE_DIVIDER
        </span>
      </div>
    </div>
  )
}
