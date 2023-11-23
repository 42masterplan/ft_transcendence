class Player {
  constructor({
    id,
    x,
    y,
    width = PLAYER_WIDTH,
    height = PLAYER_HEIGHT,
    color,
    dx = 0
  }) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.dx = dx;
  }

  isACollided(ball) {
    const offsetX = ball.x - this.x + ball.radius;
    const offsetY = ball.y - this.y + ball.radius - this.height;
    return (
      offsetX < this.width + 4 && offsetX > 0 && offsetY <= 10 && offsetY >= -10
    );
  }

  isBCollided(ball) {
    const offsetX = ball.x - this.x + ball.radius;
    const offsetY = this.y - ball.y - ball.radius + this.height;
    return (
      offsetX < this.width + 4 && offsetX > 0 && offsetY >= -10 && offsetY <= 10
    );
  }

  applySpin(ball) {
    const spinFactor = 0.4;
    ball.velocity.x += this.dx * spinFactor;
    let speed = Math.sqrt(
      ball.velocity.x * ball.velocity.x + ball.velocity.y * ball.velocity.y
    );
    ball.velocity.x = BALL_SPEED * (ball.velocity.x / speed);
    ball.velocity.y = BALL_SPEED * (ball.velocity.y / speed);
    if (ball.velocity.x > 0.75) ball.velocity.x = 0.75;
    else if (ball.velocity.x < -0.75) ball.velocity.x = -0.75;
    speed = Math.sqrt(
      ball.velocity.x * ball.velocity.x + ball.velocity.y * ball.velocity.y
    );
    ball.velocity.x = BALL_SPEED * (ball.velocity.x / speed);
    ball.velocity.y = BALL_SPEED * (ball.velocity.y / speed);
  }

  handleCollision(ball, now) {
    ball.lastCollision = now;
    const reflectedAngle = -Math.atan2(ball.velocity.y, ball.velocity.x);
    ball.velocity.x = Math.cos(reflectedAngle) * BALL_SPEED;
    ball.velocity.y = Math.sin(reflectedAngle) * BALL_SPEED;
    this.applySpin(ball);
  }

  draw() {
    this.c.beginPath();
    this.c.rect(this.x, this.y, this.width, this.height);
    this.c.fillStyle = this.color;
    this.c.fill();
  }
}
// A's color is white, B's color is blue
// A is on the bottom, B is on the top
SCREEN_WIDTH = 400;
SCREEN_HEIGHT = 600; //screen ratio is 2:3
PLAYER_WIDTH = 100;
PLAYER_HEIGHT = 15;
PLAYER_A_COLOR = 'rgba(217, 217, 217, 1)';
PLAYER_B_COLOR = 'rgba(0, 133, 255, 1)';
BALL_RADIUS = 5;
BALL_COLOR = 'white';
BALL_SPEED = 5 / 3;
BALL_VELOCITY = {x: 1, y: 1};
PADDLE_OFFSET = SCREEN_WIDTH / 100;
SCORE_LIMIT = 10;
GAME_TIME_LIMIT = 180;
DEBOUNCINGTIME = 500;
RENDERING_RATE = 5;

const express = require('express');
const next = require('next');
const http = require('http');
const socketIO = require('socket.io');
const port = 4242;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({dev});
const nextHandler = nextApp.getRequestHandler();
const gameStates = {};

function createNewGameState(gameId) {
  return {
    gameId: gameId,
    ready: false,
    players: [
      //A
      new Player({
        id: null, // 플레이어의 소켓 ID
        x: SCREEN_WIDTH / 2 - PLAYER_WIDTH / 2,
        y: SCREEN_HEIGHT - 45,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
        color: PLAYER_A_COLOR
      }),
      //B
      new Player({
        id: null,
        x: SCREEN_WIDTH / 2 - PLAYER_WIDTH / 2,
        y: 30,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
        color: PLAYER_B_COLOR
      })
    ],
    ball: {
      x: SCREEN_WIDTH / 2,
      y: SCREEN_HEIGHT / 2,
      velocity: BALL_VELOCITY,
      radius: BALL_RADIUS,
      color: BALL_COLOR,
      lastCollision: 0
    },
    score: {
      playerA: 0,
      playerB: 0
    },
    time: GAME_TIME_LIMIT
  };
}
function resetBall(isA, state, io) {
  if (isA) state.score.playerA++;
  else state.score.playerB++;
  io.to(state.gameId).emit('updateScore', state.score);
  if (
    state.score.playerA === SCORE_LIMIT ||
    state.score.playerB === SCORE_LIMIT
  ) {
    io.to(state.gameId).emit('gameOver');
    return;
  }
  state.ball.x = SCREEN_WIDTH / 2;
  state.ball.y = SCREEN_HEIGHT / 2;
  state.ball.velocity = {x: 0, y: 0};
  setTimeout(() => {
    x = !isA
      ? state.players[0].x + PLAYER_WIDTH / 2
      : state.players[1].x + PLAYER_WIDTH / 2;
    y = !isA ? state.players[0].y : state.players[1].y;
    const dx = x - state.ball.x;
    const dy = y - state.ball.y;
    const speed = Math.sqrt(dx * dx + dy * dy);
    const ret_x = (dx / speed) * BALL_SPEED;
    const ret_y = (dy / speed) * BALL_SPEED;
    state.ball.velocity = {x: ret_x, y: ret_y};
    io.emit('updateBall', state.ball);
  }, 3000);
}
function updateGameState(state, io) {
  state.ball.x += state.ball.velocity.x;
  state.ball.y += state.ball.velocity.y;
  if (
    state.ball.x - state.ball.radius <= 1 ||
    state.ball.x + state.ball.radius >= SCREEN_WIDTH - 1
  )
    state.ball.velocity.x *= -1;
  else if (state.ball.y < 0) resetBall(true, state, io); // A 점수 획득
  else if (state.ball.y > SCREEN_HEIGHT) resetBall(false, state, io); // B 점수 획득
  if (
    state.players[0].isACollided(state.ball) ||
    state.players[1].isBCollided(state.ball)
  ) {
    const now = Date.now();
    if (
      state.ball.lastCollision &&
      now - state.ball.lastCollision < DEBOUNCINGTIME
    )
      return;
    if (state.players[0].isACollided(state.ball))
      state.players[0].handleCollision(state.ball, now);
    else if (state.players[1].isBCollided(state.ball))
      state.players[1].handleCollision(state.ball, now);
  }
}
nextApp.prepare().then(() => {
  const app = express();
  const server = http.createServer(app);
  const io = socketIO(server, {
    pingInterval: 2000, //need to check it this works -> do we need it?
    pingTimeout: 5000, //this as well
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  });
  //we should already have 'game key', which is the room id
  //but in this case, we will just use the number of connections as the room id
  let currentGameKey = 0;

  io.on('connection', (socket) => {
    socket.join(currentGameKey);
    socket.emit('joinedRoom', currentGameKey);
    if (!gameStates[currentGameKey]) {
      gameStates[currentGameKey] = createNewGameState(currentGameKey);
      return;
    }
    gameStates[currentGameKey].ready = true;
    currentGameKey++;
    socket.on('disconnect', (reason) => {
      console.log(reason);
      // find the game that the player was in
      const gameId = Object.keys(gameStates).find((id) => {
        const state = gameStates[id];
        return state.players.some((player) => player.id === socket.id);
      });
      if (!gameId) console.error('this should not happen');
      // if the game is not ready, delete the game
      if (!gameStates[gameId].ready) {
        delete gameStates[gameId];
        return;
      }
      // if player A disconnects, player B wins
      const state = gameStates[gameId];
      if (state.players[0].id === socket.id) {
        state.score.playerB = SCORE_LIMIT;
        io.to(gameId).emit('updateScore', state.score); // this should be sent first
        io.to(gameId).emit('gameOver');
      }
      // if player B disconnects, player A wins
      else if (state.players[1].id === socket.id) {
        state.score.playerA = SCORE_LIMIT;
        io.to(gameId).emit('updateScore', state.score);
        io.to(gameId).emit('gameOver');
      }
    });
    socket.on('keyDown', (keycode) => {
      // find the player that pressed the key
      const targetPlayer = Object.keys(gameStates).find((gameId) => {
        const state = gameStates[gameId];
        return state.players.find((player) => player.id === socket.id);
      });
      if (!targetPlayer) return;
      const isA = targetPlayer.color === PLAYER_A_COLOR;
      switch (keycode) {
        case 'a': {
          if (targetPlayer.x > 0) {
            targetPlayer.x -= PADDLE_OFFSET;
            targetPlayer.dx = -PADDLE_OFFSET;
          }
          break;
        }
        case 'd': {
          if (targetPlayer.x < SCREEN_WIDTH - targetPlayer.width) {
            targetPlayer.x += PADDLE_OFFSET;
            targetPlayer.dx = PADDLE_OFFSET;
          }
          break;
        }
        case 'w': {
          if (!isA && targetPlayer.y > 0) targetPlayer.y -= PADDLE_OFFSET / 2;
          else if (
            isA &&
            targetPlayer.y > (SCREEN_HEIGHT / 3) * 2 - targetPlayer.height
          )
            targetPlayer.y -= PADDLE_OFFSET / 2;
          break;
        }
        case 's': {
          if (
            !isA &&
            targetPlayer.y < SCREEN_HEIGHT / 3 - targetPlayer.height
          ) {
            targetPlayer.y += PADDLE_OFFSET / 2;
          } else if (
            isA &&
            targetPlayer.y < SCREEN_HEIGHT - targetPlayer.height
          )
            targetPlayer.y += PADDLE_OFFSET / 2;
          break;
        }
      }
    });
    socket.on('keyUp', () => {
      const targetPlayer = Object.keys(gameStates).find((gameId) => {
        const state = gameStates[gameId];
        return state.players.find((player) => player.id === socket.id);
      });
      if (!targetPlayer) return;
      targetPlayer.dx = 0;
    });
  });

  setInterval(() => {
    Object.keys(gameStates).forEach((gameId) => {
      const state = gameStates[gameId];
      if (!state.ready) return;
      updateGameState(state, io);
      io.to(gameId).emit('updatePlayers', state.players);
      io.to(gameId).emit('updateBall', state.ball);
    });
  }, RENDERING_RATE);

  setInterval(() => {
    Object.keys(gameStates).forEach((gameId) => {
      const state = gameStates[gameId];
      state.time--;
      if (!state.ready) return;
      if (state.time <= 0) {
        if (state.score.playerA > state.score.playerB)
          io.to(gameId).emit('gameOver');
        else if (state.score.playerA < state.score.playerB)
          io.to(gameId).emit('gameOver');
        //close the room
        io.socketsLeave(gameId);
        return;
      }
      io.to(gameId).emit('updateTime', state.time);
    });
  }, 1000);

  app.use(express.static('public'));
  app.get('*', (req, res) => {
    return nextHandler(req, res);
  });
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
