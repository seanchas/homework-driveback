const data = {
  tick: null,
  counter: 0,
}

const handler = (request, response) => {
  const ticks = Math.floor(Date.now() / 1000 / 60)

  if (data.ticks !== ticks) {
    data.ticks = ticks
    data.counter = 0
  }

  ++data.counter

  response.writeHead(200, { "Content-Type": "text/plain" })
  response.end(`${data.counter}`)
}

export default handler
