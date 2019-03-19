const THRESHOLD = 60 * 1000

const data = {
  tick: 0,
  counter: 0,
}

const handler = (request, response) => {
  const tick = Date.now()

  if (tick - data.tick >= THRESHOLD) {
    data.tick = tick
    data.counter = 0
  }

  ++data.counter

  response.writeHead(200, { "Content-Type": "text/plain" })
  response.end(`:${data.counter}`)
}

export default handler
