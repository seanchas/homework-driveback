import { createCache } from "./cache"

const STEP = 1000
const THRESHOLD = 60 * 1000

const CACHE = createCache(THRESHOLD)

const COUNTREF = {
  current: 0,
}

const onDelete = count => {
  COUNTREF.current -= count
}

export const getPageHits = async () => {
  return new Promise(resolve => {
    const timestamp = Math.floor(Date.now() / STEP) * STEP

    COUNTREF.current += 1

    CACHE.add(timestamp, onDelete)

    resolve({ count: COUNTREF.current, timestamp })
  })
}
