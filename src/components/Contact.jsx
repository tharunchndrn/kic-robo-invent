import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Building2, Send, CheckCircle, ShieldCheck, Cpu } from 'lucide-react'

const WhatsAppIcon = ({ size = 15, className }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
  >
    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.054L2 22l5.077-1.331a9.92 9.92 0 004.93 1.309h.005c5.507 0 9.99-4.478 9.99-9.984 0-2.67-1.037-5.18-2.92-7.062C17.202 3.048 14.683 2 12.012 2zm5.727 14.072c-.246.696-1.446 1.3-1.977 1.378-.476.069-.997.106-2.993-.72a11.9 11.9 0 01-5.132-4.516c-.99-1.344-1.636-2.903-1.636-4.525 0-1.785.932-2.661 1.258-3.009.26-.277.587-.348.78-.348h.619c.195 0 .445-.078.694.522.257.619.878 2.143.955 2.298.077.155.129.336.026.542-.103.206-.155.335-.31.516-.155.18-.328.4-.47.535-.155.155-.316.323-.135.632.18.31.8 1.309 1.716 2.122.922.82 1.696 1.071 2.006 1.226.31.155.49.129.671-.077.18-.206.774-.903.98-1.213.207-.31.413-.258.697-.155.283.103 1.8.852 2.11 1.006.31.155.516.232.593.361.078.13.078.748-.168 1.444z" />
  </svg>
)

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    /*
     * ============================================
     * TODO: Connect to a backend service
     * ============================================
     * Options:
     * 1. EmailJS — emailjs.send(serviceId, templateId, formData)
     * 2. Formspree — fetch('https://formspree.io/f/{formId}', { method: 'POST', body: formData })
     * 3. Google Forms — redirect or iframe embed
     * 4. Custom backend API — fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
     * ============================================
     */

    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', type: '', message: '' })
    }, 4000)
  }

  return (
    <section id="contact" className="py-14 md:py-28 px-4 relative overflow-hidden">
      {/* Visual cyber mesh background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-neon-cyan/[0.02] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-neon-blue/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto space-y-10 md:space-y-12 relative z-10">
        {/* Header Block */}
        <div>
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-4"
          >
            <span className="section-label">COMMUNICATION PLATFORM</span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center font-orbitron text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mt-4 mb-4 tracking-wide"
          >
            Get In Touch With The Team
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center font-space text-text-secondary text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-2"
          >
            Connect with our event coordinators and institutional representatives directly, or send us a secure transmission below.
          </motion.p>
        </div>

        {/* ROW 1: Two Contact Cards Side-by-Side (Faculty / Staff Advisor comes first) */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Faculty / Staff Advisor */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="cyber-card p-5 xs:p-6 md:p-8 rounded-sm border-t-2 border-t-[#00f0ff] relative overflow-hidden hover:shadow-[0_4px_30px_rgba(0,240,255,0.18)] transition-all duration-300 group h-full flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f0ff]/[0.03] rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-cyber-dark/85 px-2 py-0.5 border border-neon-green/30 rounded-sm z-20">
                <span className="w-1.5 h-1.5 bg-neon-green rounded-full pulse-glow animate-pulse" />
                <span className="font-orbitron text-[8px] tracking-wider text-neon-green font-bold uppercase">ONLINE</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5 mt-4 sm:mt-0">
                {/* Glowing Cyber Initials Frame */}
                <div className="relative w-14 h-14 border-2 border-[#00f0ff] bg-cyber-dark/95 rounded-sm flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-all duration-300">
                  <div className="absolute -top-[1.5px] -left-[1.5px] w-3 h-3 border-t-2 border-l-2 border-white" />
                  <div className="absolute -bottom-[1.5px] -right-[1.5px] w-3 h-3 border-b-2 border-r-2 border-white" />
                  <span className="font-orbitron text-lg font-black text-[#00f0ff] tracking-wider drop-shadow-[0_0_6px_rgba(0,240,255,0.6)]">VP</span>
                </div>

                <div className="space-y-1">
                  <span className="font-orbitron text-[9px] sm:text-[10px] tracking-[0.25em] text-[#00f0ff] font-extrabold block drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">
                    FACULTY / STAFF ADVISOR
                  </span>
                  <h3 className="font-orbitron text-xl sm:text-2xl font-bold text-white leading-tight">
                    Mr. Vimukthi Pathirana
                  </h3>
                  <p className="font-space text-xs text-text-secondary mt-0.5">
                    Faculty Advisor — Kandy Innovation Centre
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-cyber-border/40 space-y-3">
                {/* Secure Email Row */}
                <div className="flex items-center justify-between p-3 bg-cyber-dark/60 border border-[#00f0ff]/40 rounded-sm hover:border-[#00f0ff] transition-all duration-300">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 rounded-sm bg-cyber-dark text-[#00f0ff] border border-[#00f0ff]/30 shrink-0 shadow-[0_0_8px_rgba(0,240,255,0.1)]">
                      <Mail size={15} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-orbitron text-[9px] tracking-wider text-text-secondary font-bold uppercase">SECURE EMAIL</p>
                      <a href="mailto:vimukthi@nibm.lk" className="font-space text-xs sm:text-sm font-extrabold text-[#00f0ff] hover:text-white transition-colors duration-200 block truncate">
                        vimukthi@nibm.lk
                      </a>
                    </div>
                  </div>
                  <span className="font-orbitron text-[8px] text-[#00f0ff] bg-[#00f0ff]/15 px-2 py-0.5 border border-[#00f0ff]/30 rounded-sm font-black tracking-wider shrink-0 shadow-[0_0_6px_rgba(0,240,255,0.15)] hidden min-[400px]:inline-flex">SECURE</span>
                </div>

                {/* Phone & WhatsApp Side-by-Side Strips */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {/* Hotline strip */}
                  <a
                    href="tel:+94710340367"
                    className="flex items-center gap-3 p-3 bg-cyber-dark/60 border border-cyber-border/80 rounded-sm hover:border-[#00f0ff] hover:bg-cyber-dark/80 transition-all duration-300 group"
                  >
                    <div className="p-2 rounded-sm bg-cyber-dark text-white border border-cyber-border shrink-0">
                      <Phone size={15} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-orbitron text-[9px] tracking-wider text-text-secondary font-bold uppercase">HOTLINE</p>
                      <p className="font-space text-xs sm:text-sm font-bold text-white transition-colors group-hover:text-[#00f0ff] truncate">
                        +94 71 034 0367
                      </p>
                    </div>
                  </a>

                  {/* WhatsApp Direct Chat strip */}
                  <a
                    href="https://wa.me/94710340367"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-sm hover:bg-[#22c55e]/20 hover:border-[#22c55e] transition-all duration-300 group shadow-[0_0_15px_rgba(34,197,94,0.05)]"
                  >
                    <div className="p-2 rounded-sm bg-cyber-dark text-[#22c55e] border border-[#22c55e]/20 shrink-0">
                      <WhatsAppIcon size={15} className="text-[#22c55e]" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-orbitron text-[9px] tracking-wider text-[#22c55e] font-black uppercase">WHATSAPP</p>
                      <p className="font-space text-xs sm:text-sm font-bold text-[#22c55e] group-hover:text-white transition-colors truncate">
                        Message Online
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-cyber-border/30">
              <p className="font-orbitron text-[10px] tracking-[0.2em] text-[#00f0ff] mb-3 uppercase font-extrabold">DIRECTORY SCOPE</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {['OFFICIAL SCHOOL COMMUNICATIONS', 'INSTITUTIONAL MATTERS', 'APPROVALS', 'ACADEMIC COORDINATION', 'SPONSORSHIPS'].map(tag => (
                  <span key={tag} className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-cyber-dark/90 border border-[#00f0ff]/40 text-white font-space text-[9px] sm:text-[10.5px] uppercase tracking-wide rounded-sm shadow-[inset_0_1px_4px_rgba(0,0,0,0.6)] hover:border-[#00f0ff] transition-colors duration-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2: Event Lead Organizer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="cyber-card p-5 xs:p-6 md:p-8 rounded-sm border-t-2 border-t-[#00f0ff] relative overflow-hidden hover:shadow-[0_4px_30px_rgba(0,240,255,0.18)] transition-all duration-300 group h-full flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f0ff]/[0.03] rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-cyber-dark/85 px-2 py-0.5 border border-neon-green/30 rounded-sm z-20">
                <span className="w-1.5 h-1.5 bg-neon-green rounded-full pulse-glow animate-pulse" />
                <span className="font-orbitron text-[8px] tracking-wider text-neon-green font-bold uppercase">ONLINE</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5 mt-4 sm:mt-0">
                {/* Glowing Cyber Initials Frame */}
                <div className="relative w-14 h-14 border-2 border-[#00f0ff] bg-cyber-dark/95 rounded-sm flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.25)] transition-all duration-300">
                  <div className="absolute -top-[1.5px] -left-[1.5px] w-3 h-3 border-t-2 border-l-2 border-white" />
                  <div className="absolute -bottom-[1.5px] -right-[1.5px] w-3 h-3 border-b-2 border-r-2 border-white" />
                  <span className="font-orbitron text-lg font-black text-[#00f0ff] tracking-wider drop-shadow-[0_0_6px_rgba(0,240,255,0.6)]">TC</span>
                </div>

                <div className="space-y-1">
                  <span className="font-orbitron text-[9px] sm:text-[10px] tracking-[0.25em] text-[#00f0ff] font-extrabold block drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">
                    EVENT ORGANIZER
                  </span>
                  <h3 className="font-orbitron text-xl sm:text-2xl font-bold text-white leading-tight">
                    Tharun Chandran
                  </h3>
                  <p className="font-space text-xs text-text-secondary mt-0.5">
                    Event Coordinator — KIC Robo-Invent 2026
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-cyber-border/40 space-y-3">
                {/* Secure Email Row */}
                <div className="flex items-center justify-between p-3 bg-cyber-dark/60 border border-[#00f0ff]/40 rounded-sm hover:border-[#00f0ff] transition-all duration-300">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2.5 rounded-sm bg-cyber-dark text-[#00f0ff] border border-[#00f0ff]/30 shrink-0 shadow-[0_0_8px_rgba(0,240,255,0.1)]">
                      <Mail size={15} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-orbitron text-[9px] tracking-wider text-text-secondary font-bold uppercase">SECURE EMAIL</p>
                      <a href="mailto:tharunc39@gmail.com" className="font-space text-xs sm:text-sm font-extrabold text-[#00f0ff] hover:text-white transition-colors duration-200 block truncate">
                        tharunc39@gmail.com
                      </a>
                    </div>
                  </div>
                  <span className="font-orbitron text-[8px] text-[#00f0ff] bg-[#00f0ff]/15 px-2 py-0.5 border border-[#00f0ff]/30 rounded-sm font-black tracking-wider shrink-0 shadow-[0_0_6px_rgba(0,240,255,0.15)] hidden min-[400px]:inline-flex">SECURE</span>
                </div>

                {/* Phone & WhatsApp Side-by-Side Strips */}
                <div className="grid sm:grid-cols-2 gap-3">
                  {/* Hotline strip */}
                  <a
                    href="tel:+94776970125"
                    className="flex items-center gap-3 p-3 bg-cyber-dark/60 border border-cyber-border/80 rounded-sm hover:border-[#00f0ff] hover:bg-cyber-dark/80 transition-all duration-300 group"
                  >
                    <div className="p-2 rounded-sm bg-cyber-dark text-white border border-cyber-border shrink-0">
                      <Phone size={15} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-orbitron text-[9px] tracking-wider text-text-secondary font-bold uppercase">HOTLINE</p>
                      <p className="font-space text-xs sm:text-sm font-bold text-white transition-colors group-hover:text-[#00f0ff] truncate">
                        +94 77 697 0125
                      </p>
                    </div>
                  </a>

                  {/* WhatsApp Direct Chat strip */}
                  <a
                    href="https://wa.me/94776970125"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-sm hover:bg-[#22c55e]/20 hover:border-[#22c55e] transition-all duration-300 group shadow-[0_0_15px_rgba(34,197,94,0.05)]"
                  >
                    <div className="p-2 rounded-sm bg-cyber-dark text-[#22c55e] border border-cyber-border shrink-0">
                      <WhatsAppIcon size={15} className="text-[#22c55e]" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-orbitron text-[9px] tracking-wider text-[#22c55e] font-black uppercase">WHATSAPP</p>
                      <p className="font-space text-xs sm:text-sm font-bold text-[#22c55e] group-hover:text-white transition-colors truncate">
                        Message Online
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-cyber-border/30">
              <p className="font-orbitron text-[10px] tracking-[0.2em] text-[#00f0ff] mb-3 uppercase font-extrabold">DIRECTORY SCOPE</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {['REGISTRATION SUPPORT', 'TEAM COORDINATION', 'EVENT UPDATES', 'GENERAL INQUIRIES', 'SPONSORSHIPS'].map(tag => (
                  <span key={tag} className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-cyber-dark/90 border border-[#00f0ff]/40 text-white font-space text-[9px] sm:text-[10.5px] uppercase tracking-wide rounded-sm shadow-[inset_0_1px_4px_rgba(0,0,0,0.6)] hover:border-[#00f0ff] transition-colors duration-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ROW 2: Institutional Hub & Inquiry Form */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Institutional Hub Card (col-span-4) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-4 flex flex-col h-full"
          >
            <div className="cyber-card p-6 md:p-8 rounded-sm hud-corners h-full flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-neon-cyan/[0.01] rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-6">
                <div>
                  <span className="font-orbitron text-[9px] tracking-[0.25em] text-text-secondary font-bold block mb-3">
                    HEADQUARTERS HUB
                  </span>
                  <h3 className="font-orbitron text-lg font-bold text-white leading-tight">
                    Institutional Details
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-sm bg-cyber-dark border border-cyber-border text-neon-cyan shrink-0">
                      <Building2 size={16} />
                    </div>
                    <div>
                      <p className="font-orbitron text-[8px] tracking-[0.2em] text-text-secondary mb-0.5">HOST INSTITUTION</p>
                      <p className="font-space text-base text-white font-bold">NIBM, Kandy Innovation Centre</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-sm bg-cyber-dark border border-cyber-border text-neon-cyan shrink-0">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <p className="font-orbitron text-[8px] tracking-[0.2em] text-text-secondary mb-0.5">LOCATION</p>
                      <p className="font-space text-base text-white font-bold">Kandy, Sri Lanka.</p>
                    </div>
                  </div>
                </div>

                {/* System Telemetry Console Component */}
                <div className="p-4 bg-cyber-dark/60 border border-cyber-border/50 rounded-sm relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-orbitron text-[8px] tracking-[0.2em] text-text-secondary flex items-center gap-1.5 font-bold">
                      <Cpu size={10} className="text-neon-green" /> SYS CONSOLE
                    </span>
                    <span className="font-orbitron text-[8px] text-neon-green bg-neon-green/10 px-1.5 py-0.5 border border-neon-green/30">ONLINE</span>
                  </div>
                  <div className="space-y-1.5 font-mono text-[9px] text-text-secondary">
                    <p className="flex justify-between"><span>MAINFRAME:</span> <span className="text-neon-cyan font-bold">RI_PORTAL_v2.0</span></p>
                    <p className="flex justify-between"><span>ENCRYPTION:</span> <span className="text-neon-cyan font-bold">TLS_1.3_256BIT</span></p>
                    <p className="flex justify-between"><span>TELEMETRY:</span> <span className="text-neon-green font-bold">ACTIVE (100%)</span></p>
                  </div>
                </div>
              </div>

              {/* Secure bottom tag */}
              <div className="pt-4 border-t border-cyber-border/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-neon-green rounded-full pulse-glow" />
                  <span className="font-orbitron text-[8px] tracking-[0.2em] text-text-secondary">
                    COMM CHANNELS SECURED
                  </span>
                </div>
                <ShieldCheck size={14} className="text-neon-green" />
              </div>
            </div>
          </motion.div>

          {/* Secure Inquiry Transmission Form (col-span-8) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-8 flex flex-col h-full"
          >
            <div className="cyber-card p-6 md:p-8 rounded-sm hud-corners h-full flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/[0.01] rounded-full blur-2xl pointer-events-none" />

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center my-auto"
                >
                  <CheckCircle size={48} className="text-neon-green mb-4" />
                  <h3 className="font-orbitron text-lg text-neon-green mb-2">
                    Transmission Sent Successfully
                  </h3>
                  <p className="font-space text-sm text-text-secondary">
                    Our database has securely logged your inquiry. The team will respond shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <span className="font-orbitron text-[9px] tracking-[0.25em] text-text-dim font-bold block mb-3">
                        SECURE TRANSMISSION NODE
                      </span>
                      <h3 className="font-orbitron text-lg font-bold text-text-primary leading-tight">
                        Send An Inquiry Message
                      </h3>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-orbitron text-[9px] tracking-[0.2em] text-text-dim mb-2">
                          FULL NAME
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-cyber-dark/80 border border-cyber-border rounded-sm font-space text-sm text-text-primary placeholder-text-dim focus:outline-none focus:border-neon-cyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.08)] transition-all duration-300"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block font-orbitron text-[9px] tracking-[0.2em] text-text-dim mb-2">
                          EMAIL ADDRESS
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-cyber-dark/80 border border-cyber-border rounded-sm font-space text-sm text-text-primary placeholder-text-dim focus:outline-none focus:border-neon-cyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.08)] transition-all duration-300"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-orbitron text-[9px] tracking-[0.2em] text-text-dim mb-2">
                          CONTACT NUMBER
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-cyber-dark/80 border border-cyber-border rounded-sm font-space text-sm text-text-primary placeholder-text-dim focus:outline-none focus:border-neon-cyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.08)] transition-all duration-300"
                          placeholder="+94 XX XXX XXXX"
                        />
                      </div>
                      <div>
                        <label className="block font-orbitron text-[9px] tracking-[0.2em] text-text-dim mb-2">
                          INQUIRY TYPE
                        </label>
                        <div className="relative">
                          <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-cyber-dark/80 border border-cyber-border rounded-sm font-space text-sm text-text-primary focus:outline-none focus:border-neon-cyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.08)] transition-all duration-300 appearance-none"
                          >
                            <option value="" className="bg-cyber-dark">Select inquiry type</option>
                            <option value="registration" className="bg-cyber-dark">School Registration</option>
                            <option value="bootcamp" className="bg-cyber-dark">Bootcamp Information</option>
                            <option value="sponsorship" className="bg-cyber-dark">Sponsorship / Partnership</option>
                            <option value="general" className="bg-cyber-dark">General Inquiry</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-dim text-xs font-orbitron">▼</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block font-orbitron text-[9px] tracking-[0.2em] text-text-dim mb-2">
                        MESSAGE
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3 bg-cyber-dark/80 border border-cyber-border rounded-sm font-space text-sm text-text-primary placeholder-text-dim focus:outline-none focus:border-neon-cyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.08)] transition-all duration-300 resize-none"
                        placeholder="Type your message here..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="glow-btn w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan font-orbitron text-xs tracking-widest hover:bg-neon-cyan/20 transition-all duration-300 rounded-sm mt-6"
                  >
                    <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                    TRANSMIT INQUIRY SECURE
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
