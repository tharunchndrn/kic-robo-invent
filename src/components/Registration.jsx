import { motion } from 'framer-motion'

const REGISTER_URL = 'https://forms.gle/veywtaSV25KpvPPZ6'

export default function Registration() {
  return (
    <section id="register" className="relative px-3 sm:px-5 pb-16 lg:pb-24">
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
        <div className="absolute inset-0 paper-grid opacity-25 pointer-events-none" />
        <div className="hidden lg:block absolute right-[-4%] bottom-[-15%] pointer-events-none select-none">
          <span className="watermark text-[17vw] text-transparent" style={{ WebkitTextStroke: '1.5px rgba(8,17,28,0.22)' }}>
            2026
          </span>
        </div>

        <div className="relative px-6 sm:px-10 lg:px-14 xl:px-20 py-16 lg:py-24">
          <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10">
            <div className="lg:col-span-7">
              <p className="eyebrow before:bg-paper/40 text-paper/70">08 &mdash; Registration</p>

              <h2 className="display mt-6 text-[12vw] sm:text-[9vw] lg:text-[5vw] max-w-[11ch] text-paper">
                Put your school on the grid
              </h2>

              <p className="mt-7 max-w-[46ch] text-[15px] sm:text-base leading-relaxed text-paper/75">
                Two teams per school. Three students per team. One supervising teacher or
                coordinator. Everything else &mdash; training, components, lab access &mdash; comes
                with the entry.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="btn btn-invert">
                  Register your school
                  <span aria-hidden className="text-base leading-none -mt-px">&#8599;</span>
                </a>
                <span className="btn border border-paper/25 text-paper/55 cursor-not-allowed select-none">
                  Rulebook &mdash; PDF soon
                </span>
              </div>
            </div>

            {/* Slot board */}
            <div className="lg:col-span-4 lg:col-start-9 flex flex-col justify-end">
              <div className="border-t border-paper/25 pt-6">
                <p className="eyebrow-bare text-paper/60">School slots remaining</p>
                <p className="mt-3 flex items-baseline gap-3 font-display font-semibold tnum leading-[0.78] tracking-[-0.06em] text-paper">
                  <span className="text-[72px] sm:text-[96px]">40</span>
                  <span className="text-[24px] sm:text-[30px] text-paper/50">/ 40</span>
                </p>
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-y-5 gap-x-6">
                {[
                  { k: 'Status', v: 'Open' },
                  { k: 'Closes', v: 'September 2026' },
                  { k: 'Entry fee', v: 'None' },
                  { k: 'District', v: 'Kandy' },
                ].map((item) => (
                  <div key={item.k} className="border-t border-paper/20 pt-3">
                    <dt className="eyebrow-bare text-paper/55">{item.k}</dt>
                    <dd className="mt-2 font-display font-semibold text-lg tracking-[-0.02em] text-paper">
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
