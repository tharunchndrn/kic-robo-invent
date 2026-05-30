import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  {
    q: 'Who is eligible to participate?',
    a: 'The competition is open to all O/L level students from schools in the Kandy District. Each school can register up to 2 teams, with a maximum of 3 students per team.',
  },
  {
    q: 'How many students can be in one team?',
    a: 'Each team can consist of a maximum of 3 O/L students. A teacher or school coordinator must also accompany the team as a supervisor.',
  },
  {
    q: 'Is the Robotics Bootcamp mandatory?',
    a: 'Yes, the 4-day Robotics Bootcamp is mandatory for all participating teams. It will be conducted at the KIC NIBM Campus Labs during July to August 2026.',
  },
  {
    q: 'What will students learn at the bootcamp?',
    a: 'Students will learn Arduino programming, sensor integration (IR and ultrasonic), motor control, circuit wiring, autonomous navigation algorithms, line tracking, obstacle avoidance, and team presentation skills.',
  },
  {
    q: 'What is the main challenge?',
    a: 'Teams must design, build, and program an autonomous robotic vehicle capable of navigating a Smart City Obstacle Course — including precision line tracking, traffic signal response, and obstacle avoidance.',
  },
  {
    q: 'Does a school need prior robotics experience?',
    a: 'No prior robotics experience is required. The mandatory bootcamp is designed for beginners and will cover everything from the basics of electronics to advanced autonomous control.',
  },
  {
    q: 'What equipment do students need to bring?',
    a: 'All equipment and components required for the bootcamp will be provided at the KIC NIBM Campus Labs. Students only need to bring their enthusiasm and a notebook for taking notes.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section id="faq" className="py-20 md:py-28 px-4 relative">
      <div className="max-w-3xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="section-label">Intel Database</span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center font-orbitron text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mt-6 mb-16 tracking-wide"
        >
          Frequently Asked Questions
        </motion.h2>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="cyber-card rounded-sm overflow-hidden"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center gap-4 p-5 text-left hover:bg-cyber-card/50 transition-colors duration-300"
              >
                <HelpCircle size={16} className={`flex-shrink-0 transition-colors duration-300 ${openIndex === i ? 'text-neon-cyan' : 'text-text-dim'}`} />
                <span className={`flex-1 font-space text-sm md:text-base transition-colors duration-300 ${openIndex === i ? 'text-neon-cyan' : 'text-text-primary'}`}>
                  {faq.q}
                </span>
                <ChevronDown
                  size={16}
                  className={`flex-shrink-0 text-text-dim transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-neon-cyan' : ''}`}
                />
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pl-10 md:pl-[52px]">
                      <div className="h-[1px] bg-cyber-border mb-4" />
                      <p className="font-space text-sm text-text-secondary leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
