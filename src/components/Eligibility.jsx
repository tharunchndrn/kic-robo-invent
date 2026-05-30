import { motion } from 'framer-motion'
import { Target, Users, UserCheck, ShieldCheck } from 'lucide-react'

const requirements = [
  {
    icon: Target,
    title: 'Target Group',
    value: 'O/L Students',
    desc: 'Open to all O/L level students in the Kandy District',
    iconColor: 'text-neon-cyan',
    valueColor: 'text-neon-cyan',
  },
  {
    icon: Users,
    title: 'Team Limit',
    value: 'Max 2 Teams per School',
    desc: 'Each school can register up to 2 competing teams',
    iconColor: 'text-neon-blue',
    valueColor: 'text-neon-blue',
  },
  {
    icon: UserCheck,
    title: 'Team Size',
    value: 'Max 3 Students',
    desc: 'Each team consists of a maximum of 3 students',
    iconColor: 'text-neon-amber',
    valueColor: 'text-neon-amber',
  },
  {
    icon: ShieldCheck,
    title: 'Supervision',
    value: 'Staff Advisor',
    desc: 'A teacher or school coordinator must accompany each team',
    iconColor: 'text-neon-green',
    valueColor: 'text-neon-green',
  },
]

export default function Eligibility() {
  return (
    <section id="eligibility" className="py-20 md:py-28 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="section-label">Clearance Requirements</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mt-6 mb-16 tracking-wide"
        >
          Requirements
        </motion.h2>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {requirements.map((req, i) => (
            <motion.div
              key={req.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="cyber-card p-6 rounded-sm text-center group"
            >
              <div className={`inline-flex p-4 rounded-sm bg-cyber-dark border border-cyber-border ${req.iconColor} mb-4 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.1)] transition-shadow duration-300`}>
                <req.icon size={28} />
              </div>

              <p className="font-orbitron text-[10px] tracking-[0.2em] text-text-dim uppercase mb-2">
                {req.title}
              </p>
              <h3 className={`font-orbitron text-sm md:text-base font-semibold ${req.valueColor} mb-2`}>
                {req.value}
              </h3>
              <p className="font-space text-xs text-text-secondary leading-relaxed">
                {req.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
