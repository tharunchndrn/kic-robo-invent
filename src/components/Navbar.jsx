import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight } from 'lucide-react'

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Challenge', href: '#challenge' },
  { name: 'Bootcamp', href: '#bootcamp' },
  { name: 'Timeline', href: '#timeline' },
  { name: 'Eval & Awards', href: '#judging' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Combined robust scroll listener for header transitions & active tab highlighting
  useEffect(() => {
    const handleScroll = () => {
      // 1. Navbar scrolled style toggle
      setScrolled(window.scrollY > 50)

      // 2. Active section detection
      const sections = ['about', 'challenge', 'bootcamp', 'timeline', 'judging', 'awards', 'faq', 'contact']
      const scanLine = window.innerHeight * 0.35 // 35% from the top of the viewport for natural focal tracking

      let currentActive = ''
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= scanLine && rect.bottom > scanLine) {
            currentActive = id === 'awards' ? 'judging' : id
            break
          }
        }
      }

      if (currentActive) {
        setActiveSection(currentActive)
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Run immediately on mount with a microscopic delay to ensure DOM compilation
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
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-cyber-black/95 backdrop-blur-xl border-b border-cyber-border/75 shadow-[0_4px_30px_rgba(0,0,0,0.6),0_1px_15px_rgba(0,240,255,0.06)]'
          : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
              <div className="relative">
                <div className="w-9 h-9 border-2 border-neon-cyan rounded-sm flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] group-hover:border-neon-cyan transition-all duration-300">
                  <span className="font-orbitron text-neon-cyan text-xs font-bold">RI</span>
                </div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
              </div>
              <div className="hidden sm:block">
                <p className="font-orbitron text-sm font-bold text-text-primary group-hover:text-neon-cyan transition-colors duration-300 tracking-wider">RI 2026</p>
                <p className="text-[10px] tracking-[0.2em] text-text-dim uppercase">Inter-School Robotics Championship</p>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1)
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`relative px-2 xl:px-3 py-1 font-space text-[13px] tracking-wide transition-all duration-300 group flex items-center ${isActive ? 'text-neon-cyan glow-text font-bold' : 'text-text-secondary hover:text-white'
                      }`}
                  >
                    {/* Futuristic Left Bracket Indicator */}
                    <span className={`font-orbitron text-[9px] text-neon-cyan select-none transition-all duration-300 mr-0.5 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 -translate-x-1 scale-90 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100'
                      }`}>
                      [
                    </span>

                    {link.name}

                    {/* Futuristic Right Bracket Indicator */}
                    <span className={`font-orbitron text-[9px] text-neon-cyan select-none transition-all duration-300 ml-0.5 ${isActive ? 'opacity-100 scale-100' : 'opacity-0 translate-x-1 scale-90 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100'
                      }`}>
                      ]
                    </span>
                  </a>
                )
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <a
                href="https://forms.gle/veywtaSV25KpvPPZ6"
                target="_blank"
                rel="noopener noreferrer"
                className="glow-btn inline-flex items-center gap-2 px-6 py-2.5 bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan font-orbitron text-xs tracking-wider hover:bg-neon-cyan/20 transition-all duration-300 rounded-sm"
              >
                REGISTER NOW
                <ChevronRight size={14} />
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-text-secondary hover:text-neon-cyan transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-cyber-black/95 backdrop-blur-xl" />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-cyber-dark border-l border-cyber-border p-8 pt-24"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.slice(1)
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className={`flex items-center gap-3 px-4 py-3.5 font-space text-lg border-b border-cyber-border/50 transition-colors ${isActive ? 'text-neon-cyan font-bold pl-6' : 'text-text-secondary hover:text-white'
                        }`}
                    >
                      <span className={`text-[10px] font-orbitron ${isActive ? 'text-neon-cyan' : 'text-text-dim'}`}>
                        0{i + 1}
                      </span>
                      {link.name}
                    </motion.a>
                  )
                })}
              </div>

              <motion.a
                href="https://forms.gle/veywtaSV25KpvPPZ6"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 glow-btn flex items-center justify-center gap-2 px-6 py-3 bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan font-orbitron text-xs tracking-wider rounded-sm"
              >
                REGISTER NOW
                <ChevronRight size={14} />
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
