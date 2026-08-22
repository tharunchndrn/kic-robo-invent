import { motion } from 'framer-motion'
import kic from '../assets/brand/kic.png'
import kicColour from '../assets/brand/kic-colour.png'
import nibm from '../assets/brand/nibm.png'
import nibmColour from '../assets/brand/nibm-colour.png'
import ieee from '../assets/brand/ieee-sb.png'
import ieeeColour from '../assets/brand/ieee-sb-colour.png'

/* Each mark ships as white-on-transparent (dark theme) and full-colour
   (light theme) — index.css swaps which one is in the document flow. */
const partners = [
  { src: nibm, srcColour: nibmColour, alt: 'NIBM — The City University', height: 'h-6 sm:h-7' },
  { src: kic, srcColour: kicColour, alt: 'Kandy Innovation Centre', height: 'h-8 sm:h-9' },
  { src: ieee, srcColour: ieeeColour, alt: 'IEEE Student Branch', height: 'h-5 sm:h-6' },
]

/*
 * A genuinely different structure, not a re-skinned ledger: the three
 * capacity figures live inside the paragraph as prose, not as their own
 * headline numerals — because they're a plan, not a result. The one number
 * that's actually true (the bootcamp length) gets the sole large numeral on
 * the page, so the hierarchy itself tells you which figure to trust.
 */

export default function About() {
  return (
    <section id="about" className="relative px-5 sm:px-8 lg:px-12 xl:px-16 py-24 lg:py-32">
      <div className="mx-auto max-w-[1800px] grid lg:grid-cols-12 gap-x-10 gap-y-16 items-center">
        {/* Statement */}
        <div className="lg:col-span-7 min-w-0">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="eyebrow"
          >
            01 &mdash; About
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.08 }}
            className="display mt-6 text-[10vw] sm:text-[7vw] lg:text-[3.6vw] max-w-[13ch]"
          >
            Engineering the next generation
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.16 }}
            className="mt-8 max-w-[58ch] text-[19px] sm:text-[22px] lg:text-[25px] leading-snug tracking-[-0.01em] text-ink"
          >
            This is Robo-Invent&apos;s first edition, so we&apos;re building capacity, not
            reporting a headcount &mdash; room for up to{' '}
            <span className="text-ink-soft">30 schools</span>,{' '}
            <span className="text-ink-soft">40 teams</span> and{' '}
            <span className="text-ink-soft">120 students</span> across the Kandy District.
            Nobody&apos;s registered yet.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.24 }}
            className="mt-7 max-w-[46ch] space-y-4 text-[15px] leading-relaxed text-ink-mute"
          >
            <p>
              It puts STEM education into the hands of Ordinary Level students &mdash;
              automation, logic design and hardware, taught the way engineers actually learn
              them: by building something that has to work on the day.
            </p>
            <p>
              It is run by the Kandy Innovation Centre at NIBM, and it is free to enter. No
              school needs a robotics club, a lab, or any prior experience to take part.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.32 }}
            className="mt-10 pt-6 border-t border-rule max-w-[640px]"
          >
            <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-ink-mute/70">
              Organised by
            </p>
            <div className="mt-5 overflow-hidden">
              <ul className="marquee-track flex flex-nowrap items-center gap-x-6 sm:gap-x-8 w-max">
                {[...partners, ...partners].map((p, i) => {
                  const isDupe = i >= partners.length
                  return (
                    <li key={`${p.alt}-${i}`} className={`shrink-0 ${isDupe ? 'sm:hidden' : ''}`} aria-hidden={isDupe}>
                      <img
                        src={p.src}
                        alt={p.alt}
                        className={`logo-dark ${p.height} w-auto opacity-90`}
                        draggable={false}
                      />
                      <img
                        src={p.srcColour}
                        alt={p.alt}
                        className={`logo-light ${p.height} w-auto`}
                        draggable={false}
                      />
                    </li>
                  )
                })}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* The one number that's actually real */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 lg:border-l lg:border-rule lg:pl-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-moss/40 pl-2.5 pr-3 py-1 font-mono text-[9px] tracking-[0.16em] uppercase text-moss">
            <span className="w-1.5 h-1.5 rounded-full bg-moss" />
            The one confirmed date
          </span>

          <p className="mt-6 font-display font-semibold tnum text-[30vw] sm:text-[19vw] lg:text-[9.5vw] leading-[0.75] tracking-[-0.06em] text-ink">
            04
          </p>

          <p className="mt-2 font-display font-semibold text-2xl sm:text-3xl tracking-[-0.03em]">
            Days of bootcamp
          </p>
          <p className="mt-2 font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute">
            Hands-on, at KIC labs &middot; September 2026
          </p>
        </motion.div>
      </div>
    </section>
  )
}
