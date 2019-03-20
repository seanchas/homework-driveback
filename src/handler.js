import { getPageHits } from "./store"

const handler = async (request, response) => {
  const { count, timestamp } = await getPageHits()

  response.writeHead(200, {
    "Content-Type": "text/plain",
    "X-Timestamp": timestamp,
  })

  response.end(`${count}`)
}

export default handler
