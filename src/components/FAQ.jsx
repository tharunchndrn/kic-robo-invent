import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'Who is eligible to participate?',
    a: 'The competition is open to all O/L level students from schools in the Kandy District. Each school enters up to two teams, with a maximum of three students per team.',
  },
  {
    q: 'How many students can be in one team?',
    a: 'Up to three O/L students. A teacher or school coordinator must also accompany the team as a supervisor on training and competition days.',
  },
  {
    q: 'Is the robotics bootcamp mandatory?',
    a: 'Yes. The four-day bootcamp is mandatory for every participating team and runs at the KIC NIBM Campus labs in September 2026.',
  },
  {
    q: 'What will students learn at the bootcamp?',
    a: 'Day one covers electronics fundamentals and Arduino fundamentals, starting from absolute basics. The curriculum for the remaining days will be announced closer to the bootcamp.',
  },
  {
    q: 'What exactly is the main challenge?',
    a: 'Teams design, build and program an autonomous vehicle that runs a Smart City obstacle course — precision line tracking, traffic signal response, and obstacle avoidance, all without remote control.',
  },
  {
    q: 'Does a school need prior robotics experience?',
    a: 'None at all. The bootcamp is built for absolute beginners and starts from basic electronics before moving to autonomous control.',
  },
  {
    q: 'What equipment do students need to bring?',
    a: 'Everything required for the bootcamp is provided at the KIC NIBM Campus labs. Students only need a notebook and their enthusiasm.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="relative bg-paper-deep border-y border-rule">
      <div className="px-5 sm:px-8 lg:px-12 xl:px-16 py-24 lg:py-32">
        <div className="mx-auto max-w-[1800px] grid lg:grid-cols-12 gap-x-12 gap-y-12">
          {/* Sticky header */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                className="eyebrow"
              >
                09 &mdash; Questions
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: 0.08 }}
                className="display mt-6 text-[11vw] sm:text-[8vw] lg:text-[3.6vw] max-w-[10ch]"
              >
                Before you ask
              </motion.h2>
              <p className="mt-7 max-w-[34ch] text-[15px] leading-relaxed text-ink-soft">
                Still stuck? The coordinators below answer on WhatsApp faster than by email.
              </p>
            </div>
          </div>

          {/* Accordion */}
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="border-t border-ink">
              {faqs.map((faq, i) => {
                const isOpen = open === i
                return (
                  <motion.div
                    key={faq.q}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ delay: i * 0.04 }}
                    className="border-b border-rule"
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="w-full text-left flex items-start gap-5 sm:gap-8 py-6 sm:py-7 group"
                    >
                      <span className={`eyebrow-bare tnum pt-1.5 shrink-0 transition-colors duration-300 ${isOpen ? 'text-flare' : 'text-ink-faint'}`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      <span
                        className={`flex-1 font-display font-semibold text-[19px] sm:text-[23px] leading-snug tracking-[-0.03em] transition-colors duration-300 ${
                          isOpen ? 'text-flare' : 'text-ink group-hover:text-ink-soft'
                        }`}
                      >
                        {faq.q}
                      </span>

                      {/* Plus that becomes a minus */}
                      <span className="relative shrink-0 w-4 h-4 mt-2">
                        <span className={`absolute inset-x-0 top-1/2 h-px -translate-y-1/2 transition-colors duration-300 ${isOpen ? 'bg-flare' : 'bg-ink'}`} />
                        <span
                          className={`absolute inset-y-0 left-1/2 w-px -translate-x-1/2 transition-all duration-300 ${
                            isOpen ? 'bg-flare rotate-90 opacity-0' : 'bg-ink'
                          }`}
                        />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="pb-7 pl-[52px] sm:pl-[68px] pr-8 max-w-[58ch] text-[14.5px] sm:text-[15px] leading-relaxed text-ink-soft">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
