import { useEffect, useState } from 'react'

const STORAGE_KEY = 'ri-theme'

function getInitialTheme() {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export default function ThemeToggle({ className = '' }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light')
    } else {
      document.documentElement.removeAttribute('data-theme')
    }
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Storage denied (private mode, etc.) — the choice just won't persist.
    }
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  const isLight = theme === 'light'

  return (
    <button
      onClick={toggle}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      className={`relative shrink-0 w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-rule bg-card/60 flex items-center justify-center text-ink hover:border-ink hover:text-flare transition-colors duration-300 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        {isLight ? (
          <>
            <circle cx="12" cy="12" r="4.3" />
            <path d="M12 2.6v2.1M12 19.3v2.1M4.3 4.3l1.5 1.5M18.2 18.2l1.5 1.5M2.6 12h2.1M19.3 12h2.1M4.3 19.7l1.5-1.5M18.2 5.8l1.5-1.5" />
          </>
        ) : (
          <path d="M20.2 14.4A8.5 8.5 0 1 1 9.6 3.8a6.85 6.85 0 0 0 10.6 10.6Z" />
        )}
      </svg>
    </button>
  )
}
