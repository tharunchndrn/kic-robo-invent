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
      <div className="px-5 sm:px-8 lg:px-12 xl:px-16 py-24 lg:py-32">
        <div className="mx-auto max-w-[1800px]">
          {/* Header */}
          <div className="grid lg:grid-cols-12 gap-x-10 gap-y-8 items-end">
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
                className="display mt-6 text-[11vw] sm:text-[8vw] lg:text-[4.2vw] max-w-[13ch]"
              >
                Smart city obstacle course
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.16 }}
              className="lg:col-span-5 max-w-[520px] lg:ml-auto text-[15px] sm:text-base leading-relaxed text-ink-soft"
            >
              Every team designs, builds and programs one autonomous vehicle, then sends it
              through a miniature city modelled on Kandy&apos;s street grid. The run is timed.
              The robot is alone out there.
            </motion.p>
          </div>

          {/* Missions (left) + course diagram (right) — a real side panel,
              not a full-width block, so the diagram reads as a reference
              rather than a centrepiece. */}
          <div className="mt-14 lg:mt-20 grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* Mission briefs */}
            <div className="flex flex-col gap-10 lg:gap-12">
              {missions.map((mission, i) => (
                <motion.article
                  key={mission.title}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="border-t border-ink pt-5"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-display font-semibold tnum text-[38px] leading-[0.8] tracking-[-0.05em] text-flare">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="eyebrow-bare text-ink-mute text-right">{mission.spec}</span>
                  </div>

                  <h3 className="mt-5 font-display font-semibold text-lg sm:text-xl tracking-[-0.03em]">
                    {mission.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-ink-soft max-w-[42ch]">
                    {mission.desc}
                  </p>
                </motion.article>
              ))}

              {/* The rule that defines the whole event */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: 0.2 }}
                className="mt-2 border-t border-b border-rule py-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6"
              >
                <span className="eyebrow-bare text-flare shrink-0">Rule 01</span>
                <p className="font-display font-semibold text-lg sm:text-xl tracking-[-0.03em]">
                  Autonomous navigation only. No remote control, at any point in the run.
                </p>
              </motion.div>
            </div>

            {/* Course diagram — sticky, compact, a companion piece */}
            <motion.figure
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:sticky lg:top-28 max-w-[520px] mx-auto lg:mr-0 w-full"
            >
              <SmartCityTrack />
              <figcaption className="mt-3 text-center lg:text-left text-[13px] leading-relaxed text-ink-mute">
                Example run &mdash; the finished course varies year to year, but every layout
                tests all three missions at least once.
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </div>
    </section>
  )
}
