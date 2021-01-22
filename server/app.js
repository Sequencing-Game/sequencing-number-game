const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = 3000

const message = [{
  name: 'Admin',
  value: 1
}]

const scores = []

// fungsi nunjukin skor paling gede
function showMax (array) {
  let init = 0

  for(let i=0; i < array.length; i++) {
    if(array[i] > init) {
      init = array[i]
    }
  }

  return init
}

io.on('connection', (socket) => {
  console.log('Socket.io client connected')
  socket.emit('init', message)

  socket.on('number', (payload) => {
    message.push(payload)
    // io.emit(message)
    socket.broadcast.emit('inputBaru', payload)
  })

  socket.on('score', (payload) => {
    scores.push(payload)
  })
})

server.listen(port, () => {
  console.log(`this app listening at http://localhost:${port}`)
})