let playerAction = process.argv[process.argv.length - 1];
console.log(playerAction);
if(playerAction != 'rock' && playerAction != 'paper' && playerAction != 'scissors') {
    console.log('please type one of the correct command: [rock, paper, scissors]');
}else {
    let computerAction;
    let random = Math.random() * 3;
    if(random < 1) {
        computerAction = 'rock';
        console.log('computer -- rock');
    }else if(random < 2) {
        computerAction = 'paper';
        console.log('computer -- paper');
    }else {
        computerAction = 'scissors';
        console.log('computer -- scissors');
    }

    if(playerAction == computerAction) {
        console.log('Draw');
    }else if((computerAction == 'rock' && playerAction == 'scissors')
        || (computerAction == 'scissors' && playerAction == 'paper')
        || (computerAction == 'paper' && playerAction == 'rock')) {
        console.log('You lose.');
    }else {
        console.log('You win.');
    }
}