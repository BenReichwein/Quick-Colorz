//sets height and width of table cells
const width = 5;
const height = 5;
const cells = [];

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

//sets a random color of each table cell 
let colorArr = cells.map(elem => {
    elem.addEventListener('mousedown', () => {
        if(elem.style.backgroundColor === document.getElementById('color').style.backgroundColor) {
            round()
        }
    })
    return elem.style.backgroundColor = generateRandomColor()
})
console.log(colorArr)

let randomColorLevel = Math.floor(Math.random() * colorArr.length)
console.log(randomColorLevel)
document.getElementById('color').style.backgroundColor = colorArr[randomColorLevel]
// document.getElementById('color').innerHTML = colorArr[randomColorLevel]


// # of seconds
let timeLeft = 10;

let countdown = setInterval(() => {
    // timer is completed
    if (timeLeft <= 0) {
        clearInterval(countdown);
        document.getElementById('countdown').innerHTML = "You are out of time!"
        // this is the end state
        alert('You Lost')
        location.reload();
    } else {
        // set timer to timeLeft variable
        document.getElementById('countdown').innerHTML = `${timeLeft} seconds remaining.`;
    }
    timeLeft--;
}, 1000)

function round() {
     if(timeLeft >= 1) {
        alert('Winner')
        location.reload();
     }
}