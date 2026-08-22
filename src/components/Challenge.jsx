import { motion } from 'framer-motion'
import SmartCityTrack from './SmartCityTrack'

const missions = [
  {
    title: 'Precision line tracking',
    spec: 'Dual-channel IR array',
    desc: 'Hold the racing line through compound curves, ninety-degree grid junctions and marked speed-limit zones without drifting off.',
  },
  {
    title: 'Traffic signal response',
    spec: 'Digital signal input',
    desc: 'Read live signals at autonomous city crossings, then decelerate, stop fully, and pull away again when the crossing clears.',
  },
  {
    title: 'Obstacle avoidance',
    spec: 'Ultrasonic sonar, 4 m',
    desc: 'Detect static and moving barriers ahead, plan a bypass in real time, and rejoin the line on the far side of it.',
  },
]

export default function Challenge() {
  return (
    <section id="challenge" className="relative bg-paper-deep border-y border-rule">
      <div className="px-5 sm:px-8 lg:px-12 xl:px-16 py-10 lg:py-12">
        <div className="mx-auto max-w-[1800px]">
          {/* Header */}
          <div className="grid lg:grid-cols-12 gap-x-10 gap-y-4 items-end">
            <div className="lg:col-span-7">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                className="eyebrow"
              >
                02 &mdash; The challenge
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: 0.08 }}
                className="display mt-4 text-[11vw] sm:text-[8vw] lg:text-[4.2vw] max-w-[17ch]"
              >
                Smart city obstacle course
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.16 }}
              className="lg:col-span-5 max-w-[520px] lg:ml-auto text-[14px] sm:text-[15px] leading-snug text-ink-soft"
            >
              Every team designs, builds and programs one autonomous vehicle, then sends it
              through a miniature city modelled on Kandy&apos;s street grid. The run is timed.
              The robot is alone out there.
            </motion.p>
          </div>

          {/* Missions (left) + course diagram (right) — a real side panel,
              not a full-width block, so the diagram reads as a reference
              rather than a centrepiece. */}
          <div className="mt-6 lg:mt-8 grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Mission briefs */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              {missions.map((mission, i) => (
                <motion.article
                  key={mission.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="border-t border-ink pt-3.5"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-display font-semibold tnum text-[27px] leading-[0.8] tracking-[-0.04em] text-flare">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="eyebrow-bare text-ink-mute text-right text-[10.5px]">{mission.spec}</span>
                  </div>

                  <h3 className="mt-3 font-display font-semibold text-[18px] leading-tight tracking-[-0.02em]">
                    {mission.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-snug text-ink-soft max-w-[55ch]">
                    {mission.desc}
                  </p>
                </motion.article>
              ))}
            </div>

            {/* Course diagram — compact companion piece */}
            <motion.figure
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 max-w-[520px] mx-auto lg:mr-0 w-full"
            >
              <SmartCityTrack />
            </motion.figure>
          </div>

          {/* The rule that defines the whole event */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.2 }}
            className="mt-6 lg:mt-7 border-t border-b border-rule py-3.5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
          >
            <span className="eyebrow-bare text-flare shrink-0">Rule 01</span>
            <p className="font-display font-semibold text-[15px] sm:text-base tracking-[-0.02em]">
              Autonomous navigation only. No remote control, at any point in the run.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
