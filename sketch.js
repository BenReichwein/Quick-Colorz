// Width and Height
let width = 5;
let height = 5;
let cells = [];
let score = -1;
let mode = 0;
// # of seconds
let timeLeft = 9;
const userScore = document.getElementById('scorecount')
const playerBoard = document.getElementById('board')

// playerBoard.addEventListener('click', () => {
//     console.log(userScore.innerHTML)
    
// })



function updateTable (width, height) {
    if(cells.length) {
        let tableBody = document.getElementsByTagName('tbody')
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
}



let countdown = setInterval(() => {
    // timer is completed
    if (timeLeft <= 0) {
        clearInterval(countdown);
        document.getElementById('countdown').innerHTML = "You are out of time!"
        // this is the end state
        // alert('You Lost')
        mode++;
    } else {
        // set timer to timeLeft variable
        document.getElementById('countdown').innerHTML = `${timeLeft} seconds remaining.`;
    }
    timeLeft--;
}, 1000)

function round() {
    if(timeLeft >= 1) {
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
