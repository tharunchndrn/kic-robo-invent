import { motion } from 'framer-motion'
import Countdown from './Countdown'

export default function Hero() {
  const handleScroll = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col items-center justify-center pt-28 pb-20 overflow-hidden grid-bg">
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-cyan/[0.03] rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-neon-blue/[0.03] rounded-full blur-[100px]" />

        {/* Horizontal laser lines */}
        <motion.div
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-[40%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent"
        />
        <motion.div
          animate={{ opacity: [0.05, 0.2, 0.05] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute top-[45%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-blue/20 to-transparent"
        />
        <motion.div
          animate={{ opacity: [0.08, 0.25, 0.08] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          className="absolute top-[55%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent"
        />

        {/* Corner HUD elements */}
        <div className="absolute top-24 left-8 hidden lg:block">
          <div className="flex items-center gap-2 text-text-dim text-[10px] font-orbitron tracking-widest">
            <div className="w-1.5 h-1.5 bg-neon-green rounded-full pulse-glow" />
            SYS: ONLINE
          </div>
          <div className="mt-2 text-text-dim text-[10px] font-orbitron tracking-widest">
            VER: 2026.1.0
          </div>
        </div>
        <div className="absolute top-24 right-8 text-right hidden lg:block">
          <div className="flex items-center justify-end gap-2 text-text-dim text-[10px] font-orbitron tracking-widest">
            SIGNAL: ACTIVE
            <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full pulse-glow" />
          </div>
          <div className="mt-2 text-text-dim text-[10px] font-orbitron tracking-widest">
            LOC: KANDY, LK
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full text-center px-4 max-w-5xl mx-auto flex-1 flex flex-col justify-center items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="px-6 py-2 border border-cyber-border/80 bg-cyber-dark/30 backdrop-blur-sm rounded-sm">
            <span className="font-orbitron text-[9px] sm:text-xs tracking-[0.15em] sm:tracking-[0.3em] text-neon-cyan uppercase">
              NIBM Kandy Innovation Center, Present's
            </span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-4 relative flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          <h1 className="font-orbitron text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-widest text-white glow-text leading-none">
            ROBO-INVENT
          </h1>
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-orbitron text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-neon-blue glow-text leading-none"
          >
            2026
          </motion.p>
        </motion.div>



        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-4 flex items-center justify-center gap-4 sm:gap-6 flex-wrap"
        >
          {['Build', 'Code', 'Navigate', 'Innovate'].map((word, i) => (
            <span key={word} className="flex items-center gap-4 sm:gap-6">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 + i * 0.1 }}
                className="font-orbitron text-[10px] sm:text-sm tracking-[0.15em] sm:tracking-[0.25em] text-text-secondary uppercase"
              >
                {word}
              </motion.span>
              {i < 3 && <span className="text-neon-cyan/80 text-sm">•</span>}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="https://forms.gle/veywtaSV25KpvPPZ6"
            target="_blank"
            rel="noopener noreferrer"
            animate={{ boxShadow: ['0 0 20px rgba(59,130,246,0.4)', '0 0 40px rgba(59,130,246,0.8)', '0 0 20px rgba(59,130,246,0.4)'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="group px-8 py-3 bg-neon-blue hover:bg-blue-500 text-white font-orbitron text-xs sm:text-sm font-bold tracking-widest transition-colors duration-300 rounded-sm"
          >
            REGISTER YOUR SCHOOL
          </motion.a>
          <a
            href="#challenge"
            onClick={(e) => handleScroll(e, '#challenge')}
            className="group px-8 py-3 border border-cyber-border text-white font-orbitron text-xs sm:text-sm font-bold tracking-widest hover:border-text-dim hover:bg-cyber-dark/50 transition-all duration-300 rounded-sm"
          >
            VIEW CHALLENGE
          </a>
        </motion.div>

        {/* Countdown */}
        <div className="mt-6 w-full">
          <Countdown />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[9px] font-orbitron tracking-[0.3em] text-text-dim">SCROLL</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-text-dim to-transparent" />
      </motion.div>
    </section>
  )
}
