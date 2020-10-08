module.exports = function (playerAction) {
    if (['rock', 'paper', 'scissors'].indexOf(playerAction) == -1) {
        throw new Error('invalid playerAction');
    }
    // 计算电脑出的东西
    let computerAction;
    const random = Math.random() * 3;
    if (random < 1) {
        computerAction = 'rock'

    } else if (random > 2) {
        computerAction = 'paper'

    } else {
        computerAction = 'scissors'

    }

    if (computerAction == playerAction) {
        return 0;

    } else if (
        (computerAction == 'rock' && playerAction == 'scissors') ||
        (computerAction == 'scissors' && playerAction == 'paper') ||
        (computerAction == 'paper' && playerAction == 'rock')
    ) {
        return -1;

    } else {
        return 1;
    }
}