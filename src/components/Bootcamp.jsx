import { motion } from 'framer-motion'
import RecapReels from './RecapReels'

const days = [
  {
    day: '01',
    date: '11 Sep 2026',
    status: 'done',
    title: 'Electronics & Arduino fundamentals',
    topics: [
      'Robotics fundamentals',
      'Sensors and how they read the world',
      'The Arduino Uno board',
      'Voltage, current and resistance',
    ],
  },
  {
    day: '02',
    date: '17 Sep 2026',
    status: 'done',
    title: 'Motors & Speed & Direction',
    topics: [
      'Motor controller fundamentals',
      'Controlling motor speed and direction',
      'Motor control in robotics',
    ],
  },
  {
    day: '03',
    date: '24 Sep 2026',
    status: 'next',
    title: 'Sensors and motors working together',
    topics: [
      'Wiring sensors and motors into one circuit',
      'Making the robot act on what it senses',
      'A hands-on mini project',
    ],
    note: 'Progress meeting the same morning',
  },
  {
    day: '04',
    status: 'tba',
    title: 'To be announced',
  },
]

// The progress meeting shares Day 03's morning, but it is a review of what the
// teams have already built rather than a teaching day — so it sits below the
// four-day board instead of becoming a fifth column on it.
const meeting = [
  'A check on how far your robot has got',
  'Help fixing whatever is not working yet',
]

// Each day's state gets its own rule weight, numeral stroke and tag, so the
// board can be read at a glance: what is behind us, what is next, what is not
// written yet.
const stateStyles = {
  done: {
    border: 'border-ink',
    stroke: '1.5px var(--color-ink)',
    tag: 'Completed',
    tagClass: 'border-moss/45 text-moss',
    dot: 'bg-moss',
    hoverText: 'group-hover:text-ink',
  },
  next: {
    border: 'border-flare',
    stroke: '1.5px var(--color-flare)',
    tag: 'Up next',
    tagClass: 'border-flare/50 text-flare',
    dot: 'bg-flare',
    hoverText: 'group-hover:text-flare',
  },
  tba: {
    border: 'border-rule',
    stroke: '1.5px var(--color-ink-faint)',
    hoverText: '',
  },
}

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
            The first two days are already behind us.
          </motion.p>
        </div>

        {/* Day board */}
        <div className="mt-14 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 lg:gap-y-0">
          {days.map((day, i) => {
            const s = stateStyles[day.status]
            const tba = day.status === 'tba'

            return (
              <motion.article
                key={day.day}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative border-t pt-7 pb-2 lg:px-7 lg:first:pl-0 lg:last:pr-0 lg:border-r lg:border-r-rule lg:last:border-r-0 ${s.border}`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span
                    className={`font-display font-black text-[86px] lg:text-[104px] leading-[0.75] tracking-[-0.07em] text-transparent transition-colors duration-500 ${s.hoverText}`}
                    style={{ WebkitTextStroke: s.stroke }}
                  >
                    {day.day}
                  </span>
                  <span className="eyebrow-bare text-ink-faint">Day</span>
                </div>

                {/* Status line — date on the left, standing of the day on the right */}
                <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 min-h-[26px]">
                  {day.date && <span className="eyebrow-bare tnum text-ink-mute">{day.date}</span>}
                  {s.tag && (
                    <span
                      className={`inline-flex items-center gap-2 border rounded-full pl-2.5 pr-3 py-1 eyebrow-bare ${s.tagClass}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                      {s.tag}
                    </span>
                  )}
                </div>

                <h3
                  className={`mt-4 font-display font-semibold text-lg lg:text-xl tracking-[-0.03em] max-w-[16ch] ${tba ? 'text-ink-faint' : ''
                    }`}
                >
                  {day.title}
                </h3>

                {tba || !day.topics ? (
                  <p className="mt-5 text-[13.5px] leading-snug text-ink-faint max-w-[22ch]">
                    Curriculum for this day will be announced closer to the bootcamp.
                  </p>
                ) : (
                  <>
                    <ul className="mt-5 space-y-2.5">
                      {day.topics.map((topic) => (
                        <li
                          key={topic}
                          className="flex items-start gap-3 text-[13.5px] leading-snug text-ink-soft"
                        >
                          <span className="mt-[7px] w-2.5 h-px bg-ink-faint shrink-0" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                    {day.note && (
                      <p className="mt-5 eyebrow-bare text-ink-mute">{day.note}</p>
                    )}
                  </>
                )}
              </motion.article>
            )
          })}
        </div>

        {/* Progress meeting — same morning as Day 03 */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-16 lg:mt-20 rounded-panel bg-card border border-rule overflow-hidden"
        >
          <span className="absolute inset-y-0 left-0 w-[3px] bg-flare" aria-hidden />

          <div className="grid lg:grid-cols-12 gap-x-10 gap-y-7 px-6 sm:px-9 lg:px-10 py-7 sm:py-9">
            <div className="lg:col-span-4">
              <span className="inline-flex items-center gap-2 border border-flare/50 rounded-full pl-2.5 pr-3 py-1 eyebrow-bare text-flare">
                <span className="w-1.5 h-1.5 rounded-full bg-flare" />
                Same morning as Day 03
              </span>

              <h3 className="mt-5 font-display font-semibold text-xl lg:text-2xl tracking-[-0.03em] max-w-[16ch]">
                Team progress meeting
              </h3>

              <p className="mt-3 eyebrow-bare tnum text-ink-mute">24 Sep 2026 &middot; 8.00 am</p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <p className="max-w-[56ch] text-[14.5px] sm:text-[15px] leading-relaxed text-ink-soft">
                The technical team sits down with each team to look at the robot you have built so
                far. Bring it in whatever state it is in &mdash; half-built and not yet working is
                exactly what this session is for.
              </p>

              <ul className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                {meeting.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[13.5px] leading-snug text-ink-soft"
                  >
                    <span className="mt-[7px] w-2.5 h-px bg-ink-faint shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-6 eyebrow-bare text-ink-mute">Every competing student must attend</p>
            </div>
          </div>
        </motion.div>

        {/* Logistics */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          className="mt-16 lg:mt-20 border-t border-rule pt-7 grid sm:grid-cols-3 gap-8"
        >
          {[
            {
              k: 'Venue',
              v: 'Kandy Innovation Centre, NIBM',
              sub: 'Near the Peradeniya Police Station',
            },
            { k: 'Window', v: 'September 2026', sub: 'Sessions start 8.00 am' },
            { k: 'Cost to schools', v: 'None — fully sponsored' },
          ].map((item) => (
            <div key={item.k}>
              <p className="eyebrow-bare text-ink-faint">{item.k}</p>
              <p className="mt-2.5 font-display font-semibold text-base sm:text-lg tracking-[-0.02em]">
                {item.v}
              </p>
              {item.sub && <p className="mt-1.5 text-[13px] text-ink-mute">{item.sub}</p>}
            </div>
          ))}
        </motion.div>

        <RecapReels />
      </div>
    </section>
  )
}
