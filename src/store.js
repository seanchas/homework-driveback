// Let's just pretend we're accessing some remote storage asynchronously
// instead of global variable

const DATAREF = {
  current: []
}

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
    return
  }

  let tail = void 0

  while(tail = getTail()) {
    if (tail === void 0) break
    if (timestamp - tail.timestamp < THRESHOLD) break
    DATAREF.current = DATAREF.current.slice(0, -1)
  }
}

const inc = timestamp => {
   const head = getHead()

   if (head === void 0 || timestamp !== head.timestamp) {
     DATAREF.current = [{ count: 1, timestamp }].concat(DATAREF.current)
     return
   }

   DATAREF.current[0].count += 1
}

const calculate = () => {
  return DATAREF.current.reduce((memo, { count }) => memo + count, 0)
}

export const getPageHits = async () => {
  return new Promise(resolve => {
    const timestamp = Math.floor(Date.now() / 1000) * 1000

    removeStale(timestamp)
    inc(timestamp)

    resolve({ count: calculate(), timestamp })
  })
}
