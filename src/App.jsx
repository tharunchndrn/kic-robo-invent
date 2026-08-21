import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Challenge from './components/Challenge'
import Eligibility from './components/Eligibility'
import Bootcamp from './components/Bootcamp'
import Timeline from './components/Timeline'
import Judging from './components/Judging'
import Awards from './components/Awards'
import Registration from './components/Registration'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'

const BOOT_MS = 1500

function Boot({ done }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const start = performance.now()
    let raf

    const tick = (t) => {
      const p = Math.min((t - start) / BOOT_MS, 1)
      // Ease out so the number decelerates into 100 rather than ticking flat.
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[999] bg-paper flex flex-col justify-between px-5 sm:px-8 lg:px-12 py-6 sm:py-8"
      aria-hidden={done}
    >
      <div className="flex items-start justify-between">
        <span className="font-display font-extrabold text-[15px] sm:text-[17px] tracking-[-0.05em] uppercase">
          Robo&#8209;Invent
        </span>
        <span className="eyebrow-bare text-ink-mute">Kandy &middot; 2026</span>
      </div>

      <div className="mt-auto flex items-end justify-between gap-6">
        <p className="eyebrow-bare text-ink-mute max-w-[22ch] leading-relaxed">
          Inter-school robotics championship
        </p>
        <span className="font-display font-semibold tnum text-[18vw] sm:text-[13vw] lg:text-[9vw] leading-[0.78] tracking-[-0.06em]">
          {String(count).padStart(3, '0')}
        </span>
      </div>

      <div className="mt-6 h-px w-full bg-rule relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-flare transition-[width] duration-100 ease-linear"
          style={{ width: `${count}%` }}
        />
      </div>
    </motion.div>
  )
}

// Readers who ask for reduced motion get the page, not the overture.
const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function App() {
  const [booting, setBooting] = useState(!prefersReducedMotion)

  useEffect(() => {
    if (!booting) return
    const timer = setTimeout(() => setBooting(false), BOOT_MS + 150)
    return () => clearTimeout(timer)
  }, [booting])

  useEffect(() => {
    if (booting) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    let raf
    const loop = (time) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Route every in-page anchor through Lenis so the easing stays consistent.
    const handleAnchorClick = (e) => {
      const link = e.target.closest('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href')
      if (id === '#') return
      const el = document.querySelector(id)
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -88 })
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [booting])

  return (
    <div className="relative min-h-screen bg-paper grain">
      <AnimatePresence>{booting && <Boot key="boot" done={!booting} />}</AnimatePresence>

      <Navbar />

      <main className="relative">
        <Hero />
        <About />
        <Challenge />
        <Eligibility />
        <Bootcamp />
        <Timeline />
        <Judging />
        <Awards />
        <Registration />
        <FAQ />
        <Contact />
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}
