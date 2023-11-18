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
    const speed = Math.sqrt(
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
const SCREEN_WIDTH = 430;
const SCREEN_HEIGHT = 600;
const PLAYER_WIDTH = 100;
const PLAYER_HEIGHT = 15;
const PLAYER_A_COLOR = 'rgba(217, 217, 217, 1)';
const PLAYER_B_COLOR = 'rgba(0, 133, 255, 1)';
const BACKGROUND_COLOR = 'rgba(15, 23, 42, 0.8)';
const BALL_RADIUS = 5;
const BALL_COLOR = 'white';
const BALL_SPEED = 5 / 3;
const BALL_VELOCITY = {x: 1, y: 1};
const PADDLE_OFFSET = SCREEN_WIDTH / 100;
const SCORE_LIMIT = 10;
const GAME_TIME_LIMIT = 180;
const DEBOUNCINGTIME = 500;
const RENDERING_RATE = 5;

const express = require('express');
const next = require('next');
const http = require('http');
const socketIO = require('socket.io');
const port = 4242;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({dev});
const nextHandler = nextApp.getRequestHandler();
const players = [];
const ball = {
  x: SCREEN_WIDTH / 2,
  y: SCREEN_HEIGHT / 2,
  velocity: BALL_VELOCITY,
  radius: BALL_RADIUS,
  color: BALL_COLOR,
  lastCollision: 0
};
const score = {
  playerA: 0,
  playerB: 0
};
function resetBall(isA, io) {
  if (isA) score.playerA++;
  else score.playerB++;
  io.emit('updateScore', score);
  ball.x = SCREEN_WIDTH / 2;
  ball.y = SCREEN_HEIGHT / 2;
  ball.velocity = {x: 0, y: 0};
  setTimeout(() => {
    x = isA ? players[0].x + PLAYER_WIDTH / 2 : players[1].x + PLAYER_WIDTH / 2;
    y = isA ? players[0].y : players[1].y;
    const dx = x - ball.x;
    const dy = y - ball.y;
    const speed = Math.sqrt(dx * dx + dy * dy);
    const ret_x = (dx / speed) * BALL_SPEED;
    const ret_y = (dy / speed) * BALL_SPEED;
    ball.velocity = {x: ret_x, y: ret_y};
    io.emit('updateBall', ball);
  }, 3000);
}
nextApp.prepare().then(() => {
  const app = express();
  const server = http.createServer(app);
  let firstConnection = true;
  let time = GAME_TIME_LIMIT;
  const io = socketIO(server, {
    pingInterval: 2000, //need to check it this thing actually works
    pingTimeout: 5000, //this as well
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  });
  io.on('connection', (socket) => {
    players.push(
      new Player({
        id: socket.id,
        x: SCREEN_WIDTH / 2 - PLAYER_WIDTH / 2,
        y: firstConnection ? SCREEN_HEIGHT - 45 : 30,
        color: firstConnection ? PLAYER_A_COLOR : PLAYER_B_COLOR //A : B 첫 번째로 추가되는 플레이어가 A다
      })
    );
    firstConnection = false;
    io.emit('updatePlayers', players);
    io.emit('updateBall', ball);
    //if player disconnects, opponent wins
    socket.on('disconnect', (reason) => {
      console.log(reason);
      const index = players.findIndex((player) => player.id === socket.id);
      if (index === -1) return;
      players.splice(index, 1);
      if (players[0].color === PLAYER_A_COLOR) score.playerA = SCORE_LIMIT;
      else score.playerB = SCORE_LIMIT;
      socket.broadcast.emit('updateScore', score);
      exit();
    });
    socket.on('keyDown', (keycode) => {
      const targetPlayer = players.find((player) => player.id === socket.id);
      if (!targetPlayer) return;
      const isA = targetPlayer.color !== PLAYER_A_COLOR;
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
          if (isA && targetPlayer.y > 0) targetPlayer.y -= PADDLE_OFFSET / 2;
          else if (
            targetPlayer.y >
            (SCREEN_HEIGHT / 3) * 2 - targetPlayer.height
          )
            targetPlayer.y -= PADDLE_OFFSET / 2;
          break;
        }
        case 's': {
          if (isA && targetPlayer.y < SCREEN_HEIGHT / 3 - targetPlayer.height) {
            targetPlayer.y += PADDLE_OFFSET / 2;
          } else if (
            !isA &&
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
    if (players.length < 2) return;
    ball.x += ball.velocity.x;
    ball.y += ball.velocity.y;
    io.emit('updatePlayers', players);
    io.emit('updateBall', ball);
    if (ball.x - ball.radius <= 5 || ball.x + ball.radius >= SCREEN_WIDTH - 5)
      ball.velocity.x *= -1;
    else if (ball.y < 0) resetBall(false, io);
    else if (ball.y > SCREEN_HEIGHT) resetBall(true, io);
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
