const game = require('./game');

let winCount = 0;

//get standard input
process.stdin.on('data', (buffer) => {
    const action = buffer.toString().trim();
    const result = game(action);
    if(result == 1) {
        winCount ++;
        if(winCount == 3) {
            console.log("You are too good. I will stop playing with you.");
            process.exit();
        }
    }
})