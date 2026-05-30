import { motion } from 'framer-motion'
import { Cpu, Radio, Code, Rocket, MapPin, Calendar } from 'lucide-react'

const days = [
  {
    day: '01',
    title: 'Foundation & Hardware',
    icon: Cpu,
    topics: [
      'Introduction to Arduino',
      'Electronic components',
      'Circuit wiring basics',
      'Sensor fundamentals',
    ],
    iconColor: 'text-neon-cyan',
    dayColor: 'text-neon-cyan',
    dotColor: 'bg-neon-cyan',
  },
  {
    day: '02',
    title: 'Sensors & Logic',
    icon: Radio,
    topics: [
      'IR and ultrasonic sensors',
      'Motor control',
      'Logic design patterns',
      'Signal processing',
    ],
    iconColor: 'text-neon-blue',
    dayColor: 'text-neon-blue',
    dotColor: 'bg-neon-blue',
  },
  {
    day: '03',
    title: 'Programming & Control',
    icon: Code,
    topics: [
      'Arduino IDE basics',
      'Autonomous control loops',
      'Line tracking algorithms',
      'Traffic signal response',
    ],
    iconColor: 'text-neon-amber',
    dayColor: 'text-neon-amber',
    dotColor: 'bg-neon-amber',
  },
  {
    day: '04',
    title: 'Integration & Testing',
    icon: Rocket,
    topics: [
      'Full robot assembly',
      'Obstacle avoidance tuning',
      'Challenge simulation run',
      'Team strategy and presentation',
    ],
    iconColor: 'text-neon-green',
    dayColor: 'text-neon-green',
    dotColor: 'bg-neon-green',
  },
]

export default function Bootcamp() {
  return (
    <section id="bootcamp" className="py-20 md:py-28 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="section-label">Mandatory Training Module</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold text-white glow-text mt-6 mb-4 tracking-wide"
        >
          Robotics Bootcamp
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center font-space text-text-secondary text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-16"
        >
          A 4-day intensive hands-on program at KIC Campus labs — designed for beginners, built for champions.
        </motion.p>

        {/* Day Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {days.map((day, i) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="cyber-card p-6 rounded-sm group"
            >
              {/* Day number */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-orbitron text-[10px] tracking-[0.2em] text-text-dim">
                  DAY
                </span>
                <span className={`font-orbitron text-2xl font-bold ${day.dayColor} glow-text`}>
                  {day.day}
                </span>
              </div>

              {/* Icon */}
              <div className={`p-3 rounded-sm bg-cyber-dark border border-cyber-border ${day.iconColor} inline-flex mb-4 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-shadow duration-300`}>
                <day.icon size={22} />
              </div>

              {/* Title */}
              <h3 className="font-orbitron text-sm font-semibold text-text-primary mb-4">
                {day.title}
              </h3>

              {/* Topics */}
              <ul className="space-y-2">
                {day.topics.map((topic) => (
                  <li key={topic} className="flex items-start gap-2">
                    <span className={`w-1 h-1 mt-1.5 rounded-full ${day.dotColor} flex-shrink-0`} />
                    <span className="font-space text-xs text-text-secondary leading-relaxed">
                      {topic}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Location note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
        >
          <div className="flex items-center gap-2 text-text-secondary">
            <MapPin size={14} className="text-neon-cyan" />
            <span className="font-space text-sm">NIBM KIC Campus</span>
          </div>
          <div className="hidden sm:block w-[1px] h-4 bg-cyber-border" />
          <div className="flex items-center gap-2 text-text-secondary">
            <Calendar size={14} className="text-neon-amber" />
            <span className="font-space text-sm">July to August 2026</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
