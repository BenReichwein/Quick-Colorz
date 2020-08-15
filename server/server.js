const io = require('socket.io')(3000)

const users = {}

io.on('connection', socket => {
  socket.on('new-user', playerScore => {
    users[socket.id] = playerScore
    let userName = Object.keys(users)
    console.log(users)
    socket.emit('player-score', {user: userName, score: users[socket.id]})
  })
  console.log('New connection: ', socket.id)
  // socket.on('send-chat-message', message => {
  //   socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  // })
  // socket.on('disconnect', () => {
  //   socket.broadcast.emit('user-disconnected', users[socket.id])
  //   delete users[socket.id]
  // })
})