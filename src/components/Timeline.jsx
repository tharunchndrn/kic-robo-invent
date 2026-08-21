import { motion } from 'framer-motion'

const phases = [
  {
    phase: '01',
    time: 'June, week 1',
    title: 'Invitations go out',
    desc: 'Official invitations reach schools across the district and the registration portal opens.',
  },
  {
    phase: '02',
    time: 'July, week 1',
    title: 'Entries close, handbook lands',
    desc: 'Team slots are confirmed, and the competition handbook with full challenge specifications is released.',
  },
  {
    phase: '03',
    time: 'July — August',
    title: 'Robotics bootcamp',
    desc: 'The mandatory four-day training programme runs at the KIC Campus labs, in rotating cohorts.',
  },
  {
    phase: '04',
    time: 'September 2026',
    title: 'Grand finale at KIC NIBM',
    desc: 'Time trials, pit lanes, panel evaluation and the award ceremony — all in one day.',
    note: 'Exact date to be announced',
  },
]

export default function Timeline() {
  return (
    <section id="timeline" className="relative bg-paper-deep border-y border-rule">
      <div className="px-5 sm:px-8 lg:px-12 xl:px-16 py-24 lg:py-32">
        <div className="mx-auto max-w-[1800px]">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-14">
            {/* Sticky header holds the left column while the rail scrolls past */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  className="eyebrow"
                >
                  05 &mdash; Timeline
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: 0.08 }}
                  className="display mt-6 text-[11vw] sm:text-[8vw] lg:text-[3.6vw] max-w-[11ch]"
                >
                  From invitation to finish line
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: 0.16 }}
                  className="mt-7 max-w-[34ch] text-[15px] leading-relaxed text-ink-soft"
                >
                  Four phases across four months. Schools that register in June have the full
                  runway; slots close for good in July.
                </motion.p>
              </div>
            </div>

            {/* Rail */}
            <ol className="relative lg:col-span-7 lg:col-start-6 lg:pt-2">
              <span className="absolute top-2 bottom-2 left-0 sm:left-[190px] w-px bg-rule" aria-hidden />
              <motion.span
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ originY: 0 }}
                className="absolute top-2 bottom-2 left-0 sm:left-[190px] w-px bg-flare origin-top"
                aria-hidden
              />

              {phases.map((phase, i) => (
                <motion.li
                  key={phase.phase}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-70px' }}
                  transition={{ delay: i * 0.12, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col sm:flex-row pl-9 sm:pl-0 pb-14 last:pb-0"
                >
                  <span
                    className="absolute left-0 sm:left-[190px] top-1.5 -translate-x-1/2 w-3 h-3 rounded-full bg-ink ring-4 ring-paper-deep"
                    aria-hidden
                  />

                  <div className="sm:w-[190px] sm:shrink-0 sm:text-right sm:pr-11">
                    <p className="eyebrow-bare text-flare">Phase {phase.phase}</p>
                    <p className="mt-2.5 font-display font-semibold text-[17px] tracking-[-0.02em] text-ink-soft">
                      {phase.time}
                    </p>
                  </div>

                  <div className="mt-4 sm:mt-0 sm:pl-11 max-w-[46ch]">
                    <h3 className="display text-[26px] sm:text-[30px] lg:text-[34px]">{phase.title}</h3>
                    <p className="mt-4 text-[14.5px] sm:text-[15px] leading-relaxed text-ink-soft">
                      {phase.desc}
                    </p>
                    {phase.note && (
                      <p className="mt-5 inline-flex items-center gap-2.5 border border-flare/45 rounded-full pl-3 pr-4 py-1.5 font-mono text-[10px] tracking-[0.16em] uppercase text-flare">
                        <span className="w-1.5 h-1.5 rounded-full bg-flare" />
                        {phase.note}
                      </p>
                    )}
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
