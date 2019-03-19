import http from "http"
import handler from "./handler"

const server = http.createServer(handler)

server.listen(process.env.PORT || 3000)
