import { useState, useEffect } from 'react'

const TARGET = new Date('2026-09-01T00:00:00').getTime()

function remaining() {
  const diff = TARGET - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

/* Centred inside the hero frame so it reads above the fold. */
export default function Countdown() {
  const [time, setTime] = useState(remaining)

  useEffect(() => {
    const id = setInterval(() => setTime(remaining()), 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { label: 'Days', value: time.days, pad: 3 },
    { label: 'Hours', value: time.hours, pad: 2 },
    { label: 'Minutes', value: time.minutes, pad: 2 },
    { label: 'Seconds', value: time.seconds, pad: 2 },
  ]

  return (
    <div className="flex flex-col items-center text-center">
      <span className="flex items-center gap-2.5">
        <span className="relative flex w-2 h-2">
          <span className="absolute inset-0 rounded-full bg-flare opacity-60 animate-ping" />
          <span className="relative w-2 h-2 rounded-full bg-flare" />
        </span>
        <span className="eyebrow-bare text-ink-mute">Grand finale in</span>
      </span>

      <div className="mt-4 flex items-start gap-4 sm:gap-8 lg:gap-11">
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-start gap-4 sm:gap-8 lg:gap-11">
            <div className="flex flex-col items-center">
              <span className="font-display font-semibold tnum text-[34px] sm:text-[52px] lg:text-[64px] leading-[0.82] tracking-[-0.05em] text-ink">
                {String(unit.value).padStart(unit.pad, '0')}
              </span>
              <span className="mt-2.5 eyebrow-bare text-ink-faint">{unit.label}</span>
            </div>
            {i < units.length - 1 && (
              <span className="w-px h-7 sm:h-10 lg:h-12 bg-rule mt-1" aria-hidden />
            )}
          </div>
        ))}
      </div>

      <p className="mt-5 font-mono text-[10px] tracking-[0.16em] uppercase text-ink-mute">
        September 2026 &middot; exact date to be announced
      </p>
    </div>
  )
}
