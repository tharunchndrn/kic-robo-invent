import { RoboInventLockup } from '../../components/BrandLogo'
import ThemeToggle from '../../components/ThemeToggle'
import { LAUNCHER_HREF } from '../lib/screens.js'
import { ConnectionBadge } from './ui.jsx'

/*
 * The site's pill navbar, in its "scrolled" state — this page has no hero to
 * sit over. Shows which arena this console runs and whether it's synced.
 */
export default function Header({ arena = null, online, children }) {
  return (
    <header className="sticky top-0 z-50 px-3 sm:px-5 pt-3 sm:pt-4">
      <div className="mx-auto max-w-[1800px] flex items-center justify-between gap-3 sm:gap-6 rounded-full pl-4 pr-1.5 sm:pl-7 sm:pr-2.5 h-14 sm:h-16 bg-card/85 backdrop-blur-xl border border-rule shadow-[0_10px_40px_-24px_rgba(0,0,0,0.7)]">
        <div className="flex items-center gap-4 min-w-0">
          <a href="/" className="shrink-0 opacity-95 hover:opacity-100 transition-opacity duration-300" aria-label="Robo-Invent 2026 home">
            <RoboInventLockup className="h-7 sm:h-10 w-auto" />
          </a>
          <span className="hidden sm:inline-block h-6 w-px bg-rule" aria-hidden />
          <a href={LAUNCHER_HREF} className="hidden sm:inline eyebrow-bare text-ink-soft hover:text-ink transition-colors duration-300 truncate">
            Stopwatch
            {arena && <span className="text-flare"> &middot; {arena.name}</span>}
          </a>
          {arena && <span className="sm:hidden eyebrow-bare text-flare">{arena.name}</span>}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {online !== undefined && (
            <span className="hidden md:inline-flex mr-1">
              <ConnectionBadge online={online} />
            </span>
          )}
          {children}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
