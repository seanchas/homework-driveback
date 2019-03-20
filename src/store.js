// Let's just pretend we're accessing some remote storage asynchronously
// instead of global variable

const DATA = {
  timestamp: 0,
  count: 0,
}

const THRESHOLD = 60 * 1000

export const getPageHits = async () => {
  return new Promise(resolve => {
    const timestamp = Date.now()

    if (timestamp - DATA.timestamp >= THRESHOLD) {
      DATA.timestamp = timestamp
      DATA.count = 0
    }

    DATA.count += 1

    resolve(DATA)
  })
}
