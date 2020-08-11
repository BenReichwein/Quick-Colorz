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
    let randomColor = '#'+Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
}

//sets a random color of each table cell 
let colorArr = cells.map(elem => {
    return elem.style.backgroundColor = generateRandomColor()
})

// # of seconds
let timeLeft = 10;

let countdown = setInterval(() => {
    // timer is completed
    if (timeLeft < 0) {
        clearInterval(countdown);
        document.getElementById('countdown').innerHTML = "You are out of time!"
        // this is the end state
    } else {
        // set timer to timeLeft variable
        document.getElementById('countdown').innerHTML = timeLeft + " seconds remaining.";
    }
    timeLeft--;
}, 1000)
