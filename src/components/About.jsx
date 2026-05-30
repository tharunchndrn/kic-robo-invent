import { motion } from 'framer-motion'
import { School, Users, GraduationCap, Calendar } from 'lucide-react'

const stats = [
  { icon: School, value: '30+', label: 'Schools', colorClass: 'text-neon-cyan' },
  { icon: Users, value: '40+', label: 'Teams', colorClass: 'text-neon-blue' },
  { icon: GraduationCap, value: '120+', label: 'Students', colorClass: 'text-neon-amber' },
  { icon: Calendar, value: '4 Day', label: 'Bootcamp', colorClass: 'text-neon-green' },
]

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="section-label">Initiation Protocol</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold text-white glow-text mt-6 mb-6 tracking-wide"
        >
          Engineering the Next Generation
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center font-space text-text-secondary text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-16"
        >
          Robo-Invent 2026 is an inter-school robotics championship designed to promote STEM education,
          automation, logic design, and innovation among O/L students in the Kandy District.
        </motion.p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="cyber-card p-6 md:p-8 rounded-sm text-center group"
            >
              <div className={`inline-flex p-3 rounded-sm bg-cyber-dark border border-cyber-border mb-4 ${stat.colorClass} group-hover:shadow-lg transition-shadow duration-300`}>
                <stat.icon size={24} />
              </div>
              <motion.p
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3, type: 'spring' }}
                className={`font-orbitron text-3xl md:text-4xl font-bold ${stat.colorClass} glow-text`}
              >
                {stat.value}
              </motion.p>
              <p className="mt-2 font-orbitron text-[10px] tracking-[0.2em] text-text-dim uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
