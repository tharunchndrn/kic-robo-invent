import { useState } from 'react'
import { motion } from 'framer-motion'
import kic from '../assets/brand/kic.png'
import kicColour from '../assets/brand/kic-colour.png'
import nibm from '../assets/brand/nibm.png'
import nibmColour from '../assets/brand/nibm-colour.png'
import ieee from '../assets/brand/ieee-sb.png'
import ieeeColour from '../assets/brand/ieee-sb-colour.png'

/* Pre-cropped, heights tuned per mark so their optical weight matches
   rather than their raw pixel height. Each ships white-on-transparent
   (dark theme, this footer's default) and full-colour (light theme) —
   index.css swaps which one is in the document flow. */
const partners = [
  { src: nibm, srcColour: nibmColour, alt: 'NIBM — The City University', height: 'h-7 sm:h-8' },
  { src: kic, srcColour: kicColour, alt: 'Kandy Innovation Centre', height: 'h-10 sm:h-12' },
  { src: ieee, srcColour: ieeeColour, alt: 'IEEE Student Branch', height: 'h-6 sm:h-7' },
]

const quickLinks = [
  { name: 'About', href: '#about' },
  { name: 'Challenge', href: '#challenge' },
  { name: 'Entry', href: '#eligibility' },
  { name: 'Bootcamp', href: '#bootcamp' },
  { name: 'Timeline', href: '#timeline' },
  { name: 'Scoring', href: '#judging' },
  { name: 'Awards', href: '#awards' },
  { name: 'Register', href: '#register' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
]

const contacts = [
  { role: 'Faculty advisor', name: 'Mr. Vimukthi Pathirana', email: 'vimukthi@nibm.lk' },
  { role: 'Event organiser', name: 'Tharun Chandran', email: 'tharunc39@gmail.com' },
]

export default function Footer() {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard denied — nothing useful to do here.
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ROBO-INVENT 2026',
          text: 'Kandy Schools Robotics Championship for O/L Students',
          url: window.location.href,
        })
        return
      } catch {
        // User dismissed the sheet.
        return
      }
    }
    handleCopyLink()
  }

  return (
    <footer className="relative bg-void text-ink overflow-hidden">
      <div className="px-5 sm:px-8 lg:px-12 xl:px-16 pt-20 lg:pt-28 pb-8">
        <div className="mx-auto max-w-[1800px]">
          <div className="grid md:grid-cols-12 gap-x-10 gap-y-14">
            {/* Statement */}
            <div className="md:col-span-5">
              <p className="eyebrow-bare text-ink/45">Robo-Invent 2026</p>
              <p className="mt-6 font-display font-semibold text-[26px] sm:text-[32px] leading-[1.1] tracking-[-0.035em] max-w-[18ch]">
                Inter-school robotics championship for O/L students.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleCopyLink}
                  className="btn border border-ink/25 text-ink hover:bg-ink hover:text-void"
                >
                  {copied ? 'Link copied' : 'Copy link'}
                </button>
                <button
                  onClick={handleShare}
                  className="btn border border-ink/25 text-ink hover:bg-ink hover:text-void"
                >
                  Share
                </button>
              </div>
            </div>

            {/* Index */}
            <nav className="md:col-span-3">
              <p className="eyebrow-bare text-ink/45">Index</p>
              <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-[14.5px] text-ink/70 hover:text-ink transition-colors duration-300">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contacts */}
            <div className="md:col-span-4">
              <p className="eyebrow-bare text-ink/45">Get in touch</p>
              <div className="mt-6 space-y-6">
                {contacts.map((person) => (
                  <div key={person.email} className="border-t border-ink/15 pt-4">
                    <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-ink/45">
                      {person.role}
                    </p>
                    <p className="mt-2 text-[15px] font-medium">{person.name}</p>
                    <a
                      href={`mailto:${person.email}`}
                      className="mt-1 inline-block text-[14px] text-ink/65 hover:text-flare transition-colors duration-300 break-all"
                    >
                      {person.email}
                    </a>
                  </div>
                ))}
                <div className="border-t border-ink/15 pt-4">
                  <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-ink/45">
                    Headquarters
                  </p>
                  <p className="mt-2 text-[15px] font-medium">NIBM Kandy Innovation Centre</p>
                  <p className="mt-1 text-[14px] text-ink/65">Kandy, Sri Lanka</p>
                </div>
              </div>
            </div>
          </div>

          {/* Organiser marks */}
          <div className="mt-16 lg:mt-24 pt-8 border-t border-ink/15">
            <p className="eyebrow-bare text-ink/40">Organised by</p>
            <ul className="mt-7 flex flex-wrap items-center gap-x-12 gap-y-8">
              {partners.map((p) => (
                <li key={p.alt}>
                  <img
                    src={p.src}
                    alt={p.alt}
                    className={`logo-dark ${p.height} w-auto opacity-70 hover:opacity-100 transition-opacity duration-300`}
                    draggable={false}
                  />
                  <img
                    src={p.srcColour}
                    alt={p.alt}
                    className={`logo-light ${p.height} w-auto opacity-85 hover:opacity-100 transition-opacity duration-300`}
                    draggable={false}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t border-ink/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink/40 max-w-[52ch] leading-relaxed">
              &copy; 2026 National Institute of Business Management &middot; Kandy Innovation Centre
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-3 font-mono text-[10px] tracking-[0.16em] uppercase text-ink/60 hover:text-ink transition-colors duration-300"
            >
              Back to top
              <span className="w-8 h-8 rounded-full border border-ink/25 flex items-center justify-center group-hover:bg-ink group-hover:text-void transition-colors duration-300">
                <span aria-hidden className="text-[13px] leading-none -mt-px">&#8593;</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Wordmark bookend */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="px-5 sm:px-8 lg:px-12 xl:px-16 pb-2 select-none pointer-events-none"
      >
        <p className="mx-auto max-w-[1800px] font-display font-black text-[clamp(2rem,12.4vw,248px)] leading-[0.78] tracking-[-0.06em] uppercase text-ink/12 whitespace-nowrap">
          Robo&#8209;Invent
        </p>
      </motion.div>
    </footer>
  )
}
