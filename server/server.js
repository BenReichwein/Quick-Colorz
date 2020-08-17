const express = require('express');
const socketIO = require('socket.io');
const path = require('path')
const PORT = process.env.PORT || 3000;
const INDEX = '/';

const server = express()
  .use((req, res) => res.sendFile(path.join(__dirname, 'index.html')))
  .listen(PORT, () => console.log(`Listening on ${PORT}`))

const io = socketIO(server);

const users = {}

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})