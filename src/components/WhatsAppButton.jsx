import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/94776970125"
      /* TODO: Replace with actual WhatsApp number */
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 3, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 p-3.5 bg-[#25D366] rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_4px_30px_rgba(37,211,102,0.5)] transition-shadow duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={24} className="text-white" />

      {/* Ping animation */}
      <span className="absolute top-0 right-0 w-3 h-3">
        <span className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-40" />
        <span className="absolute inset-0 bg-[#25D366] rounded-full" />
      </span>
    </motion.a>
  )
}
