import { motion } from 'framer-motion'
import Countdown from './Countdown'
import EventDate from './EventDate'

export default function Hero() {
  const scrollTo = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const rise = (delay) => ({
    initial: { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <section id="hero" className="relative px-3 sm:px-5 pt-[102px] sm:pt-[114px] pb-3 sm:pb-5">
      <div className="frame mx-auto max-w-[1800px] min-h-[640px] lg:min-h-[calc(100vh-112px)] flex flex-col">
        {/* --- ATMOSPHERE ------------------------------------------------ */}
        <div className="absolute inset-0 bleed-warm pointer-events-none" />
        <div
          className="absolute inset-0 paper-grid pointer-events-none opacity-70"
          style={{ maskImage: 'radial-gradient(90% 80% at 50% 0%, #000 0%, transparent 72%)', WebkitMaskImage: 'radial-gradient(90% 80% at 50% 0%, #000 0%, transparent 72%)' }}
        />
        <div className="absolute inset-x-0 bottom-[8%] flex justify-center pointer-events-none overflow-hidden">
          {/* Sized against the frame, not the viewport — a raw vw value
              outgrows the capped container and gets its ends shaved off. */}
          <span className="watermark-solid text-[clamp(3rem,24vw,440px)]">Invent</span>
        </div>

        {/* --- CONTENT --------------------------------------------------- */}
        <div className="hero-shell relative z-10 flex-1 flex flex-col justify-center lg:justify-start px-5 sm:px-8 lg:px-12 xl:px-16 py-7 sm:py-10 lg:pt-10 lg:pb-6">
          {/* Title lockup */}
          <div className="flex flex-col items-center text-center">
            <motion.p {...rise(0.15)} className="eyebrow after:content-[''] after:w-7 after:h-px after:bg-ink-faint">
              NIBM Kandy Innovation Centre presents
            </motion.p>

            <motion.h1
              {...rise(0.25)}
              className="hero-title display mt-5 sm:mt-6 text-[calc((100vw-72px)/7.1)] sm:text-[11vw] lg:text-[clamp(3.5rem,8.6vw,178px)] leading-[0.86]"
            >
              Robo&#8209;Invent
              <br />
              <span className="text-flare">2026</span>
            </motion.h1>

            <motion.div {...rise(0.34)} className="w-full mt-7 sm:mt-8 flex justify-center">
              <EventDate />
            </motion.div>

            <motion.p
              {...rise(0.44)}
              className="mt-9 sm:mt-10 font-display font-semibold text-[22px] sm:text-[28px] lg:text-[32px] tracking-[-0.035em] leading-[1.15]"
            >
              Build a robot that thinks for itself.
            </motion.p>

            <motion.p
              {...rise(0.52)}
              className="mt-4 max-w-[54ch] text-[15px] sm:text-base leading-relaxed text-ink-soft"
            >
              An inter-school robotics championship for O/L students across the Kandy
              District. Four days of Arduino training, then one autonomous run through a
              scale smart city &mdash; no remote controls allowed.
            </motion.p>

            <motion.div {...rise(0.6)} className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-3">
              <a href="#bootcamp" onClick={(e) => scrollTo(e, '#bootcamp')} className="btn btn-flare">
                Follow the bootcamp
              </a>
              <a href="#challenge" onClick={(e) => scrollTo(e, '#challenge')} className="btn btn-ghost">
                See the challenge
              </a>
            </motion.div>
          </div>

          {/* --- COUNTDOWN BAND ----------------------------------------- */}
          <motion.div {...rise(0.75)} className="relative z-10 lg:mt-auto pt-8 sm:pt-10 lg:pt-7">
            <div className="relative border-t border-rule pt-6 sm:pt-7">
              <Countdown />

              <a
                href="#about"
                onClick={(e) => scrollTo(e, '#about')}
                aria-label="Scroll to next section"
                className="absolute right-0 bottom-0 hidden sm:flex w-12 h-12 lg:w-14 lg:h-14 rounded-[14px] bg-card border border-rule text-ink items-center justify-center hover:bg-flare hover:border-flare hover:text-carbon transition-colors duration-300"
              >
                <motion.span
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-lg leading-none"
                  aria-hidden
                >
                  &#8595;
                </motion.span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
