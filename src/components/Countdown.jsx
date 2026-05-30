import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, AlertCircle } from 'lucide-react'

export default function Countdown() {
  const targetDate = new Date('2026-09-01T00:00:00').getTime()

  const calculateTime = () => {
    const now = new Date().getTime()
    const diff = targetDate - now
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    }
  }

  const [time, setTime] = useState(calculateTime)

  useEffect(() => {
    const interval = setInterval(() => setTime(calculateTime), 1000)
    return () => clearInterval(interval)
  }, [])

  const timeCards = [
    { label: 'DAYS', value: time.days },
    { label: 'HOURS', value: time.hours },
    { label: 'MINUTES', value: time.minutes },
    { label: 'SECONDS', value: time.seconds },
  ]

  return (
    <div className="mt-12 w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full pulse-glow" />
        <span className="font-orbitron text-[11px] sm:text-xs md:text-sm tracking-[0.2em] text-neon-cyan glow-text uppercase">
          Countdown to September 2026 Competition Window
        </span>
        <span className="w-1.5 h-1.5 bg-neon-cyan rounded-full pulse-glow" />
      </div>

      {/* Timer Cards */}
      <div className="flex justify-center gap-4 md:gap-6">
        {timeCards.map((card, i) => (
          <div key={card.label} className="flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 + i * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center border border-cyber-border/30 rounded-sm hud-corners bg-cyber-dark/40 backdrop-blur-sm">
                <motion.span
                  key={card.value}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-orbitron text-2xl sm:text-3xl md:text-5xl font-bold text-white"
                >
                  {String(card.value).padStart(2, '0')}
                </motion.span>
              </div>
              <span className="mt-3 font-orbitron text-[9px] sm:text-[10px] tracking-[0.2em] text-text-dim">
                {card.label}
              </span>
            </motion.div>
            
            {/* Colon Separator */}
            {i < 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="font-orbitron text-text-dim text-xl sm:text-2xl md:text-3xl mx-2 sm:mx-3 mb-8"
              >
                :
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
        className="mt-6 flex flex-col items-center gap-4"
      >
        <p className="font-orbitron text-[10px] sm:text-xs md:text-sm text-neon-amber glow-text tracking-[0.2em] uppercase">
          Official event date will be announced soon
        </p>
        <div className="flex justify-center mt-2">
          <div className="flex gap-1 opacity-30">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="w-0.5 h-2 bg-text-dim" />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
