const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const playerScore = document.getElementById('scorecount')
const startButton = document.getElementById('startBtn')
startButton.addEventListener('click', () => {
    socket.emit('new-user', playerScore.innerHTML)
    socket.on('player-score', data => {
        console.log(data)
        alert(`${data} Scored ${data.score}`)
    })
})


// const name = prompt('What is your name?')
// appendMessage('You joined')



// socket.on('chat-message', data => {
//   appendMessage(`${data.name}: ${data.message}`)
// })

// socket.on('user-connected', name => {
//   appendMessage(`${name} connected`)
// })

// socket.on('user-disconnected', name => {
//   appendMessage(`${name} disconnected`)
// })

// messageForm.addEventListener('submit', e => {
//   e.preventDefault()
//   const message = messageInput.value
//   appendMessage(`You: ${message}`)
//   socket.emit('send-chat-message', message)
//   messageInput.value = ''
// })

// function appendMessage(message) {
//   const messageElement = document.createElement('div')
//   messageElement.innerText = message
//   messageContainer.append(messageElement)
// }

