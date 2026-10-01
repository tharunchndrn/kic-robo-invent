import { useEffect, useState } from 'react'
import { syncClock, watchConnection } from '../lib/firebase.js'

/** Whether this page can currently reach Firebase. Also starts clock sync. */
export function useConnection() {
  const [online, setOnline] = useState(null)

  useEffect(() => {
    const stopClock = syncClock()
    const stopWatch = watchConnection(setOnline)
    return () => {
      stopClock()
      stopWatch()
    }
  }, [])

  return online
}
