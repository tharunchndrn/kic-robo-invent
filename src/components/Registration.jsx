import { motion } from 'framer-motion'
import { ExternalLink, FileDown, Users, CheckCircle } from 'lucide-react'

export default function Registration() {
  return (
    <section id="register" className="py-20 md:py-28 px-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="section-label">Open Channel</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mt-6 mb-6 tracking-wide"
        >
          Register Your School Now
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center font-space text-text-secondary text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-12"
        >
          Each school can register up to 2 teams. Each team can include up to 3 students.
          A teacher or school coordinator must accompany each registered team.
        </motion.p>

        {/* CTA Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="cyber-card p-8 md:p-10 rounded-sm"
        >
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Registration Link */}
            <a
              href="https://forms.gle/veywtaSV25KpvPPZ6"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-btn flex items-center justify-center gap-3 px-6 py-4 bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan font-orbitron text-xs tracking-widest hover:bg-neon-cyan/20 transition-all duration-300 rounded-sm"
            >
              <ExternalLink size={16} />
              REGISTER YOUR SCHOOL
            </a>

            {/* Download Rulebook */}
            <a
              href="#"
              /* TODO: Replace '#' with actual PDF download link */
              className="flex items-center justify-center gap-3 px-6 py-4 border border-cyber-border text-text-secondary font-orbitron text-xs tracking-widest hover:border-text-dim hover:text-text-primary transition-all duration-300 rounded-sm"
            >
              <FileDown size={16} />
              <div className="text-center">
                <span className="block">DOWNLOAD RULEBOOK</span>
                <span className="block text-[8px] text-text-dim mt-0.5 tracking-wider">PDF COMING SOON</span>
              </div>
            </a>
          </div>

          {/* Slots Panel */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 border-t border-cyber-border">
            <div className="flex items-center gap-3">
              <Users size={16} className="text-neon-cyan" />
              <div>
                <p className="font-orbitron text-[10px] tracking-[0.2em] text-text-dim">SCHOOL SLOTS REMAINING</p>
                <p className="font-orbitron text-lg font-bold text-text-primary">
                  <span className="text-neon-cyan">40</span>
                  <span className="text-text-dim mx-1">/</span>
                  <span>40</span>
                </p>
              </div>
            </div>
            <div className="hidden sm:block w-[1px] h-8 bg-cyber-border" />
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-neon-green" />
              <span className="font-orbitron text-xs tracking-[0.15em] text-neon-green">
                STATUS: AVAILABLE
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
