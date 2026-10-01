import { ARENAS } from './arenas.js'

/*
 * Every job a machine can do on event day, with the address it lives at.
 * A device can remember its job, so a smart board only needs /stopwatch/
 * opened once — after that it goes straight to its screen.
 */
export const SCREENS = [
  ...ARENAS.map((a) => ({
    id: `display-${a.id}`,
    kind: 'display',
    arena: a.id,
    label: `${a.name} display`,
    href: `/stopwatch/?arena=${a.id}&view=display`,
  })),
  { id: 'standings', kind: 'standings', arena: null, label: 'Overall standings', href: '/stopwatch/?view=standings' },
  ...ARENAS.map((a) => ({
    id: `console-${a.id}`,
    kind: 'console',
    arena: a.id,
    label: `${a.name} judges’ console`,
    href: `/stopwatch/?arena=${a.id}`,
  })),
]

/** The launcher, without jumping to this device's remembered screen. */
export const LAUNCHER_HREF = '/stopwatch/?pick=1'

const KEY = 'ri-stopwatch-screen'

export function rememberedScreen() {
  try {
    return SCREENS.find((s) => s.id === localStorage.getItem(KEY)) ?? null
  } catch {
    return null
  }
}

export function rememberScreen(id) {
  try {
    if (id) localStorage.setItem(KEY, id)
    else localStorage.removeItem(KEY)
  } catch {
    // Storage denied — the launcher just shows every time.
  }
}
