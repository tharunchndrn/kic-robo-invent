import { motion } from 'framer-motion'
import { Timer, Code, Lightbulb, Presentation } from 'lucide-react'

const criteria = [
  {
    icon: Timer,
    title: 'Task Execution Speed',
    weight: '30%',
    iconColor: 'text-neon-cyan',
    valueColor: 'text-neon-cyan',
    barColor: 'bg-neon-cyan',
    widthPercent: '30%',
  },
  {
    icon: Code,
    title: 'Code Cleanliness & Logic',
    weight: '25%',
    iconColor: 'text-neon-blue',
    valueColor: 'text-neon-blue',
    barColor: 'bg-neon-blue',
    widthPercent: '25%',
  },
  {
    icon: Lightbulb,
    title: 'Structural Innovation',
    weight: '25%',
    iconColor: 'text-neon-amber',
    valueColor: 'text-neon-amber',
    barColor: 'bg-neon-amber',
    widthPercent: '25%',
  },
  {
    icon: Presentation,
    title: 'Team Presentation',
    weight: '20%',
    iconColor: 'text-neon-green',
    valueColor: 'text-neon-green',
    barColor: 'bg-neon-green',
    widthPercent: '20%',
  },
]

export default function Judging() {
  return (
    <section id="judging" className="py-20 md:py-28 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="section-label">Evaluation Parameters</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mt-6 mb-16 tracking-wide"
        >
          Judging Criteria
        </motion.h2>

        {/* Criteria Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {criteria.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className="cyber-card p-6 rounded-sm text-center group"
            >
              <div className={`inline-flex p-3 rounded-sm bg-cyber-dark border border-cyber-border ${item.iconColor} mb-4 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.1)] transition-shadow duration-300`}>
                <item.icon size={24} />
              </div>

              <h3 className="font-orbitron text-sm font-semibold text-text-primary mb-3">
                {item.title}
              </h3>

              <p className={`font-orbitron text-3xl font-bold ${item.valueColor} glow-text mb-4`}>
                {item.weight}
              </p>

              {/* Progress bar */}
              <div className="h-1 bg-cyber-dark rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: item.widthPercent }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.5, duration: 1.2, ease: 'easeOut' }}
                  className={`h-full ${item.barColor} rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
