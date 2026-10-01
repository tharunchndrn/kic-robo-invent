/*
 * The finale runs two arenas side by side, each with its own judges, queue,
 * stopwatch and display. Results are also combined into one overall board.
 */
export const EVENT_ID = 'robo-invent-2026'

export const ARENAS = [
  { id: 'A', name: 'Arena A' },
  { id: 'B', name: 'Arena B' },
]

export function arenaById(id) {
  return ARENAS.find((a) => a.id === String(id ?? '').toUpperCase()) ?? null
}

export function otherArena(id) {
  return ARENAS.find((a) => a.id !== id)
}

/** Teams from every arena in one list, each tagged with its arena id. */
export function combineTeams(byArena) {
  return ARENAS.flatMap((a) => (byArena[a.id]?.teams ?? []).map((t) => ({ ...t, arena: a.id })))
}
