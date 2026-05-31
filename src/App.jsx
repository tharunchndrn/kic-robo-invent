import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
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
import ParticleBackground from './components/ParticleBackground'
import Lenis from 'lenis'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (loading) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Handle standard anchor link smooth scrolling via Lenis
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (target) {
        e.preventDefault()
        const id = target.getAttribute('href')
        if (id === '#') return
        const element = document.querySelector(id)
        if (element) {
          lenis.scrollTo(element, { offset: -80 })
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      lenis.destroy()
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [loading])

  if (loading) {
    return (
      <div className="fixed inset-0 bg-cyber-black flex items-center justify-center z-[9999]">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-2 border-cyber-border rounded-full animate-spin">
              <div className="absolute top-0 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1 bg-neon-cyan rounded-full shadow-[0_0_10px_var(--color-neon-cyan)]" />
            </div>
          </div>
          <p className="mt-6 font-orbitron text-xs tracking-[0.3em] text-neon-cyan animate-pulse">
            INITIALIZING SYSTEM
          </p>
          <div className="mt-3 w-48 h-[2px] bg-cyber-border mx-auto overflow-hidden rounded">
            <div className="h-full bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-[scan_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-cyber-black">
      {/* Scanning line effect */}
      <div className="scan-line" />
      
      {/* Particle background */}
      <ParticleBackground />

      {/* Main content */}
      <Navbar />
      <main className="flex flex-col w-full relative z-10 overflow-hidden">
        <Hero />
        <div className="circuit-divider max-w-4xl mx-auto" />
        <About />
        <div className="circuit-divider max-w-4xl mx-auto" />
        <Challenge />
        <div className="circuit-divider max-w-4xl mx-auto" />
        <Eligibility />
        <div className="circuit-divider max-w-4xl mx-auto" />
        <Bootcamp />
        <div className="circuit-divider max-w-4xl mx-auto" />
        <Timeline />
        <div className="circuit-divider max-w-4xl mx-auto" />
        <Judging />
        <div className="circuit-divider max-w-4xl mx-auto" />
        <Awards />
        <div className="circuit-divider max-w-4xl mx-auto" />
        <Registration />
        <div className="circuit-divider max-w-4xl mx-auto" />
        <FAQ />
        <div className="circuit-divider max-w-4xl mx-auto" />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
