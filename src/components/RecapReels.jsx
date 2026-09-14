import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

/* The recaps were shot 9:16 on the day, so they are framed here as a filmstrip
   rather than a widescreen player — same aspect they were filmed in, no
   letterboxing. The trailing card is deliberately empty: the strip reads as a
   roll still being exposed, not a finished archive. */

const reels = [
  {
    id: 'briefing',
    index: '01',
    label: 'Briefing session',
    date: '04 Sep 2026',
    runtime: '1:36',
    blurb: 'Teams met the challenge, the rules and the road to October.',
    src: '/media/briefing-session.mp4',
    poster: '/media/briefing-session.jpg',
  },
  {
    id: 'workshop-01',
    index: '02',
    label: 'Workshop 01',
    date: '11 Sep 2026',
    runtime: '0:30',
    blurb: 'First contact with breadboards, sensors and the Arduino Uno.',
    src: '/media/workshop-01.mp4',
    poster: '/media/workshop-01.jpg',
  },
]

const upcoming = {
  index: '03',
  label: 'Workshop 02',
  date: '17 Sep 2026',
  blurb: 'Motor controllers, speed and direction — the day the robots move.',
}

function Reel({ reel, i }) {
  const videoRef = useRef(null)
  // idle → never started | live → handed over to the native controls | ended
  const [state, setState] = useState('idle')

  const start = () => {
    const el = videoRef.current
    if (!el) return

    // One reel at a time — starting this one silences whatever else is running.
    document.querySelectorAll('video[data-reel]').forEach((other) => {
      if (other !== el) other.pause()
    })

    el.controls = true
    el.play()
    setState('live')
  }

  // Deliberately not restored on `pause`: once the native control bar is up it
  // owns the surface, and a scrim over it would swallow the scrubber.
  const overlayVisible = state !== 'live'

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative shrink-0 snap-start w-[248px] sm:w-[288px] lg:w-[312px]"
    >
      {/* Locked dark: the surface under this overlay is footage, which stays
          dark whichever theme the site is in. Theme-relative ink here would
          turn into dark-on-dark the moment light mode is switched on. */}
      <div className="theme-dark-locked frame aspect-[9/16] rounded-panel">
        <video
          ref={videoRef}
          data-reel={reel.id}
          src={reel.src}
          poster={reel.poster}
          preload="metadata"
          playsInline
          onPlay={() => setState('live')}
          onEnded={() => setState('ended')}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            overlayVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-void/55 via-transparent to-void/90" />

          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 pt-4">
            <span className="eyebrow-bare text-ink/70">Reel {reel.index}</span>
            <span className="eyebrow-bare tnum text-ink/70 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-flare" />
              {reel.runtime}
            </span>
          </div>

          <button
            type="button"
            onClick={start}
            aria-label={`Play the ${reel.label} recap`}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="grid place-items-center w-16 h-16 rounded-full border border-ink/45 bg-void/35 backdrop-blur-md transition-all duration-500 ease-out-expo group-hover:border-flare group-hover:bg-flare group-hover:scale-110">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 translate-x-[1px] fill-ink transition-colors duration-500 group-hover:fill-carbon"
                aria-hidden
              >
                {state === 'ended' ? (
                  <path d="M12 5V2L7 6l5 4V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7Z" />
                ) : (
                  <path d="M8 5v14l11-7L8 5Z" />
                )}
              </svg>
            </span>
          </button>

          <div className="absolute inset-x-0 bottom-0 px-4 pb-4 pointer-events-none">
            <p className="eyebrow-bare text-flare">{reel.date}</p>
            <h4 className="mt-2 font-display font-semibold text-lg tracking-[-0.03em] text-ink">
              {state === 'ended' ? 'Watch again' : reel.label}
            </h4>
          </div>
        </div>
      </div>

      <p className="mt-4 text-[13.5px] leading-snug text-ink-soft max-w-[30ch]">{reel.blurb}</p>
    </motion.article>
  )
}

export default function RecapReels() {
  return (
    <div className="mt-20 lg:mt-28 border-t border-rule pt-10">
      <div className="grid lg:grid-cols-12 gap-x-10 gap-y-10">
        <div className="lg:col-span-4">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            className="eyebrow"
          >
            Recap reels
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.08 }}
            className="display mt-5 text-[9vw] sm:text-[6vw] lg:text-[2.5vw] max-w-[12ch]"
          >
            Already on the roll
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.14 }}
            className="mt-5 max-w-[36ch] text-[15px] leading-relaxed text-ink-soft"
          >
            Two sessions down, filmed as they happened. The third frame is still
            blank &mdash; that one gets shot on the 17th.
          </motion.p>
        </div>

        {/* Scrolls as a strip on narrow screens; all three sit in view on desktop. */}
        <div
          data-lenis-prevent
          className="filmstrip lg:col-span-8 flex gap-5 sm:gap-6 overflow-x-auto snap-x -mx-5 px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 pb-2"
        >
          {reels.map((reel, i) => (
            <Reel key={reel.id} reel={reel} i={i} />
          ))}

          {/* The unexposed frame. */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative shrink-0 snap-start w-[248px] sm:w-[288px] lg:w-[312px]"
          >
            <div className="aspect-[9/16] rounded-panel border border-dashed border-rule paper-grid-fine flex flex-col justify-between p-4">
              <div className="flex items-center justify-between">
                <span className="eyebrow-bare text-ink-faint">Reel {upcoming.index}</span>
                <span className="eyebrow-bare text-ink-faint">Unshot</span>
              </div>

              <span className="watermark self-center text-[72px]" aria-hidden>
                17
              </span>

              <div>
                <p className="eyebrow-bare text-ink-faint">{upcoming.date}</p>
                <h4 className="mt-2 font-display font-semibold text-lg tracking-[-0.03em] text-ink-faint">
                  {upcoming.label}
                </h4>
              </div>
            </div>

            <p className="mt-4 text-[13.5px] leading-snug text-ink-faint max-w-[30ch]">
              {upcoming.blurb}
            </p>
          </motion.article>
        </div>
      </div>
    </div>
  )
}
