import { motion } from 'framer-motion'

/* This panel used to be the registration CTA. Entries have closed, so it now
   carries the live story instead — where the bootcamp has got to, and what the
   next session is. Deliberately holds no headcount: capacity is known, how many
   schools actually came through the form is not. */

const board = [
  { k: 'Status', v: 'Under way' },
  { k: 'Next session', v: '24 Sep, 8.00 am' },
  { k: 'Entries', v: 'Closed' },
  { k: 'District', v: 'Kandy' },
]

export default function NowRunning() {
  return (
    <section id="now" className="relative px-3 sm:px-5 pb-16 lg:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto max-w-[1800px] rounded-frame overflow-hidden bg-flare"
        style={{
          background: 'linear-gradient(135deg, #35d0f0 0%, #16b4de 45%, #1e7fc0 100%)',
        }}
      >
        <div className="absolute inset-0 paper-grid-fixed opacity-25 pointer-events-none" />
        <div className="hidden lg:block absolute right-[-4%] bottom-[-15%] pointer-events-none select-none">
          <span className="watermark text-[17vw] text-transparent" style={{ WebkitTextStroke: '1.5px rgba(8,17,28,0.22)' }}>
            2026
          </span>
        </div>

        <div className="relative px-6 sm:px-10 lg:px-14 xl:px-20 py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10">
            <div className="lg:col-span-7">
              <p className="eyebrow before:bg-carbon/40 text-carbon/70">08 &mdash; Now running</p>

              <h2 className="display mt-6 text-[12vw] sm:text-[9vw] lg:text-[5vw] max-w-[11ch] text-carbon">
                The bootcamp is under way
              </h2>

              <p className="mt-7 max-w-[46ch] text-[15px] sm:text-base leading-relaxed text-carbon/75">
                Entries have closed and the teams are in the labs. The briefing and the first two
                workshops are done; Workshop 03 takes place on Thursday the 24th,
                from 8.00 am at the Kandy Innovation Centre. The same morning the technical
                team goes through every robot built so far, and all competing students need
                to be there.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a href="#bootcamp" className="btn btn-invert">
                  See the day board
                  <span aria-hidden className="text-base leading-none -mt-px">&#8595;</span>
                </a>
                <a 
                  href="/KIC-Robo-Invent-Rulebook.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn bg-white text-carbon font-semibold shadow-lg hover:scale-105 transition-transform"
                >
                  Download the rulebook
                </a>
              </div>
            </div>

            {/* Progress board */}
            <div className="lg:col-span-4 lg:col-start-9 flex flex-col justify-end">
              <div className="border-t border-carbon/25 pt-6">
                <p className="eyebrow-bare text-carbon/60">Bootcamp days complete</p>
                <p className="mt-3 flex items-baseline gap-3 font-display font-semibold tnum leading-[0.78] tracking-[-0.06em] text-carbon">
                  <span className="text-[72px] sm:text-[96px]">02</span>
                  <span className="text-[24px] sm:text-[30px] text-carbon/50">/ 04</span>
                </p>
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-y-5 gap-x-6">
                {board.map((item) => (
                  <div key={item.k} className="border-t border-carbon/20 pt-3">
                    <dt className="eyebrow-bare text-carbon/55">{item.k}</dt>
                    <dd className="mt-2 font-display font-semibold text-lg tracking-[-0.02em] text-carbon">
                      {item.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
