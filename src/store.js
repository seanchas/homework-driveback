// Let's just pretend we're accessing some remote storage asynchronously
// instead of global variable

const DATAREF = {
  current: [],
}

const TOTALREF = {
  current: 0,
}

const STEP = 1000
const THRESHOLD = 60 * 1000

const getHead = () => {
  return DATAREF.current[0]
}

const getTail = () => {
  return DATAREF.current[DATAREF.current.length - 1]
}

const removeStale = timestamp => {
  const head = getHead()
  if (head === void 0) return

  if (timestamp - head.timestamp >= THRESHOLD) {
    DATAREF.current = []
    TOTALREF.current = 0
    return
  }

  let tail = void 0

  while ((tail = getTail())) {
    if (tail === void 0) break
    if (timestamp - tail.timestamp < THRESHOLD) break
    DATAREF.current = DATAREF.current.slice(0, -1)
    TOTALREF.current -= tail.count
  }
}

const inc = timestamp => {
  const head = getHead()

  if (head === void 0 || timestamp !== head.timestamp)
    DATAREF.current = [{ count: 0, timestamp }].concat(DATAREF.current)

  DATAREF.current[0].count += 1
  TOTALREF.current += 1
}

export const getPageHits = async () => {
  return new Promise(resolve => {
    const timestamp = Math.floor(Date.now() / STEP) * STEP

    removeStale(timestamp)
    inc(timestamp)

    resolve({ count: TOTALREF.current, timestamp })
  })
}
