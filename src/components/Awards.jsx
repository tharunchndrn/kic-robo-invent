import { motion } from 'framer-motion'
import { Trophy, Medal, Lightbulb, Presentation } from 'lucide-react'

const awards = [
  {
    icon: Trophy,
    title: 'Champion',
    desc: 'Grand champion of Robo-Invent 2026',
    gradient: 'from-yellow-500/20 to-amber-600/5',
    borderColor: 'border-amber-500/30',
    iconColor: 'text-amber-400',
    glowColor: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]',
    rank: '1ST',
  },
  {
    icon: Medal,
    title: 'Runner-Up',
    desc: 'Second place in overall competition',
    gradient: 'from-gray-400/15 to-gray-500/5',
    borderColor: 'border-gray-400/30',
    iconColor: 'text-gray-300',
    glowColor: 'hover:shadow-[0_0_30px_rgba(156,163,175,0.15)]',
    rank: '2ND',
  },
  {
    icon: Lightbulb,
    title: 'Most Innovative Robot',
    desc: 'Best creative and technical design approach',
    gradient: 'from-neon-cyan/10 to-neon-blue/5',
    borderColor: 'border-neon-cyan/30',
    iconColor: 'text-neon-cyan',
    glowColor: 'hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]',
    rank: 'SPECIAL',
  },
  {
    icon: Presentation,
    title: 'Best Team Presentation',
    desc: 'Outstanding team presentation and strategy',
    gradient: 'from-neon-purple/10 to-neon-blue/5',
    borderColor: 'border-neon-purple/30',
    iconColor: 'text-neon-purple',
    glowColor: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]',
    rank: 'SPECIAL',
  },
]

export default function Awards() {
  return (
    <section id="awards" className="py-20 md:py-28 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="section-label">Recognition Protocols</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mt-6 mb-16 tracking-wide"
        >
          Awards & Honours
        </motion.h2>

        {/* Award Cards */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className={`relative overflow-hidden rounded-sm border ${award.borderColor} bg-gradient-to-br ${award.gradient} p-8 transition-all duration-500 ${award.glowColor} group`}
            >
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/[0.02] to-transparent rounded-bl-full" />

              {/* Rank badge */}
              <div className="absolute top-4 right-4">
                <span className={`font-orbitron text-[10px] tracking-[0.2em] ${award.iconColor} opacity-50`}>
                  {award.rank}
                </span>
              </div>

              <div className={`inline-flex p-4 rounded-sm bg-cyber-dark/50 border border-cyber-border/50 ${award.iconColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <award.icon size={32} />
              </div>

              <h3 className="font-orbitron text-xl md:text-2xl font-bold text-text-primary mb-2">
                {award.title}
              </h3>
              <p className="font-space text-sm text-text-secondary">
                {award.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
