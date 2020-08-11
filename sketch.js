// # of seconds
let timeLeft = 10;

let countdown = setInterval(() => {
    // timer is completed
    if (timeLeft <= 0) {
        clearInterval(countdown);
        // this is the end state
    } else {
        // set timer to timeLeft variable
        document.getElementById('countdown').innerHTML = timeLeft + " seconds remaining.";
    }
    timeLeft--;
}, 1000)

