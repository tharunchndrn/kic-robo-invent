import { motion } from 'framer-motion'
import { Rocket, BookOpen, GraduationCap, Trophy, AlertCircle } from 'lucide-react'

const phases = [
  {
    phase: '01',
    time: 'June Week 1',
    title: 'Launch & Registration Open',
    desc: 'Official invitations sent to schools. Registration portal opens.',
    icon: Rocket,
    labelColor: 'text-neon-cyan',
    iconColor: 'text-neon-cyan',
    dotColor: 'bg-neon-cyan',
  },
  {
    phase: '02',
    time: 'July Week 1',
    title: 'Registration Closes & Handbook Released',
    desc: 'Team slots confirmed. Competition handbook and challenge specifications released.',
    icon: BookOpen,
    labelColor: 'text-neon-blue',
    iconColor: 'text-neon-blue',
    dotColor: 'bg-neon-blue',
  },
  {
    phase: '03',
    time: 'July to August',
    title: 'Robotics Bootcamp',
    desc: 'Mandatory 4-day training program at KIC Campus labs.',
    icon: GraduationCap,
    labelColor: 'text-neon-amber',
    iconColor: 'text-neon-amber',
    dotColor: 'bg-neon-amber',
  },
  {
    phase: '04',
    time: 'September 2026',
    title: 'Grand Finale at KIC NIBM',
    desc: 'Time trials, judging, pit lanes, panel evaluation, and award ceremony.',
    icon: Trophy,
    labelColor: 'text-neon-green',
    iconColor: 'text-neon-green',
    dotColor: 'bg-neon-green',
    note: 'Final date to be announced soon',
  },
]

export default function Timeline() {
  return (
    <section id="timeline" className="py-20 md:py-28 px-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="section-label">Mission Timeline</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold text-white glow-text mt-6 mb-16 tracking-wide"
        >
          Competition Timeline
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-neon-cyan/30 via-neon-blue/20 to-neon-green/30">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'easeOut' }}
              className="w-full bg-gradient-to-b from-neon-cyan via-neon-blue to-neon-green opacity-40"
            />
          </div>

          {/* Phase cards */}
          <div className="space-y-12">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className={`relative flex items-start gap-6 md:gap-0 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                  <div className={`w-3 h-3 rounded-full ${phase.dotColor} shadow-lg`}>
                    <div className={`absolute inset-0 rounded-full ${phase.dotColor} animate-ping opacity-20`} />
                  </div>
                </div>

                {/* Card */}
                <div className={`ml-12 md:ml-0 md:w-[45%] ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="cyber-card p-6 rounded-sm">
                    {/* Phase & Time */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`font-orbitron text-[10px] tracking-[0.2em] ${phase.labelColor}`}>
                        PHASE {phase.phase}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-text-dim" />
                      <span className="font-orbitron text-[10px] tracking-[0.15em] text-text-dim">
                        {phase.time}
                      </span>
                    </div>

                    {/* Icon + Title */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-sm bg-cyber-dark border border-cyber-border ${phase.iconColor}`}>
                        <phase.icon size={18} />
                      </div>
                      <h3 className="font-orbitron text-sm md:text-base font-semibold text-text-primary">
                        {phase.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="font-space text-sm text-text-secondary leading-relaxed">
                      {phase.desc}
                    </p>

                    {/* Note */}
                    {phase.note && (
                      <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-neon-amber/5 border border-neon-amber/20 rounded-sm">
                        <AlertCircle size={12} className="text-neon-amber flex-shrink-0" />
                        <span className="font-space text-xs text-neon-amber/80">{phase.note}</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
