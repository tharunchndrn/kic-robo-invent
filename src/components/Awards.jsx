import { motion } from 'framer-motion'

/* Hairline marks drawn to match the schematic language elsewhere on the page. */
const Mark = {
  trophy: (
    <>
      <path d="M14 8h20v12a10 10 0 0 1-20 0V8Z" />
      <path d="M14 11H8a6 6 0 0 0 6 6M34 11h6a6 6 0 0 1-6 6" />
      <path d="M24 30v6M17 40h14M20 36h8l3 4H17l3-4Z" />
    </>
  ),
  medal: (
    <>
      <circle cx="24" cy="29" r="11" />
      <circle cx="24" cy="29" r="4.5" />
      <path d="M17 19 12 7h8l4 8M31 19 36 7h-8" />
    </>
  ),
  bulb: (
    <>
      <path d="M24 6a12 12 0 0 1 7 21.8V32H17v-4.2A12 12 0 0 1 24 6Z" />
      <path d="M18 36h12M20 41h8" />
      <path d="M24 18v8" />
    </>
  ),
  speak: (
    <>
      <rect x="7" y="10" width="34" height="22" rx="4" />
      <path d="M16 32v6l8-6" />
      <path d="M14 18h20M14 24h12" />
    </>
  ),
}

function AwardMark({ name }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-12 h-12 sm:w-14 sm:h-14"
      aria-hidden
    >
      {Mark[name]}
    </svg>
  )
}

/* Every card is fully coloured, but the champion's blue is kept the most
   saturated of the four so it still reads as the lead result — the others
   are pitched a shade quieter rather than competing at equal intensity. */
const GRADIENTS = {
  flare: 'linear-gradient(135deg, #35d0f0 0%, #16b4de 45%, #1e7fc0 100%)',
  silver: 'linear-gradient(135deg, #b7c3ce 0%, #8ea0b2 45%, #63788c 100%)',
  moss: 'linear-gradient(135deg, #5cd39c 0%, #30b47d 45%, #1a8a5c 100%)',
  violet: 'linear-gradient(135deg, #9c8ff2 0%, #7a6cec 45%, #5a4bc4 100%)',
}

const awards = [
  {
    rank: 'First place',
    title: 'Champion',
    desc: 'Grand champion of Robo-Invent 2026 — fastest clean run, best-argued build.',
    mark: 'trophy',
    span: 'lg:col-span-7',
    accent: 'flare',
    featured: true,
  },
  {
    rank: 'Second place',
    title: 'Runner-up',
    desc: 'Second overall across every scoring criterion.',
    mark: 'medal',
    span: 'lg:col-span-5',
    accent: 'silver',
  },
  {
    rank: 'Special award',
    title: 'Most innovative robot',
    desc: 'The build that solved the course in a way the judges had not seen coming.',
    mark: 'bulb',
    span: 'lg:col-span-5',
    accent: 'moss',
  },
  {
    rank: 'Special award',
    title: 'Best team presentation',
    desc: 'The team that explained their engineering most clearly under questioning.',
    mark: 'speak',
    span: 'lg:col-span-7',
    accent: 'violet',
  },
]

export default function Awards() {
  return (
    <section id="awards" className="relative px-5 sm:px-8 lg:px-12 xl:px-16 pb-24 lg:pb-32">
      <div className="mx-auto max-w-[1800px]">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="eyebrow"
        >
          07 &mdash; Awards
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.08 }}
          className="display mt-6 text-[11vw] sm:text-[8vw] lg:text-[4.2vw] max-w-[14ch]"
        >
          Four ways to leave with something
        </motion.h2>

        <div className="mt-14 lg:mt-20 grid lg:grid-cols-12 gap-4 lg:gap-5">
          {awards.map((award, i) => (
            <motion.article
              key={award.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`${award.span} relative overflow-hidden rounded-panel border p-7 sm:p-9 flex flex-col min-h-[260px] sm:min-h-[300px] text-paper transition-transform duration-500 hover:-translate-y-1 ${
                award.featured ? 'border-flare/60' : 'border-transparent'
              }`}
              style={award.featured ? { boxShadow: '0 30px 80px -24px rgba(18, 181, 222, 0.55)' } : undefined}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: GRADIENTS[award.accent] }}
              />

              <div className="relative flex items-start justify-between gap-6">
                <span className="flex items-center gap-2.5">
                  {award.featured && (
                    <span className="relative flex w-1.5 h-1.5">
                      <span className="absolute inset-0 rounded-full bg-paper opacity-60 animate-ping" />
                      <span className="relative w-1.5 h-1.5 rounded-full bg-paper" />
                    </span>
                  )}
                  <span className="eyebrow-bare text-paper/70">{award.rank}</span>
                </span>
                <span className="text-paper">
                  <AwardMark name={award.mark} />
                </span>
              </div>

              <div className="relative mt-auto pt-12">
                <h3
                  className={`display ${
                    award.featured ? 'text-[34px] sm:text-[52px] lg:text-[64px]' : 'text-[28px] sm:text-[38px]'
                  }`}
                >
                  {award.title}
                </h3>
                <p className="mt-4 text-[14px] sm:text-[14.5px] leading-relaxed max-w-[42ch] text-paper/80">
                  {award.desc}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
