import { useEffect } from 'react'
import { arenaById } from './lib/arenas.js'
import { rememberedScreen } from './lib/screens.js'
import DisplayView from './components/DisplayView.jsx'
import Home from './components/Home.jsx'
import OperatorView from './components/OperatorView.jsx'
import StandingsView from './components/StandingsView.jsx'

/*
 * One static page, routed by query string so each machine's link is
 * bookmarkable:
 *   /stopwatch/                         choose a screen (or this device's remembered one)
 *   /stopwatch/?pick=1                  choose a screen, ignoring the remembered one
 *   /stopwatch/?arena=A                 Arena A judges' console
 *   /stopwatch/?arena=A&view=display    Arena A display
 *   /stopwatch/?view=standings          both arenas, overall
 */
function route() {
  const params = new URLSearchParams(window.location.search)
  const arena = arenaById(params.get('arena'))
  const view = params.get('view')
  if (view === 'standings') return { page: 'standings', title: 'Standings' }
  if (arena && view === 'display') return { page: 'display', arena, title: `${arena.name} display` }
  if (arena) return { page: 'console', arena, title: `${arena.name} console` }
  // Bare /stopwatch/ on a device that has a job goes straight to it;
  // ?pick shows the launcher anyway.
  const remembered = !params.has('pick') && rememberedScreen()
  if (remembered) return { page: 'redirect', href: remembered.href, title: 'Stopwatch' }
  return { page: 'home', title: 'Stopwatch' }
}

export default function StopwatchApp() {
  const current = route()

  useEffect(() => {
    document.title = `${current.title} | ROBO-INVENT 2026`
  }, [current.title])

  if (current.page === 'redirect') {
    window.location.replace(current.href)
    return null
  }

  switch (current.page) {
    case 'standings':
      return <StandingsView />
    case 'display':
      return <DisplayView arena={current.arena} />
    case 'console':
      return <OperatorView arena={current.arena} />
    default:
      return <Home />
  }
}
