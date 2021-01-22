const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = 3000

const message = [{
  name: 'Admin',
  value: 1,
  n: 1,
  temp: null
}]

let scores = []

// fungsi nunjukin skor paling gede
function showMax (array) {
  let init = 0
  let name = ''
  for(let i=0; i < array.length; i++) {
    if(array[i].score > init) {
      init = array[i].score
      name = array[i].name
    }
  }

  return {name: name, score: init}
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
    console.log(payload)
    scores = payload
    console.log(scores)
    const highestScore = showMax(scores)
    console.log(highestScore)
    socket.broadcast.emit('highestScore', highestScore)
  })
})

server.listen(port, () => {
  console.log(`this app listening at http://localhost:${port}`)
})