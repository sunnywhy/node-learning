module.exports = function (playerAction) {
    if(['rock', 'paper', 'scissors'].indexOf(playerAction) == -1) {
        throw new Error('invalid player action');
    }
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
        return 0;
    }else if((computerAction == 'rock' && playerAction == 'scissors')
        || (computerAction == 'scissors' && playerAction == 'paper')
        || (computerAction == 'paper' && playerAction == 'rock')) {
        console.log('You lose.');
        return -1;
    }else {
        console.log('You win.');
        return 1;
    }
}