// Width and Height
const width = 5;
const height = 5;
const cells = [];
let score = -1;
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
    let randomColor = '#'+Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
}
function Start() {
    //sets a random color of each table cell
    let colorArr = cells.map(elem => {
        elem.addEventListener('mousedown', () => {
            if(elem.style.backgroundColor === document.getElementById('color').style.backgroundColor) {
                round()
            }
        })
        return elem.style.backgroundColor = generateRandomColor()
    })


    let randomColorLevel = Math.floor(Math.random() * colorArr.length)

    document.getElementById('color').style.backgroundColor = colorArr[randomColorLevel]
    document.getElementById('color').innerHTML = colorArr[randomColorLevel]
}


// # of seconds
let timeLeft = 10;

let countdown = setInterval(() => {
    // timer is completed
    if (timeLeft <= 0) {
        clearInterval(countdown);
        document.getElementById('countdown').innerHTML = "You are out of time!"
        // this is the end state
        alert('You Lost')
        mode++;
    } else {
        // set timer to timeLeft variable
        document.getElementById('countdown').innerHTML = `${timeLeft} seconds remaining.`;
    }
    timeLeft--;
}, 1000)

function round() {
    if(timeLeft >= 1) {
        alert('Winner')
        Score();
        Start();
        timeLeft = 10;
    }
}

function Score() {
    score++;
    document.getElementById('scorecount').innerHTML = `Score: ${score}`;
}

if (mode === 0) {
    Score();
    Start();
} else {
    
}
