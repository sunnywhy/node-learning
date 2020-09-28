const geektime = require('./geektime');

geektime.on('newlession', ({price}) => {
    console.log('yeah!, new lesson!');
    if(price > 80) {
        console.log('too expensive');
    }
})