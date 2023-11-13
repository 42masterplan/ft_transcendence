const SCREEN_WIDTH = 430;
const SCREEN_HEIGHT = 600;
const PLAYER_WIDTH = 100;
const PLAYER_HEIGHT = 15;
const PLAYER_A_COLOR = 'rgba(217, 217, 217, 1)';
const PLAYER_B_COLOR = 'rgba(0, 133, 255, 1)';
const BACKGROUND_COLOR = 'rgba(15, 23, 42, 0.8)';
const BALL_RADIUS = 5;
const BALL_COLOR = 'white';
const BALL_SPEED = 5 / 2;
const BALL_VELOCITY = {x: 2.51 / 2, y: -4.32 / 2};
const PADDLE_OFFSET = SCREEN_WIDTH / 200;
const SCORE_LIMIT = 10;
const GAME_TIME_LIMIT = 120;

class Player {
  constructor(id, x, y, width, height, color, dx) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width || 100;
    this.height = height || 15;
    this.color = color || 'rgba(217, 217, 217, 1)';
    this.dx = dx || 0;
  }

  isACollided(ball) {
    const offsetX = ball.x - this.x + ball.radius;
    const offsetY = ball.y - this.y + ball.radius;
    console.log(
      offsetX < this.width + 4 &&
        offsetX > 0 &&
        offsetY <= 10 &&
        offsetY >= -10,
      "A's collision"
    );
    return (
      offsetX < this.width + 4 && offsetX > 0 && offsetY <= 10 && offsetY >= -10
    );
  }

  isBCollided(ball) {
    const offsetX = ball.x - this.x + ball.radius;
    const offsetY = this.y - ball.y + this.height + ball.radius;
    console.log(
      offsetX < this.width + 4 &&
        offsetX > 0 &&
        offsetY >= -10 &&
        offsetY <= 10,
      "B's collision"
    );
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
    ball.velocity.x = 5 * (ball.velocity.x / speed);
    ball.velocity.y = 5 * (ball.velocity.y / speed);
  }

  handleCollision(ball, now) {
    ball.lastCollision = now;
    const reflectedAngle = -Math.atan2(ball.velocity.y, ball.velocity.x);
    ball.velocity.x = Math.cos(reflectedAngle) * 5;
    ball.velocity.y = Math.sin(reflectedAngle) * 5;
    this.applySpin(ball);
  }

  draw() {
    this.c.beginPath();
    this.c.rect(this.x, this.y, this.width, this.height);
    this.c.fillStyle = this.color;
    this.c.fill();
  }
}

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
    players.push(
      new Player(
        socket.id,
        SCREEN_WIDTH / 2 - PLAYER_WIDTH / 2,
        flag ? SCREEN_HEIGHT - 45 : 30,
        0,
        PLAYER_WIDTH,
        PLAYER_HEIGHT,
        players.length === 0 ? PLAYER_A_COLOR : PLAYER_B_COLOR //A : B 첫 번째로 추가되는 플레이어가 A다
      )
    );
    flag = true;
    io.emit('updatePlayers', players);
    io.emit('updateBall', ball);
    socket.on('disconnect', (reason) => {
      console.log(reason);
      const index = players.findIndex((player) => player.id === socket.id);
      if (index === -1) return;
      players.splice(index, 1);
      //player will be deleted on backend but not frontend so we emit
      io.emit('updatePlayers', players);
      console.log('after deletion: ', players);
    });
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
    socket.on('updateBallPosition', () => {
      ball.x += ball.velocity.x;
      ball.y += ball.velocity.y;
    });
    socket.on('ballHitSideWalls', () => {
      ball.velocity.x *= -1;
    });
    socket.on('resetBall', (isA) => {
      ball.x = SCREEN_WIDTH / 2;
      ball.y = SCREEN_HEIGHT / 2;
      ball.velocity = {x: 0, y: 0};
      setTimeout(() => {
        x = isA ? players[0].x : players[1].x;
        y = isA ? players[0].y : players[1].y;
        let dx = x - SCREEN_WIDTH / 2;
        let dy = y - SCREEN_HEIGHT / 2;
        const speed = Math.sqrt(dx * dx + dy * dy);
        let ret_x = (dx / speed) * BALL_SPEED;
        let ret_y = (dy / speed) * BALL_SPEED;
        ball.velocity = {x: ret_x, y: ret_y};
        console.log(ball.velocity);
        io.emit('updateBall', ball);
      }, 3000);
    });
    socket.on('ballBounce', () => {
      const debouncingTime = 300;
      const now = Date.now();
      if (ball.lastCollision && now - ball.lastCollision < debouncingTime)
        return;
      if (players[0].isACollided(ball)) players[0].handleCollision(ball, now);
      else if (players[1].isBCollided(ball))
        players[1].handleCollision(ball, now);
    });
  });

  setInterval(() => {
    io.emit('updatePlayers', players);
    io.emit('updateBall', ball);
  }, 15);
  app.use(express.static('public'));
  app.get('*', (req, res) => {
    return nextHandler(req, res);
  });
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
