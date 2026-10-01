import { useCallback, useEffect, useReducer, useRef, useState } from 'react'
import { initialState, isValidState, reducer } from '../lib/competition.js'
import { watchArena, writeArena } from '../lib/firebase.js'
import { decodeState } from '../lib/serialize.js'
import { now } from '../lib/timer.js'

// Every change made here is stamped, so two copies of an arena (this
// machine's and the database's) can always be ordered: newest wins.
function stampedReducer(state, action) {
  const next = reducer(state, action)
  return action.type !== 'hydrate' && next !== state ? { ...next, updatedAt: action.at } : next
}

function load(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key))
    return isValidState(parsed) ? parsed : { ...initialState(), updatedAt: 0 }
  } catch {
    return { ...initialState(), updatedAt: 0 }
  }
}

/*
 * One arena's competition state, shared through Firebase.
 *
 * - `operator` (the judges' console) changes state and pushes every change
 *   up. It also keeps a local copy, so a dropped connection or a reload never
 *   loses a run — the database SDK queues writes while offline and the newer
 *   local copy is pushed again once the connection returns.
 * - `viewer` (displays, standings) only mirrors what's in the database.
 *
 * A running stage is stored as its start timestamp in server time, so every
 * machine derives the same reading from it.
 */
export function useCompetition({ arena, role = 'viewer', passcode = '' }) {
  const isOperator = role === 'operator'
  const cacheKey = `ri-stopwatch-v2-${role}-${arena}`

  const [state, rawDispatch] = useReducer(stampedReducer, cacheKey, load)
  const [synced, setSynced] = useState(false)
  const [error, setError] = useState(null)

  const latest = useRef(state)
  const changedLocally = useRef(false)
  const passcodeRef = useRef(passcode)

  useEffect(() => {
    passcodeRef.current = passcode
  }, [passcode])

  const push = useCallback(
    (s) => {
      writeArena(arena, s, passcodeRef.current)
        .then(() => setError(null))
        .catch((e) =>
          setError(/permission/i.test(e?.message ?? '') ? 'Passcode rejected — changes are not reaching other screens.' : e?.message ?? 'Sync failed'),
        )
    },
    [arena],
  )

  // Local cache, and push our own changes up.
  useEffect(() => {
    latest.current = state
    try {
      localStorage.setItem(cacheKey, JSON.stringify(state))
    } catch {
      // Storage full or denied — Firebase still has it.
    }
    if (isOperator && changedLocally.current) {
      changedLocally.current = false
      push(state)
    }
  }, [state, cacheKey, isOperator, push])

  // Mirror the database.
  useEffect(
    () =>
      watchArena(
        arena,
        (value) => {
          setSynced(true)
          const remote = decodeState(value)
          const local = latest.current
          const remoteAt = remote?.updatedAt ?? -1
          const localAt = local.updatedAt ?? 0

          if (remoteAt === localAt) return // our own write echoing back
          if (isOperator && localAt > remoteAt) {
            // Made offline, or before this page reconnected — ours is newer.
            if (localAt > 0) push(local)
            return
          }
          // Someone else's change (another console, or the database being
          // cleared) — take it, and don't echo it back up.
          changedLocally.current = false
          rawDispatch({ type: 'hydrate', state: remote ?? { ...initialState(), updatedAt: 0 } })
        },
        (e) => setError(e?.message ?? 'Could not read from the database'),
      ),
    [arena, isOperator, push],
  )

  // Stamp the action the moment it's dispatched — the instant of the key press.
  const dispatch = useCallback((action) => {
    changedLocally.current = true
    rawDispatch({ at: now(), ...action })
  }, [])

  return { state, dispatch, synced, error }
}
