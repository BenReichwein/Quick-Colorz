//generates random color
function generateRandomColor() {
    let randomColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    return randomColor;
}