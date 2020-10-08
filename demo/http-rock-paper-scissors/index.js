const querystring = require('querystring');
const http = require('http');
const url = require('url');
const fs = require('fs');

const game = require('./game');

let playerWon = 0;
let playerLastAction = null;
let sameCount = 0;

http.createServer(function (request, response){
    //use model "url", convert the request url
    //split into protocol://host:port/pathname?query
    const parseUrl = url.parse(request.url);

    //all http requests, will go into this method
    //so we need to check the request url and do the logic accordingly

    if(parseUrl.pathname == '/favicon.ico') {
        //request the browser icon, just return 200
        response.writeHead(200);
        response.end();
        return;
    }

    if(parseUrl.pathname == '/game') {
        //game request, like: http://localhost:3000/game?action=rock
        //get the action from query
        const query = querystring.parse(parseUrl.query);
        const playerAction = query.action;

        //if player won 3 times or player is cheating (sameCount = 9)
        if(playerWon >= 3 || sameCount == 9) {
            response.writeHead(500);
            response.end('I will not play with you again!');
            return;
        }

        if(playerLastAction && playerLastAction == playerAction) {
            sameCount++;
        }else{
            sameCount = 0;
        }
        playerLastAction = playerAction;

        //if player action keep same for 3 times, computer think player is cheating
        if(sameCount >= 3) {
            response.writeHead(400);
            response.end('You are cheating!');
            sameCount = 9;
            return;
        }

        const gameResult = game(playerAction);
        //set head to 200
        response.writeHead(200);
        if(gameResult == 0) {
            response.end('Draw!');
        }else if(gameResult == 1) {
            response.end('You win!');
            playerWon++;
        }else {
            response.end('You lose!');
        }
    }

    //if access the "root" path, read the game page and display
    if(parseUrl.pathname == '/') {
        fs.createReadStream(__dirname + '/index.html').pipe(response);
    }
}).listen(3000);