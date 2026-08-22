import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RoboInventLockup } from './BrandLogo'
import ThemeToggle from './ThemeToggle'

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Challenge', href: '#challenge' },
  { name: 'Entry', href: '#eligibility' },
  { name: 'Bootcamp', href: '#bootcamp' },
  { name: 'Timeline', href: '#timeline' },
  { name: 'Scoring', href: '#judging' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
]

const REGISTER_URL = 'https://forms.gle/veywtaSV25KpvPPZ6'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)

      // Nothing is "current" while the hero still fills the screen.
      if (window.scrollY < window.innerHeight * 0.5) {
        setActiveSection('')
        return
      }

      // Whichever section straddles the reading line owns the nav highlight.
      const readingLine = window.innerHeight * 0.35
      const ids = ['about', 'challenge', 'eligibility', 'bootcamp', 'timeline', 'judging', 'awards', 'faq', 'contact']

      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= readingLine && rect.bottom > readingLine) {
          setActiveSection(id === 'awards' ? 'judging' : id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    const timer = setTimeout(handleScroll, 100)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [])

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-5 pt-3 sm:pt-4"
      >
        <div
          className={`mx-auto max-w-[1800px] flex items-center justify-between gap-6 rounded-full pl-5 pr-2 sm:pl-7 sm:pr-2.5 h-14 sm:h-16 transition-all duration-500 ${
            scrolled
              ? 'bg-card/85 backdrop-blur-xl border border-rule shadow-[0_10px_40px_-24px_rgba(0,0,0,0.7)]'
              : 'bg-transparent border border-transparent'
          }`}
        >
          {/* Wordmark */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex items-center shrink-0 group"
            aria-label="Robo-Invent 2026, back to top"
          >
            <RoboInventLockup className="h-9 sm:h-11 w-auto opacity-95 group-hover:opacity-100 transition-opacity duration-300" />
          </a>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-mono text-[11px] tracking-[0.08em]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`transition-colors duration-300 ${
                  activeSection === link.href.slice(1) ? 'text-flare' : 'text-ink-soft hover:text-ink'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid h-10 sm:h-11 px-5 sm:px-6 text-[10px] sm:text-[11px]"
            >
              Register
              <span aria-hidden className="text-[13px] leading-none -mt-px">&#8599;</span>
            </a>

            {/* Mobile toggle — three rules that fold into a cross */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-11 h-11 rounded-full border border-rule flex flex-col items-start justify-center pl-3 gap-[5px] bg-card/60"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span className={`block h-[1.5px] w-4 bg-ink transition-all duration-300 ${mobileOpen ? 'translate-y-[3.25px] rotate-45' : ''}`} />
              <span className={`block h-[1.5px] bg-ink transition-all duration-300 ${mobileOpen ? 'w-4 -translate-y-[3.25px] -rotate-45' : 'w-2.5'}`} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-paper/95 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />

            <motion.nav
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative pt-28 px-6 pb-10 h-full flex flex-col"
            >
              <div className="hairline mb-1" />
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.slice(1)
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                    className={`flex items-baseline justify-between py-3.5 border-b border-rule-soft ${isActive ? 'text-flare' : 'text-ink'}`}
                  >
                    <span className="display text-[30px] sm:text-4xl">{link.name}</span>
                    <span className="eyebrow-bare text-ink-faint tnum">{String(i + 1).padStart(2, '0')}</span>
                  </motion.a>
                )
              })}

              <div className="mt-auto pt-8">
                <a
                  href={REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-flare w-full h-14"
                >
                  Register your school
                  <span aria-hidden className="text-base leading-none -mt-px">&#8599;</span>
                </a>
                <p className="mt-4 font-mono text-[10px] tracking-[0.18em] uppercase text-ink-mute text-center">
                  Kandy Innovation Centre &middot; NIBM
                </p>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
