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

function resetBall(isA, io) {
  if (isA) score.playerA++;
  else score.playerB++;
  io.emit('updateScore', score);
  ball.x = SCREEN_WIDTH / 2;
  ball.y = SCREEN_HEIGHT / 2;
  ball.velocity = {x: 0, y: 0};
  setTimeout(() => {
    x = !isA
      ? players[0].x + PLAYER_WIDTH / 2
      : players[1].x + PLAYER_WIDTH / 2;
    y = !isA ? players[0].y : players[1].y;
    const dx = x - ball.x;
    const dy = y - ball.y;
    const speed = Math.sqrt(dx * dx + dy * dy);
    const ret_x = (dx / speed) * BALL_SPEED;
    const ret_y = (dy / speed) * BALL_SPEED;
    ball.velocity = {x: ret_x, y: ret_y};
    io.emit('updateBall', ball);
  }, 3000);
}
function createNewGameState(gameId) {
  return {
    gameId: gameId,
    players: [
      Player({
        id: null, // 플레이어의 소켓 ID
        x: SCREEN_WIDTH / 2 - PLAYER_WIDTH / 2,
        y: SCREEN_HEIGHT - 45,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
        color: PLAYER_A_COLOR
      }),
      // 플레이어 B의 초기 상태
      Player({
        id: null, // 플레이어의 소켓 ID
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
    }
  };
}
function updateGameState(state) {
  // 플레이어가 2명 미만인 경우 업데이트 중지
  if (state.players.length < 2) return;

  // 볼의 위치 업데이트
  state.ball.x += state.ball.velocity.x;
  state.ball.y += state.ball.velocity.y;

  // 볼의 충돌 처리
  if (
    state.ball.x - state.ball.radius <= 1 ||
    state.ball.x + state.ball.radius >= SCREEN_WIDTH - 1
  )
    state.ball.velocity.x *= -1;
  else if (state.ball.y < 0) resetBall(true, state); // A 점수 획득
  else if (state.ball.y > SCREEN_HEIGHT) resetBall(false, state); // B 점수 획득

  // 플레이어와 볼의 충돌 처리
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
  let firstConnection = true;
  let time = GAME_TIME_LIMIT;
  const io = socketIO(server, {
    pingInterval: 2000, //need to check it this works -> do we need it?
    pingTimeout: 5000, //this as well
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  });
  io.on('connection', (socket) => {
    socket.on('joinGame', (gameId) => {
      socket.join(gameId);
      if (!gameStates[gameId]) gameStates[gameId] = createNewGameState(gameId);
      io.to(gameId).emit('gameState', gameStates[gameId]);
    });
    firstConnection = false;
    socket.on('disconnect', (reason) => {
      console.log(reason);
      if (players[0].color === PLAYER_A_COLOR) score.playerA = SCORE_LIMIT;
      else score.playerB = SCORE_LIMIT;
      socket.broadcast.emit('updateScore', score);
    });
    socket.on('keyDown', (keycode) => {
      const targetPlayer = players.find((player) => player.id === socket.id);
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
      const targetPlayer = players.find((player) => player.id === socket.id);
      if (!targetPlayer) return;
      targetPlayer.dx = 0;
    });
  });

  setInterval(() => {
    Object.keys(gameStates).forEach((gameId) => {
      const state = gameStates[gameId];
      updateGameState(state); // 게임 상태 업데이트
      // 방별로 상태 업데이트 이벤트 방송
      io.to(gameId).emit('updatePlayers', state.players);
      io.to(gameId).emit('updateBall', state.ball);
    });

    if (players.length < 2) return;
    ball.x += ball.velocity.x;
    ball.y += ball.velocity.y;
    io.emit('updatePlayers', players);
    io.emit('updateBall', ball);
    if (ball.x - ball.radius <= 1 || ball.x + ball.radius >= SCREEN_WIDTH - 1)
      ball.velocity.x *= -1;
    else if (ball.y < 0) resetBall(true, io); //A scored
    else if (ball.y > SCREEN_HEIGHT) resetBall(false, io); //B scored
    if (players[0].isACollided(ball) || players[1].isBCollided(ball)) {
      const now = Date.now();
      if (ball.lastCollision && now - ball.lastCollision < DEBOUNCINGTIME)
        return;
      if (players[0].isACollided(ball)) players[0].handleCollision(ball, now);
      else if (players[1].isBCollided(ball))
        players[1].handleCollision(ball, now);
    }
  }, RENDERING_RATE);
  setInterval(() => {
    io.emit('updateTime', time);
    time -= 1;
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
