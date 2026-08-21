import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/*
 * Held back until the hero is off screen — otherwise it collides with the
 * scroll cue sitting in the bottom-right of the frame.
 */
export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="https://wa.me/94776970125"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.94 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 right-5 z-50 group flex items-center gap-3 rounded-full bg-ink text-paper pl-4 pr-5 py-3 shadow-[0_14px_40px_-16px_rgba(0,0,0,0.8)] hover:bg-flare transition-colors duration-300"
          aria-label="Chat with the organisers on WhatsApp"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.054L2 22l5.077-1.331a9.92 9.92 0 004.93 1.309h.005c5.507 0 9.99-4.478 9.99-9.984 0-2.67-1.037-5.18-2.92-7.062C17.202 3.048 14.683 2 12.012 2zm5.727 14.072c-.246.696-1.446 1.3-1.977 1.378-.476.069-.997.106-2.993-.72a11.9 11.9 0 01-5.132-4.516c-.99-1.344-1.636-2.903-1.636-4.525 0-1.785.932-2.661 1.258-3.009.26-.277.587-.348.78-.348h.619c.195 0 .445-.078.694.522.257.619.878 2.143.955 2.298.077.155.129.336.026.542-.103.206-.155.335-.31.516-.155.18-.328.4-.47.535-.155.155-.316.323-.135.632.18.31.8 1.309 1.716 2.122.922.82 1.696 1.071 2.006 1.226.31.155.49.129.671-.077.18-.206.774-.903.98-1.213.207-.31.413-.258.697-.155.283.103 1.8.852 2.11 1.006.31.155.516.232.593.361.078.13.078.748-.168 1.444z" />
          </svg>
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase hidden sm:inline">
            WhatsApp us
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
