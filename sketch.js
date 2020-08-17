// Width and Height
let width = 5;
let height = 5;
let cells = [];
let score = -1;
let mode = 0;
let multOfFiveCount = 0;
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

function updateTable(width, height) {
    if (cells.length) {
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
            if (elem.style.backgroundColor === document.getElementById('color').style.backgroundColor && timeLeft >= 1) {
                if (multOfFiveCount == 5) {
                    multOfFiveCount = 0;
                    width++;
                    height++;
                    updateTable(width, height)
                }
                round();
            }
        })
        return elem.style.backgroundColor = generateRandomColor()
    })
    let randomColorIndex = Math.floor(Math.random() * colorArr.length)
    document.getElementById('color').style.backgroundColor = colorArr[randomColorIndex]
    for (elem of cells) {
        if (elem.style.backgroundColor === hexToRgb(colorArr[randomColorIndex])) {
            finalColor = elem
        }
    }
}

const startBtn = document.getElementById('startBtn')
startBtn.addEventListener('click', () => {
    reset();
    return false
})

function timer() {
    return setInterval(() => {
        // timer is completed
        if (timeLeft <= 0) {
            clearInterval(countdown);
            document.getElementById('countdown').innerHTML = "You are out of time!"
            finalColor.classList.add('finalColor');
            // alert(`Time is up. You scored ${score}`)
            mode++;
        } else {
            // set timer to timeLeft variable
            document.getElementById('countdown').innerHTML = `${timeLeft} seconds remaining.`;
        }
        timeLeft--;
    }, 1000)
}
let countdown = timer();

function reset() {
    width = 5;
    height = 5;
    updateTable(width, height);
    Start();
    timeLeft = 10;
    clearInterval(countdown);
    countdown = timer();
    document.getElementById('countdown').innerHTML = `${timeLeft} seconds remaining.`;
    score = -1;
    Score();
}

const audio = document.getElementById('audio')
function playAudio() {
    audio.volume = 0.2
    audio.play()
}

function round() {
    if (timeLeft >= 1) {
        timeLeft = 10;
        playAudio()
        Score();
        Start();
    }
}

function Score() {
    score++;
    multOfFiveCount++;
    document.getElementById('scorecount').innerHTML = `${score}`;
}

if (mode === 0) {
    Score();
    Start();
} else {

}
