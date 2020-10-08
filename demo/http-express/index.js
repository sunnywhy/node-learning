const express = require('express');
const fs = require('fs');
const game = require('./game');

//if player won more than 3 times, all following request return 500
let playerWonCount = 0;
//player last action
let playerLastAction = null;
//count for player action always same
let sameCount = 0;

const app = express();

//.get means http method = GET, it also support POST/PUT etc. good for REST API
app.get('/favicon.ico', function (request, response){
    //status(200) to replace "writeHead(200)" and "end()"
    response.status(200);
});

app.get('/game',
    function (request, response, next){
        //if player won 3 times or player is cheating (sameCount = 9)
        if(playerWonCount >= 3 || sameCount == 9) {
            response.status(500);
            response.send('I will not play with you again!');
            return;
        }

        //use "next" to execute the following middlewares
        next();

        //after following middlewares, back to here to execute
        if(response.playerWon){
            playerWonCount++;
        }
    },
    function (request, response, next) {
        //express will help us to process "query"
        const query = request.query;
        const playerAction = query.action;

        if(!playerAction){
            response.status(400);
            response.send();
            return;
        }

        //if player action keep same for 3 times, computer think player is cheating
        if(playerLastAction == playerAction) {
            sameCount++;
            if(sameCount >= 3) {
                response.status(400);
                response.send('You are cheating!');
                sameCount = 9;
                return;
            }
        }else {
            sameCount = 0;
        }
        playerLastAction = playerAction;

        //send "playerAction" to next function
        response.playerAction = playerAction;
        next();
    },
    function (request, response) {
        const playerAction = response.playerAction;
        const result = game(playerAction);

        //if here use setTimeout(()=>{}, 500); will cause Onion Model failed
        //because playerWon is not assigned in middleware's event loop
        response.status(200);
        if(result == 0) {
            response.send('Draw!');
        }else if(result == 1) {
            response.send('You win!');
            response.playerWon = true;
        }else {
            response.send('You lose!');
        }
    }
);

app.get('/', function (request, response){
    //send will check the input type, "text" will convert to "text/html"
    //"buffer" will become download
    response.send(fs.readFileSync(__dirname + '/index.html', 'utf-8'));
});

app.listen(3000);
