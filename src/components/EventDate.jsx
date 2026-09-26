/* Dimension-line date callout: hairlines with end ticks plug into a tinted
   plate, the way the track drawings annotate a span. Sits on the hero's
   centre axis so the lockup stays symmetrical. */
function Rule({ tick }) {
  return (
    <span className="relative flex-1 min-w-[20px] h-px bg-rule" aria-hidden>
      <span
        className={`absolute top-1/2 -translate-y-1/2 w-px h-2.5 bg-rule ${tick === 'left' ? 'left-0' : 'right-0'}`}
      />
    </span>
  )
}

export default function EventDate() {
  return (
    <div className="w-full max-w-[560px] sm:max-w-[820px] lg:max-w-[980px] flex flex-col items-center gap-3">
      <span className="font-mono text-[11px] sm:text-xs font-medium uppercase tracking-[0.16em] text-ink-soft">Grand Finale</span>
      <div className="w-full flex items-center gap-3 sm:gap-6">
      <Rule tick="left" />

      <div className="relative flex min-w-0 items-center rounded-2xl border border-flare/25 bg-flare/[0.05] px-5 sm:px-8 py-3.5 sm:py-4">
        {/* Allowed to wrap: on a narrow screen this breaks to two lines rather
            than shrinking the type. */}
        <time dateTime="2026-10-02" className="flex flex-wrap justify-center items-baseline gap-x-1.5 sm:gap-x-3 gap-y-1 font-display font-extrabold uppercase tnum text-ink text-[22px] sm:text-[28px] lg:text-[34px] leading-[1.05] tracking-[-0.02em] text-center">
          <span>2nd</span>{' '}<span className="text-flare">October</span>{' '}<span>2026</span>
        </time>
      </div>

      <Rule tick="right" />
      </div>
    </div>
  )
}
