import { motion } from 'framer-motion'

const REGISTER_URL = 'https://forms.gle/veywtaSV25KpvPPZ6'

const spec = [
  {
    field: 'Target group',
    value: 'O/L students',
    note: 'Open to every school in the Kandy District',
  },
  {
    field: 'Teams per school',
    value: '2 maximum',
    note: 'Both teams may compete in the same heat',
  },
  {
    field: 'Students per team',
    value: '3 maximum',
    note: 'Smaller teams are welcome to enter',
  },
  {
    field: 'Supervision',
    value: 'One staff advisor',
    note: 'A teacher or coordinator must accompany the team',
  },
  {
    field: 'Prior experience',
    value: 'None required',
    note: 'The bootcamp starts at first principles',
  },
  {
    field: 'Entry fee',
    value: 'Free',
    note: 'Components and lab time are provided',
  },
]

export default function Eligibility() {
  return (
    <section id="eligibility" className="relative px-5 sm:px-8 lg:px-12 xl:px-16 py-24 lg:py-32">
      <div className="mx-auto max-w-[1800px]">
        <div className="grid lg:grid-cols-12 gap-x-10 gap-y-8 items-end">
          <div className="lg:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              className="eyebrow"
            >
              03 &mdash; Who can enter
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: 0.08 }}
              className="display mt-6 text-[11vw] sm:text-[8vw] lg:text-[4.2vw] max-w-[11ch]"
            >
              Entry specification
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.16 }}
            className="lg:col-span-5 lg:col-start-8 max-w-[44ch] lg:pb-3 text-[15px] sm:text-base leading-relaxed text-ink-soft"
          >
            Six requirements, and that&apos;s the whole of it &mdash; scan the grid below. If
            your school can field three students and one supervising adult, it qualifies.
          </motion.p>
        </div>

        {/* Spec grid — every cell the same size, so all six read in one glance */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 lg:mt-20 panel overflow-hidden"
        >
          <div className="flex items-center justify-between gap-4 px-5 sm:px-8 py-4 border-b border-rule bg-paper-deep/60">
            <span className="eyebrow-bare text-ink-mute">Entry requirements</span>
            <span className="eyebrow-bare text-ink-faint">Ref. RI/26/E</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-rule">
            {spec.map((row, i) => (
              <div
                key={row.field}
                className="group bg-card hover:bg-paper-deep/50 transition-colors duration-300 px-6 sm:px-7 py-8 sm:py-10 flex flex-col"
              >
                <div className="flex items-center gap-2.5">
                  <span className="eyebrow-bare text-ink-faint tnum">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="eyebrow-bare text-ink-mute">{row.field}</span>
                </div>

                <p className="mt-5 font-display font-black text-[30px] sm:text-[34px] lg:text-[38px] tracking-[-0.035em] leading-[1.05] group-hover:text-flare transition-colors duration-300">
                  {row.value}
                </p>

                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">
                  {row.note}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 px-5 sm:px-8 py-6 bg-paper-deep/60 border-t border-rule">
            <p className="font-mono text-[10.5px] tracking-[0.14em] uppercase text-ink-mute">
              Registration closes September 2026
            </p>
            <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
              Claim a slot
              <span aria-hidden className="text-base leading-none -mt-px">&#8599;</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
