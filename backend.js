const SCREEN_WIDTH = 430;
const SCREEN_HEIGHT = 600;
const PLAYER_WIDTH = 100;
const PLAYER_HEIGHT = 15;
const PLAYER_A_COLOR = 'rgba(217, 217, 217, 1)';
const PLAYER_B_COLOR = 'rgba(0, 133, 255, 1)';
const BACKGROUND_COLOR = 'rgba(15, 23, 42, 0.8)';
const BALL_RADIUS = 5;
const BALL_COLOR = 'white';
const BALL_SPEED = 5;
const BALL_VELOCITY = {x: 2.51, y: -4.32};
const PADDLE_OFFSET = SCREEN_WIDTH / 100;
const SCORE_LIMIT = 10;
const GAME_TIME_LIMIT = 120;

const express = require('express');
const next = require('next');
const http = require('http');
const socketIO = require('socket.io');
const port = 4242;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({dev});
const nextHandler = nextApp.getRequestHandler();
const players = [];

nextApp.prepare().then(() => {
  console.log('launched');
  const app = express();
  const server = http.createServer(app);
  let flag = false;
  const io = socketIO(server, {
    pingInterval: 2000,
    pingTimeout: 5000,
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  });
  io.on('connection', (socket) => {
    const player = {
      id: socket.id,
      x: SCREEN_WIDTH / 2 - PLAYER_WIDTH / 2,
      y: flag ? SCREEN_HEIGHT - 45 : 30,
      dx: 0,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
      color: players.length === 0 ? PLAYER_A_COLOR : PLAYER_B_COLOR //A : B 첫 번째로 추가되는 플레이어가 A다
    };
    players.push(player);
    flag = true;
    io.emit('updatePlayers', players);

    socket.on('disconnect', (reason) => {
      console.log(reason);
      const index = players.findIndex((player) => player.id === socket.id);
      if (index === -1) return;
      players.splice(index, 1);
      //player will be deleted on backend but not frontend so we emit
      io.emit('updatePlayers', players);
      console.log('after deletion: ', players);
    });
    //if we emit everytime a player moves, it will be too much traffic so we use ticker
    socket.on('keyDown', (keycode) => {
      const targetPlayer = players.find((player) => player.id === socket.id);
      if (!targetPlayer) return;
      const isA = targetPlayer.color === PLAYER_A_COLOR;
      switch (keycode) {
        case 'a': {
          if (targetPlayer.x > 0) {
            targetPlayer.x -= PADDLE_OFFSET;
            targetPlayer.dx = PADDLE_OFFSET;
            break;
          }
        }
        case 'd': {
          if (targetPlayer.x < SCREEN_WIDTH - targetPlayer.width) {
            targetPlayer.x += PADDLE_OFFSET;
            targetPlayer.dx = PADDLE_OFFSET;
          }
          break;
        }
        case 'w': {
          if (isA && targetPlayer.y > 0) targetPlayer.y -= PADDLE_OFFSET / 2;
          else if (
            targetPlayer.y >
            (SCREEN_HEIGHT / 3) * 2 - targetPlayer.height
          )
            targetPlayer.y -= PADDLE_OFFSET / 2;
          break;
        }
        case 's': {
          if (isA) {
            console.log('im a');
            console.log(
              targetPlayer.y,
              targetPlayer.y < SCREEN_HEIGHT / 3 - targetPlayer.height
            );
          } else {
            console.log('im b');
          }
          if (isA && targetPlayer.y < SCREEN_HEIGHT / 3 - targetPlayer.height)
            targetPlayer.y += PADDLE_OFFSET / 2;
          else if (!isA && targetPlayer.y < SCREEN_HEIGHT - targetPlayer.height)
            targetPlayer.y += PADDLE_OFFSET / 2;
          break;
        }
      }
    });
    socket.on('keyUp', () => {
      const targetPlayer = players.find((player) => player.id === socket.id);
      if (!targetPlayer) return;
      targetPlayer.dx = 0;
    });
  });

  setInterval(() => {
    io.emit('updatePlayers', players);
  }, 15);
  //this creates 66.6666 frames per second its valve's standard

  app.use(express.static('public'));
  app.get('*', (req, res) => {
    return nextHandler(req, res);
  });
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
