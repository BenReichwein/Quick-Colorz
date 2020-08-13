// Width and Height
const width = 5;
const height = 5;
const cells = [];
let score = -1;
let timeLeft = 10;

// 0 is idle state
// 1 is playing state
// 2 is losing state
// 3 is winning state
let mode = 0;

//creates table rows and columns based on width and height
const table = document.createElement("tbody");
for (let h = 0; h < height; h++) {
    const tr = document.createElement("tr");
    for (let w = 0; w < width; w++) {
        const td = document.createElement("td");
        td.dataset.row = h;
        td.dataset.col = w;
        cells.push(td);
        tr.append(td);
    }
    table.append(tr);
}
document.getElementById("board").append(table);

//generates random color
function generateRandomColor() {
    let randomColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    return randomColor;
}

function startTimer() {
    // # of seconds
    timeLeft = 10;
    
    // make sure that the user is in the playing state before the countdown starts
    if (mode === 1) {
        let countdown = setInterval(() => {
            // timer is completed
            if (timeLeft <= 0) {
                clearInterval(countdown);
                document.getElementById('countdown').innerHTML = "You are out of time!"
                reset();
            } else {
                // set timer to timeLeft variable
                document.getElementById('countdown').innerHTML = timeLeft;
            }
            timeLeft--;
        }, 1000)
    }
}

function Start() {
    mode = 1;
    //sets a random color of each table cell
    let colorArr = cells.map(elem => {
        elem.addEventListener('mousedown', () => {
            if(elem.style.backgroundColor === document.getElementById('color').style.backgroundColor) {
                document.getElementById('countdown').innerHTML = "You won! +1 point"
                Score();
                return;
            }
        })
        return elem.style.backgroundColor = generateRandomColor()
    })


    let randomColorLevel = Math.floor(Math.random() * colorArr.length)

    document.getElementById('color').style.backgroundColor = colorArr[randomColorLevel]
    startTimer()
}

function reset() {
    mode = 0;

    // clear colorArr
    colorArr = [];

    // remove color from colorToFind block
    document.getElementById('color').style.backgroundColor = "";

    // remove color from cells
    cells.map(elem => {
        elem.style.backgroundColor = "";
    })

    document.getElementById('countdown').innerHTML = "You lost! Press start to play again!";

    document.getElementById('startBtn').addEventListener('click', function() {
        Start();
    })
}

function round() {
    if(timeLeft >= 1) {
        alert('Winner')
        Score();
        Start();
        timeLeft = 10;
    }
}

function Score() {
    mode = 0;

    score++;

    document.getElementById('scorecount').innerHTML = `Score: ${score}`;

    document.getElementById('countdown').innerHTML = "You won! Press start to play again!"

    document.getElementById('startBtn').addEventListener('click', function() {
        Start();
    })
}

if (mode === 0) {
    document.getElementById('startBtn').addEventListener('click', function() {
        Start();
    })
// losing state
} else if (mode === 2) {
    reset();
// winning state
} else if (mode === 3) {
    document.getElementById('countdown').innerHTML = "You won! +1 point"
    mode = 0;
}

