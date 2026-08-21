import { motion } from 'framer-motion'
import { Crosshair, TrafficCone, ShieldAlert, Navigation } from 'lucide-react'
import SmartCityTrack from './SmartCityTrack'

const missions = [
  {
    icon: Crosshair,
    title: 'Precision Line Tracking',
    desc: 'Program dual-channel infrared arrays to negotiate complex curves, 90-degree grid intersections, and dynamic speed limit zones with high precision.',
    iconClass: 'text-neon-cyan',
  },
  {
    icon: TrafficCone,
    title: 'Traffic Signal Response',
    desc: 'Process real-time digital signals at autonomous city crossings, implementing automated deceleration, full stopping, and coordinated safe crossing.',
    iconClass: 'text-neon-amber',
  },
  {
    icon: ShieldAlert,
    title: 'Obstacle Avoidance',
    desc: 'Utilize ultrasonic sonar sensors to detect static and dynamic barriers, planning and executing smooth real-time trajectory bypass maneuvers.',
    iconClass: 'text-neon-red',
  },
]

export default function Challenge() {
  return (
    <section id="challenge" className="py-20 md:py-28 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="section-label">Mission Briefing</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold text-white glow-text mt-6 mb-6 tracking-wide"
        >
          Smart City Obstacle Course
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center font-space text-text-secondary text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-16"
        >
          Teams must design, build, and program an autonomous robotic vehicle capable of navigating
          a miniature smart city inspired by Kandy&apos;s urban layout.
        </motion.p>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* Mission Cards */}
          <div className="flex flex-col justify-between h-full gap-4 lg:gap-0">
            {missions.map((mission, i) => (
              <motion.div
                key={mission.title}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="cyber-card p-6 rounded-sm group cursor-default"
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 p-3 rounded-sm bg-cyber-dark border border-cyber-border ${mission.iconClass} group-hover:shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-shadow duration-300`}>
                    <mission.icon size={22} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-orbitron text-[9px] tracking-[0.2em] text-text-dim">
                        MISSION_0{i + 1}
                      </span>
                    </div>
                    <h3 className="font-orbitron text-lg font-semibold text-text-primary mb-2">
                      {mission.title}
                    </h3>
                    <p className="font-space text-text-secondary text-xs sm:text-sm leading-relaxed">
                      {mission.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Navigation indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 px-4 py-3.5 border border-cyber-border/50 rounded-sm"
            >
              <Navigation size={14} className="text-neon-green" />
              <span className="font-orbitron text-[9px] tracking-[0.2em] text-text-dim">
                AUTONOMOUS NAVIGATION REQUIRED — NO REMOTE 
              </span>
            </motion.div>
          </div>

          {/* Smart City Track */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-full flex flex-col justify-center"
          >
            <SmartCityTrack />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
