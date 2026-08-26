import { motion } from 'framer-motion'

const days = [
  {
    day: '01',
    title: 'Electronics & Arduino fundamentals',
    topics: [
      'Electronics fundamentals',
      'Arduino fundamentals',
    ],
  },
  {
    day: '02',
    title: 'To be announced',
    tba: true,
  },
  {
    day: '03',
    title: 'To be announced',
    tba: true,
  },
  {
    day: '04',
    title: 'To be announced',
    tba: true,
  },
]

export default function Bootcamp() {
  return (
    <section id="bootcamp" className="relative px-5 sm:px-8 lg:px-12 xl:px-16 py-24 lg:py-32 overflow-hidden">
      {/* A little warmth bleeding in from the right margin */}
      <div className="absolute inset-y-0 right-0 w-[45%] bleed-warm-soft pointer-events-none" />

      <div className="relative mx-auto max-w-[1800px]">
        <div className="grid lg:grid-cols-12 gap-x-10 gap-y-8 items-end">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className="eyebrow"
            >
              04 &mdash; Training
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.08 }}
              className="display mt-6 text-[11vw] sm:text-[8vw] lg:text-[4.4vw] max-w-[13ch]"
            >
              Four days that build an engineer
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.16 }}
            className="lg:col-span-5 max-w-[46ch] lg:pb-3 text-[15px] sm:text-base leading-relaxed text-ink-soft"
          >
            Attendance is mandatory, and it is the reason no experience is needed. Every team
            arrives at the KIC labs knowing nothing and leaves with a robot that drives itself.
          </motion.p>
        </div>

        {/* Day board */}
        <div className="mt-14 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0">
          {days.map((day, i) => (
            <motion.article
              key={day.day}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative border-t pt-7 pb-2 lg:px-7 lg:first:pl-0 lg:last:pr-0 lg:border-r lg:border-r-rule lg:last:border-r-0 ${
                day.tba ? 'border-rule' : 'border-ink'
              }`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span
                  className={`font-display font-black text-[86px] lg:text-[104px] leading-[0.75] tracking-[-0.07em] text-transparent transition-colors duration-500 ${
                    day.tba ? '' : 'group-hover:text-flare'
                  }`}
                  style={{
                    WebkitTextStroke: day.tba
                      ? '1.5px var(--color-ink-faint)'
                      : '1.5px var(--color-ink)',
                  }}
                >
                  {day.day}
                </span>
                <span className="eyebrow-bare text-ink-faint">Day</span>
              </div>

              <h3
                className={`mt-8 font-display font-semibold text-lg lg:text-xl tracking-[-0.03em] max-w-[16ch] ${
                  day.tba ? 'text-ink-faint' : ''
                }`}
              >
                {day.title}
              </h3>

              {day.tba ? (
                <p className="mt-5 text-[13.5px] leading-snug text-ink-faint max-w-[22ch]">
                  Curriculum for this day will be announced closer to the bootcamp.
                </p>
              ) : (
                <ul className="mt-5 space-y-2.5">
                  {day.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-3 text-[13.5px] leading-snug text-ink-soft">
                      <span className="mt-[7px] w-2.5 h-px bg-ink-faint shrink-0" />
                      {topic}
                    </li>
                  ))}
                </ul>
              )}
            </motion.article>
          ))}
        </div>

        {/* Logistics */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 lg:mt-20 border-t border-rule pt-7 grid sm:grid-cols-3 gap-8"
        >
          {[
            { k: 'Venue', v: 'NIBM KIC Campus labs' },
            { k: 'Window', v: 'September 2026' },
            { k: 'Cost to schools', v: 'None — fully sponsored' },
          ].map((item) => (
            <div key={item.k}>
              <p className="eyebrow-bare text-ink-faint">{item.k}</p>
              <p className="mt-2.5 font-display font-semibold text-base sm:text-lg tracking-[-0.02em]">{item.v}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
