import { initializeApp } from 'firebase/app'
import { getDatabase, onValue, ref, serverTimestamp, update } from 'firebase/database'
import { EVENT_ID } from './arenas.js'
import { encodeState } from './serialize.js'
import { setClockOffset } from './timer.js'

/*
 * Firebase Realtime Database: the shared copy of each arena that every
 * machine — judges' consoles, displays, the standings screen — subscribes to.
 *
 * Web config values identify the project; they aren't secrets. What protects
 * the data is database.rules.json: anyone may read the arenas, but a write
 * only lands if it carries the event passcode.
 */
const firebaseConfig = {
  apiKey: 'AIzaSyB9-q874qiJkZbWjrtylNUELJg1016Yt58',
  authDomain: 'robo-invent-2026-timer.firebaseapp.com',
  databaseURL: 'https://robo-invent-2026-timer-default-rtdb.firebaseio.com',
  projectId: 'robo-invent-2026-timer',
  storageBucket: 'robo-invent-2026-timer.firebasestorage.app',
  messagingSenderId: '201945040944',
  appId: '1:201945040944:web:e75a2f44bc4a217343c5f5',
}

const db = getDatabase(initializeApp(firebaseConfig))
const eventRef = ref(db, `events/${EVENT_ID}`)

export function watchArena(arenaId, onState, onError) {
  return onValue(ref(db, `events/${EVENT_ID}/arenas/${arenaId}`), (snap) => onState(snap.val()), onError)
}

/**
 * Writes an arena's state. The passcode travels in the same atomic update,
 * stamped with server time, which is what the security rules check.
 */
export function writeArena(arenaId, state, passcode) {
  return update(eventRef, {
    [`keys/${arenaId}`]: { k: passcode, t: serverTimestamp() },
    [`arenas/${arenaId}`]: encodeState(state),
  })
}

/** Resolves if the passcode is accepted for this arena, rejects otherwise. */
export function verifyPasscode(arenaId, passcode) {
  return update(eventRef, { [`keys/${arenaId}`]: { k: passcode, t: serverTimestamp() } })
}

/** Keeps the local clock aligned to the server's. Call once per page. */
export function syncClock() {
  return onValue(ref(db, '.info/serverTimeOffset'), (snap) => setClockOffset(snap.val() ?? 0))
}

export function watchConnection(onChange) {
  return onValue(ref(db, '.info/connected'), (snap) => onChange(snap.val() === true))
}

const PASSCODE_KEY = 'ri-stopwatch-passcode'

export function savedPasscode() {
  try {
    return localStorage.getItem(PASSCODE_KEY) ?? ''
  } catch {
    return ''
  }
}

export function savePasscode(code) {
  try {
    if (code) localStorage.setItem(PASSCODE_KEY, code)
    else localStorage.removeItem(PASSCODE_KEY)
  } catch {
    // Storage denied — they'll be asked again next visit.
  }
}
