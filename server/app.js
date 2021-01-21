const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = 3000

const message = [{
  name: 'Admin',
  value: 1
}]

io.on('connection', (socket) => {
  console.log('Socket.io client connected')
  socket.emit('init', message)

  socket.on('number', (payload) => {
    message.push(payload)
    // io.emit(message)
    socket.broadcast.emit('inputBaru', payload)
  })
})

server.listen(port, () => {
  console.log(`this app listening at http://localhost:${port}`)
})