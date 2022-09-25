const express = require('express')
const cors = require('cors')
const WebSocket = require('ws')


const app = express()
app.use( cors() )
app.use( express.json() )

const port = 8080

const wss = new WebSocket.Server({ port })
wss.on('connection', ws=> {
  ws.on('message', message=> {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString())
      }
    })
  })
})


console.log(`API app started on port ${port} - ${new Date(Date.now())}`)