import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Building2, Send, CheckCircle } from 'lucide-react'

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
    <section id="contact" className="py-20 md:py-28 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="section-label">Open Channel</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mt-6 mb-4 tracking-wide"
        >
          Contact KIC Robo-Invent Team
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center font-space text-text-secondary text-base max-w-2xl mx-auto leading-relaxed mb-16"
        >
          Have questions about registrations, bootcamps, partnerships, or the Grand Finale?
          Reach out to the organizing team.
        </motion.p>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="cyber-card p-6 rounded-sm">
              <h3 className="font-orbitron text-sm tracking-wider text-text-primary mb-6">
                CONTACT INFORMATION
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-sm bg-cyber-dark border border-cyber-border text-neon-cyan">
                    <Building2 size={16} />
                  </div>
                  <div>
                    <p className="font-orbitron text-[9px] tracking-[0.2em] text-text-dim mb-1">ORGANIZATION</p>
                    <p className="font-space text-sm text-text-primary">Robotics & IOT Club - KIC</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-sm bg-cyber-dark border border-cyber-border text-neon-cyan">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="font-orbitron text-[9px] tracking-[0.2em] text-text-dim mb-1">EMAIL</p>
                    <a href="mailto:info@kic-nibm.lk" className="font-space text-sm text-neon-cyan hover:underline">
                      vimukthi@nibm.lk
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-sm bg-cyber-dark border border-cyber-border text-neon-cyan">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="font-orbitron text-[9px] tracking-[0.2em] text-text-dim mb-1">PHONE</p>
                    <p className="font-space text-sm text-text-primary">+94 77 697 0125</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-sm bg-cyber-dark border border-cyber-border text-neon-cyan">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="font-orbitron text-[9px] tracking-[0.2em] text-text-dim mb-1">LOCATION</p>
                    <p className="font-space text-sm text-text-primary">NIBM KIC, Kandy, Sri Lanka</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative panel */}
            <div className="cyber-card p-4 rounded-sm flex items-center gap-3">
              <div className="w-1.5 h-1.5 bg-neon-green rounded-full pulse-glow" />
              <span className="font-orbitron text-[9px] tracking-[0.2em] text-text-dim">
                COMMUNICATION CHANNEL — ACTIVE
              </span>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="cyber-card p-6 md:p-8 rounded-sm hud-corners">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle size={48} className="text-neon-green mb-4" />
                  <h3 className="font-orbitron text-lg text-neon-green mb-2">
                    Transmission Sent Successfully
                  </h3>
                  <p className="font-space text-sm text-text-secondary">
                    Our team will respond to your inquiry shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
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
                      className="w-full px-4 py-3 bg-cyber-dark border border-cyber-border rounded-sm font-space text-sm text-text-primary placeholder-text-dim focus:outline-none focus:border-neon-cyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
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
                        className="w-full px-4 py-3 bg-cyber-dark border border-cyber-border rounded-sm font-space text-sm text-text-primary placeholder-text-dim focus:outline-none focus:border-neon-cyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block font-orbitron text-[9px] tracking-[0.2em] text-text-dim mb-2">
                        CONTACT NUMBER
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-cyber-dark border border-cyber-border rounded-sm font-space text-sm text-text-primary placeholder-text-dim focus:outline-none focus:border-neon-cyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300"
                        placeholder="+94 XX XXX XXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-orbitron text-[9px] tracking-[0.2em] text-text-dim mb-2">
                      INQUIRY TYPE
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-cyber-dark border border-cyber-border rounded-sm font-space text-sm text-text-primary focus:outline-none focus:border-neon-cyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300 appearance-none"
                    >
                      <option value="" className="bg-cyber-dark">Select inquiry type</option>
                      <option value="registration" className="bg-cyber-dark">School Registration</option>
                      <option value="bootcamp" className="bg-cyber-dark">Bootcamp Information</option>
                      <option value="sponsorship" className="bg-cyber-dark">Sponsorship / Partnership</option>
                      <option value="general" className="bg-cyber-dark">General Inquiry</option>
                    </select>
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
                      className="w-full px-4 py-3 bg-cyber-dark border border-cyber-border rounded-sm font-space text-sm text-text-primary placeholder-text-dim focus:outline-none focus:border-neon-cyan/50 focus:shadow-[0_0_15px_rgba(0,240,255,0.1)] transition-all duration-300 resize-none"
                      placeholder="Type your message here..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="glow-btn w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan font-orbitron text-xs tracking-widest hover:bg-neon-cyan/20 transition-all duration-300 rounded-sm"
                  >
                    <Send size={14} />
                    SEND MESSAGE
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
