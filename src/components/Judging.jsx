import { motion } from 'framer-motion'

/* Ordered by weight — the chart should say what matters most, first. */
const criteria = [
  {
    title: 'Structural & strategic innovation',
    weight: 35,
    desc: 'Chassis design, sensor placement, and the reasoning behind the route strategy.',
  },
  {
    title: 'Code cleanliness & logic',
    weight: 30,
    desc: 'Readable, structured control loops that a judge can follow line by line.',
  },
  {
    title: 'Task execution speed',
    weight: 20,
    desc: 'Total time on course, with penalties for line breaks and missed signals.',
  },
  {
    title: 'Team presentation',
    weight: 15,
    desc: 'How clearly the team explains what they built and why they built it that way.',
  },
]

export default function Judging() {
  return (
    <section id="judging" className="relative px-5 sm:px-8 lg:px-12 xl:px-16 py-24 lg:py-32">
      <div className="mx-auto max-w-[1800px]">
        <div className="grid lg:grid-cols-12 gap-x-10 gap-y-8 items-end">
          <div className="lg:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className="eyebrow"
            >
              06 &mdash; Scoring
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.08 }}
              className="display mt-6 text-[11vw] sm:text-[8vw] lg:text-[4.2vw] max-w-[11ch]"
            >
              How the marks fall
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.16 }}
            className="lg:col-span-5 lg:col-start-8 max-w-[44ch] lg:pb-3 text-[15px] sm:text-base leading-relaxed text-ink-soft"
          >
            Speed is worth a fifth of the score. The other four fifths go to how the robot was
            thought through &mdash; which is the point of the whole exercise.
          </motion.p>
        </div>

        {/* Weighting chart */}
        <div className="mt-14 lg:mt-20">
          <div className="flex items-end justify-between border-b border-ink pb-3">
            <span className="eyebrow-bare text-ink-mute">Criterion</span>
            <span className="eyebrow-bare text-ink-mute">Weight</span>
          </div>

          {criteria.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.09, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group border-b border-rule py-7 sm:py-8"
            >
              <div className="flex items-baseline justify-between gap-6">
                <h3 className="font-display font-semibold text-xl sm:text-2xl lg:text-[28px] tracking-[-0.035em] max-w-[22ch]">
                  {item.title}
                </h3>
                <p
                  className={`font-display font-semibold tnum text-[40px] sm:text-[52px] leading-[0.8] tracking-[-0.06em] shrink-0 ${
                    i === 0 ? 'text-flare' : 'text-ink'
                  }`}
                >
                  {item.weight}
                  <span className="text-[0.5em] align-top ml-0.5">%</span>
                </p>
              </div>

              <div className="mt-6 h-1.5 w-full bg-rule-soft rounded-full overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: i * 0.09 + 0.25, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ width: `${item.weight}%`, originX: 0 }}
                  className={`h-full rounded-full origin-left ${i === 0 ? 'bg-flare' : 'bg-ink'}`}
                />
              </div>

              <p className="mt-4 text-[13.5px] leading-relaxed text-ink-mute max-w-[56ch]">
                {item.desc}
              </p>
            </motion.div>
          ))}

          <div className="flex items-baseline justify-between pt-5">
            <span className="eyebrow-bare text-ink-mute">Total</span>
            <span className="font-display font-semibold tnum text-xl tracking-[-0.03em]">100%</span>
          </div>
        </div>
      </div>
    </section>
  )
}
