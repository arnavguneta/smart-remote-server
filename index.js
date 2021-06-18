const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3002

io.use((socket, next) => {
    if (socket.handshake.auth && socket.handshake.auth.token) {
        if (socket.handshake.auth.token === process.env.auth_token) next()
        else console.log("Socket connection: Authentication Error")
    }
})

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.emit('testing')

    socket.on('poop', () => {
        io.emit('poop_response')
    })
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})