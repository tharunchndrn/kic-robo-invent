import { motion } from 'framer-motion'
import { Globe, Camera, Video, Briefcase, ArrowUp, Link2, Share2 } from 'lucide-react'
import { useState } from 'react'

const quickLinks = [
  { name: 'About', href: '#about' },
  { name: 'Challenge', href: '#challenge' },
  { name: 'Bootcamp', href: '#bootcamp' },
  { name: 'Timeline', href: '#timeline' },
  { name: 'Register', href: '#register' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
]

const socials = [
  { icon: Globe, href: '#', label: 'Facebook' },
  { icon: Camera, href: '#', label: 'Instagram' },
  { icon: Video, href: '#', label: 'YouTube' },
  { icon: Briefcase, href: '#', label: 'LinkedIn' },
]

export default function Footer() {
  const [copied, setCopied] = useState(false)

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ROBO-INVENT 2026',
          text: 'Kandy Schools Robotics Championship for O/L Students',
          url: window.location.href,
        })
      } catch {
        // User cancelled share
      }
    } else {
      handleCopyLink()
    }
  }

  return (
    <footer className="relative border-t border-cyber-border bg-cyber-dark">
      {/* Back to top */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2">
        <button
          onClick={handleScrollTop}
          className="p-3 bg-cyber-dark border border-cyber-border rounded-full hover:border-neon-cyan/40 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300 text-text-dim hover:text-neon-cyan"
          aria-label="Back to top"
        >
          <ArrowUp size={16} />
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 border-2 border-neon-cyan rounded-sm flex items-center justify-center">
                <span className="font-orbitron text-neon-cyan text-xs font-bold">RI</span>
              </div>
              <div>
                <p className="font-orbitron text-sm font-bold text-text-primary tracking-wider">RI 2026</p>
              </div>
            </div>
            <p className="font-space text-sm text-text-secondary leading-relaxed mb-6">
              Inter-school Robotics Championship for O/L Students.
              Build, code, navigate, and innovate with the next generation of robotics engineers.
            </p>

            {/* Share buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-3 py-1.5 border border-cyber-border rounded-sm text-text-dim hover:text-neon-cyan hover:border-neon-cyan/30 transition-all duration-300"
              >
                <Link2 size={12} />
                <span className="font-orbitron text-[8px] tracking-wider">
                  {copied ? 'COPIED!' : 'COPY LINK'}
                </span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-3 py-1.5 border border-cyber-border rounded-sm text-text-dim hover:text-neon-cyan hover:border-neon-cyan/30 transition-all duration-300"
              >
                <Share2 size={12} />
                <span className="font-orbitron text-[8px] tracking-wider">SHARE</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-orbitron text-xs tracking-[0.2em] text-text-primary mb-6">
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-space text-sm text-text-secondary hover:text-neon-cyan transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-orbitron text-xs tracking-[0.2em] text-text-primary mb-6">
              CONNECT
            </h4>
            <div className="space-y-4 mb-6">
              <div>
                <p className="font-orbitron text-[8px] tracking-[0.2em] text-text-dim uppercase font-extrabold mb-0.5">FACULTY ADVISOR</p>
                <a href="mailto:vimukthi@nibm.lk" className="font-space text-sm text-text-secondary hover:text-neon-cyan transition-colors block">
                  vimukthi@nibm.lk
                </a>
              </div>
              <div>
                <p className="font-orbitron text-[8px] tracking-[0.2em] text-text-dim uppercase font-extrabold mb-0.5">EVENT ORGANIZER</p>
                <a href="mailto:tharunc39@gmail.com" className="font-space text-sm text-text-secondary hover:text-neon-cyan transition-colors block">
                  tharunc39@gmail.com
                </a>
              </div>
              <div>
                <p className="font-orbitron text-[8px] tracking-[0.2em] text-text-dim uppercase font-extrabold mb-0.5">HEADQUARTERS</p>
                <p className="font-space text-sm text-text-secondary">
                  Kandy Innovation Centre
                </p>
                <p className="font-space text-xs text-text-dim mt-0.5">
                  NIBM KIC, Kandy, Sri Lanka.
                </p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 border border-cyber-border rounded-sm text-text-dim hover:text-neon-cyan hover:border-neon-cyan/30 hover:shadow-[0_0_10px_rgba(0,240,255,0.1)] transition-all duration-300"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-cyber-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-space text-xs text-text-dim text-center md:text-left">
            © 2026 National Institute of Business Management, Kandy Innovation Centre. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-neon-green rounded-full pulse-glow" />
            <span className="font-orbitron text-[9px] tracking-[0.2em] text-text-dim">
              System Online — RI 2026
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
