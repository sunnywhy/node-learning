const fs = require('fs');
const game = require('./game');
const koa = require('koa');
const mount = require('koa-mount');

//if player won more than 3 times, all following request return 500
let playerWonCount = 0;
//player last action
let playerLastAction = null;
//count for player action always same
let sameCount = 0;

const app = new koa();

app.use(
    mount('/favicon.ico', function (ctx){
        //koa has more detail functions to handle response
        //because koa use async function as the middleware
        //so koa can wait all the middlewares finish first, then handle return value
        ctx.status = 200;
    })
);

const gameKoa = new koa();
app.use(
    mount('/game', gameKoa)
);
gameKoa.use(
  async function (ctx, next) {
      if(playerWonCount >= 3) {
          ctx.status = 500;
          ctx.body = 'I will not play with you anymore!';
          return;
      }

      await next();

      //get a better onion model
      if(ctx.playerWon) {
          playerWonCount++;
      }
  }
);
gameKoa.use(
  async function(ctx, next) {
      const query = ctx.query;
      const playerAction = query.action;
      if(!playerAction){
          ctx.status = 400;
          return;
      }

      if (sameCount == 9) {
          ctx.status = 500;
          ctx.body = 'I will not play again！';
          return;
      }
      if(playerLastAction == playerAction) {
          sameCount++;
          if(sameCount >= 3) {
              ctx.status = 400;
              ctx.body = 'You are cheating!';
              sameCount = 9;
              return;
          }
      }else {
          sameCount = 0;
      }
      playerLastAction = playerAction;

      //send "playerAction" to next function
      ctx.playerAction = playerAction;

      await next();
  }
);
gameKoa.use(
    async function (ctx) {
        const playerAction = ctx.playerAction;
        const result = game(playerAction);
        //for any operation needs to finish in the main workflow, have to use await
        //otherwise koa will return the response in the current event loop
        await new Promise(resolve => {
            setTimeout(() => {
                ctx.status = 200;
                if(result == 0) {
                    ctx.body = 'Draw!';
                }else if(result == 1) {
                    ctx.body = 'You win!';
                    ctx.playerWon = true;
                }else {
                    ctx.body = 'You lose!';
                }
                resolve();
            }, 500);
        });
    }
);

app.use(
    mount('/', function (ctx) {
        ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8');
    })
);

app.listen(3000);
