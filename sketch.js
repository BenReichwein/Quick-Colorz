// Width and Height
let width = 5;
let height = 5;
let cells = [];
let score = -1;
let mode = 0;
let finalColor = null
// # of seconds
let timeLeft = 9;
const userScore = document.getElementById('scorecount')
const playerBoard = document.getElementById('board')

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
    : null;
  }

function updateTable (width, height) {
    if(cells.length) {
        let tableBody = document.getElementsByTagName('tbody')
        cells = []
        tableBody[0].remove()
    }
    let table = document.createElement("tbody");
    //creates table rows and columns based on width and height
    for (let h = 0; h < height; h++) {
        let tr = document.createElement("tr");
        for (let w = 0; w < width; w++) {
            let td = document.createElement("td");
            td.dataset.row = h;
            td.dataset.col = w;
            cells.push(td);
            tr.append(td);
        }
        table.append(tr);
    }
    document.getElementById("board").append(table);
}
updateTable(width, height)

//generates random color
function generateRandomColor() {
    let randomColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    return randomColor;
}
function Start() {
    //sets a random color of each table cell
    let colorArr = cells.map(elem => {
        elem.addEventListener('mousedown', () => {
            if(elem.style.backgroundColor === document.getElementById('color').style.backgroundColor) {
                if(userScore.innerHTML >= 5 && userScore.innerHTML <= 10) {
                    width = 6
                    height = 6
                    updateTable(width, height)
            
                } else if(userScore.innerHTML > 10) {
                    width = 7
                    height = 7
                    updateTable(width, height)
                }
                round()
            }
        })
        return elem.style.backgroundColor = generateRandomColor()
    })
    let randomColorIndex = Math.floor(Math.random() * colorArr.length)
    document.getElementById('color').style.backgroundColor = colorArr[randomColorIndex]
    for(elem of cells) {
        if(elem.style.backgroundColor === hexToRgb(colorArr[randomColorIndex])) {
            finalColor =  elem
        }
    }
}

const startBtn = document.getElementById('startBtn')
startBtn.addEventListener('click', () => {
    location.reload()
    return false
})

let countdown = setInterval(() => {
    // timer is completed
    if (timeLeft <= 0) {
        clearInterval(countdown);
        document.getElementById('countdown').innerHTML = "You are out of time!"
        finalColor.style.transform = 'scale(1.2)'
        finalColor.style.borderRadius = '10px'
        // alert(`Time is up. You scored ${score}`)
        mode++;
    } else {
        // set timer to timeLeft variable
        document.getElementById('countdown').innerHTML = `${timeLeft} seconds remaining.`;
    }
    timeLeft--;
}, 1000)

const audio = document.getElementById('audio')
function playAudio() {
    audio.volume = 0.2
    audio.play()
}
function round() {
    if(timeLeft >= 1) {
        playAudio()
        Score();
        Start();
        timeLeft = 10;
    }
}

function Score() {
    score++;
    document.getElementById('scorecount').innerHTML = `${score}`;
}

if (mode === 0) {
    Score();
    Start();
} else {

}
