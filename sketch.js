// globals
var canvas;
var canvasHeight = window.innerHeight;
var canvasWidth = window.innerWidth;

// setup function (called ONCE when the page first loads)
function setup() {
    // create canvas and append it to the page
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('parent');
}

// called when the window is resized
function windowResized() {
    // redefine the width and heights
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
}
// draw function (called 60 times per second)
function draw() {
    resizeCanvas(canvasWidth, canvasHeight); // resized canvas
}
