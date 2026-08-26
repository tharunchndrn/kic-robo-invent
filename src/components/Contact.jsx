import { useState } from 'react'
import { motion } from 'framer-motion'

const WhatsAppGlyph = ({ size = 14, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} aria-hidden>
    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.054L2 22l5.077-1.331a9.92 9.92 0 004.93 1.309h.005c5.507 0 9.99-4.478 9.99-9.984 0-2.67-1.037-5.18-2.92-7.062C17.202 3.048 14.683 2 12.012 2zm5.727 14.072c-.246.696-1.446 1.3-1.977 1.378-.476.069-.997.106-2.993-.72a11.9 11.9 0 01-5.132-4.516c-.99-1.344-1.636-2.903-1.636-4.525 0-1.785.932-2.661 1.258-3.009.26-.277.587-.348.78-.348h.619c.195 0 .445-.078.694.522.257.619.878 2.143.955 2.298.077.155.129.336.026.542-.103.206-.155.335-.31.516-.155.18-.328.4-.47.535-.155.155-.316.323-.135.632.18.31.8 1.309 1.716 2.122.922.82 1.696 1.071 2.006 1.226.31.155.49.129.671-.077.18-.206.774-.903.98-1.213.207-.31.413-.258.697-.155.283.103 1.8.852 2.11 1.006.31.155.516.232.593.361.078.13.078.748-.168 1.444z" />
  </svg>
)

const people = [
  {
    role: 'Faculty / staff advisor',
    name: 'Mr. Vimukthi Pathirana',
    org: 'Kandy Innovation Centre, NIBM',
    email: 'vimukthi@nibm.lk',
    phone: '+94 71 034 0367',
    phoneHref: 'tel:+94710340367',
    whatsapp: 'https://wa.me/94710340367',
    handles: ['School communications', 'Institutional matters', 'Academic coordination'],
  },
  {
    role: 'Event organiser',
    name: 'Tharun Chandran',
    org: 'Event coordinator, Robo-Invent 2026',
    email: 'tharunc39@gmail.com',
    phone: '+94 77 697 0125',
    phoneHref: 'tel:+94776970125',
    whatsapp: 'https://wa.me/94776970125',
    handles: ['Registration support', 'Team coordination', 'Event updates'],
  },
]

const inquiryTypes = [
  { value: 'registration', label: 'School registration' },
  { value: 'bootcamp', label: 'Bootcamp information' },
  { value: 'sponsorship', label: 'Sponsorship / partnership' },
  { value: 'general', label: 'General inquiry' },
]

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', type: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    /*
     * TODO: wire to a backend. Options: EmailJS, Formspree, a Google Form
     * endpoint, or a small serverless handler at /api/contact.
     */
    console.log('Form submitted:', formData)

    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', type: '', message: '' })
    }, 5000)
  }

  return (
    <section id="contact" className="relative px-5 sm:px-8 lg:px-12 xl:px-16 py-24 lg:py-32">
      <div className="mx-auto max-w-[1800px]">
        <div className="grid lg:grid-cols-12 gap-x-10 gap-y-8 items-end">
          <div className="lg:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className="eyebrow"
            >
              10 &mdash; Contact
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.08 }}
              className="display mt-6 text-[11vw] sm:text-[8vw] lg:text-[4.2vw] max-w-[10ch]"
            >
              Talk to a human
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.16 }}
            className="lg:col-span-5 lg:col-start-8 max-w-[44ch] lg:pb-3 text-[15px] sm:text-base leading-relaxed text-ink-soft"
          >
            Two people run this event and both of them answer their own messages. Pick
            whichever is closer to your question.
          </motion.p>
        </div>

        {/* People */}
        <div className="mt-14 lg:mt-20 grid md:grid-cols-2 gap-x-10 gap-y-14">
          {people.map((person, i) => (
            <motion.div
              key={person.email}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-ink pt-7"
            >
              <div className="min-w-0">
                <p className="eyebrow-bare text-flare">{person.role}</p>
                <h3 className="mt-2.5 font-display font-bold text-xl sm:text-2xl tracking-[-0.03em] leading-tight">
                  {person.name}
                </h3>
                <p className="mt-1.5 text-[13.5px] text-ink-mute">{person.org}</p>
              </div>

              <dl className="mt-7">
                <div className="flex items-baseline gap-5 py-3.5 border-b border-rule-soft">
                  <dt className="eyebrow-bare text-ink-faint w-[76px] shrink-0">Email</dt>
                  <dd className="min-w-0">
                    <a href={`mailto:${person.email}`} className="ulink text-[14.5px] break-all">
                      {person.email}
                    </a>
                  </dd>
                </div>
                <div className="flex items-baseline gap-5 py-3.5 border-b border-rule-soft">
                  <dt className="eyebrow-bare text-ink-faint w-[76px] shrink-0">Phone</dt>
                  <dd>
                    <a href={person.phoneHref} className="ulink text-[14.5px] tnum">
                      {person.phone}
                    </a>
                  </dd>
                </div>
                <div className="flex items-baseline gap-5 py-3.5 border-b border-rule-soft">
                  <dt className="eyebrow-bare text-ink-faint w-[76px] shrink-0">WhatsApp</dt>
                  <dd>
                    <a
                      href={person.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ulink text-[14.5px] inline-flex items-center gap-2"
                    >
                      <WhatsAppGlyph />
                      Message directly
                    </a>
                  </dd>
                </div>
              </dl>

              <ul className="mt-5 flex flex-wrap gap-2">
                {person.handles.map((tag) => (
                  <li
                    key={tag}
                    className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-mute border border-rule rounded-full px-3 py-1.5"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Institution + form */}
        <div className="mt-16 lg:mt-24 grid lg:grid-cols-12 gap-x-10 gap-y-12">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            className="lg:col-span-4"
          >
            <p className="eyebrow-bare text-ink-mute">Host institution</p>
            <p className="mt-4 display text-[26px] sm:text-[32px] max-w-[12ch]">
              NIBM Kandy Innovation Centre
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft max-w-[32ch]">
              Kandy, Sri Lanka. Bootcamps and the grand finale both run on campus.
            </p>

            <div className="mt-8 border-t border-rule pt-6 space-y-4">
              {[
                { k: 'Office hours', v: 'Mon — Fri, 9.00 to 16.30' },
                { k: 'Reply time', v: 'Usually within two working days' },
              ].map((item) => (
                <div key={item.k}>
                  <p className="eyebrow-bare text-ink-faint">{item.k}</p>
                  <p className="mt-2 text-[14.5px] text-ink">{item.v}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-7 lg:col-start-6 panel p-7 sm:p-10"
          >
            {submitted ? (
              <div className="min-h-[380px] flex flex-col items-start justify-center">
                <span className="eyebrow-bare text-moss">Message sent</span>
                <p className="mt-5 display text-[30px] sm:text-[40px] max-w-[14ch]">
                  Thanks &mdash; we have it
                </p>
                <p className="mt-5 max-w-[40ch] text-[15px] leading-relaxed text-ink-soft">
                  One of the coordinators will get back to you shortly. If it is urgent, WhatsApp
                  is always faster.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <p className="eyebrow-bare text-ink-mute">Send an inquiry</p>
                <h3 className="mt-4 display text-[26px] sm:text-[32px] max-w-[16ch]">
                  Ask us anything about entering
                </h3>

                <div className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-7">
                  <label className="block">
                    <span className="field-label">Full name</span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="field mt-2"
                    />
                  </label>

                  <label className="block">
                    <span className="field-label">Email address</span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@school.lk"
                      className="field mt-2"
                    />
                  </label>

                  <label className="block">
                    <span className="field-label">Contact number</span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+94 XX XXX XXXX"
                      className="field mt-2 tnum"
                    />
                  </label>

                  <label className="block">
                    <span className="field-label">Inquiry type</span>
                    <div className="relative">
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className="field mt-2 appearance-none pr-8 bg-transparent"
                      >
                        <option value="">Select one</option>
                        {inquiryTypes.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <span aria-hidden className="pointer-events-none absolute right-1 bottom-3.5 text-ink-mute text-[10px]">
                        &#9660;
                      </span>
                    </div>
                  </label>

                  <label className="block sm:col-span-2">
                    <span className="field-label">Message</span>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Tell us what you need to know"
                      className="field mt-2 resize-none"
                    />
                  </label>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-5">
                  <button type="submit" className="btn btn-solid">
                    Send inquiry
                    <span aria-hidden className="text-base leading-none -mt-px">&#8594;</span>
                  </button>
                  <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink-faint">
                    We never share your details
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
