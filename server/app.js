const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = 3000

io.on('connection', (socket) => {
  console.log('Socket.io client connected')
  socket.emit('init', {message: 'Sequencing Number Game'})
})

server.listen(port, () => {
  console.log(`this app listening at http://localhost:${port}`)
})