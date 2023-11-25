/**
 * @brief 백엔드에서 사용되는 플레이어 클래스입니다. 플레이어의 정보와 플레이어와 공의 상호작용 메소드를 포함합니다.
 * @details 플레이어의 정보는 플레이어의 위치, 크기, 색상, 속도 등을 포함합니다.
 * 플레이어와 공의 상호작용 메소드는 공과의 충돌 감지와 충돌 시 공의 반사각을 계산하는 메소드입니다.
 **/
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

  /**
   * @param {*} ball 충돌을 감지할 공입니다.
   * @returns 플레이어와 공이 충돌했는지 여부를 반환합니다.
   */
  isCollided(ball) {
    const offsetX = ball.x - this.x + ball.radius;
    if (this.color === PLAYER_A_COLOR) {
      const offsetY = ball.y - this.y + ball.radius - this.height;
      return (
        offsetX < this.width + 4 &&
        offsetX > 0 &&
        offsetY <= 10 &&
        offsetY >= -10
      );
    } else {
      const offsetY = this.y - ball.y - ball.radius + this.height;
      return (
        offsetX < this.width + 4 &&
        offsetX > 0 &&
        offsetY >= -10 &&
        offsetY <= 10
      );
    }
  }

  /**
   * @param {*} ball 충돌을 처리할 공입니다.
   * @param {*} now 현재 시간입니다.
   * @details 공의 마지막 충돌 시간을 현재 시간으로 업데이트하고 공의 반사각을 계산하여 적용합니다.
   * 스핀 적용 메소드를 호출합니다.
   */
  handleCollision(ball, now) {
    ball.lastCollision = now;
    const reflectedAngle = -Math.atan2(ball.velocity.y, ball.velocity.x);
    ball.velocity.x = Math.cos(reflectedAngle) * BALL_SPEED;
    ball.velocity.y = Math.sin(reflectedAngle) * BALL_SPEED;
    this.applySpin(ball);
  }

  /**
   * @param {*} ball 스핀을 적용할 공입니다.
   * @details 정의된 스핀 계수만큼의 스핀을 적용합니다. 속력은 보존됩니다.
   */
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
}

/*
  플레이어 A의 색상은 흰색, 플레이어 B의 색상은 파랑색입니다.
  플레이어 A는 아래쪽, 플레이어 B는 위쪽에 위치합니다.
  사용할 상수들을 정의합니다.
*/
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

/*
  next.js를 사용하여 프론트엔드 서버와 연결합니다.
  이 부분은 next.js에 맞게 수정해야 합니다.
*/
const express = require('express');
const next = require('next');
const http = require('http');
const socketIO = require('socket.io');
const port = 4242;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({dev});
const nextHandler = nextApp.getRequestHandler();
const gameStates = {};

/**
 * @brief 소켓룸에서 사용할 게임 상태를 생성합니다.
 * @param {*} gameId 소켓룸 ID입니다.
 * @returns 생성되어 초기화된 게임 상태를 반환합니다.
 */
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

/**
 * @brief 점수가 오르거나 시간이 초과되어 공을 초기화하는 메소드입니다.
 * @param {*} isA 점수를 획득한 플레이어가 플레이어 A인지 여부입니다.
 * @param {*} state 해당 게임 상태입니다.
 * @param {*} io 소켓 통신을 위한 인스턴스입니다.
 * @details 점수를 업데이트하고, 점수 제한에 도달하면 게임을 종료합니다.
 * 이벤트들을 소켓룸에 전송합니다.
 * 공의 위치를 화면 중앙으로 이동, 고정시키고 3초 후에 실점한 플레이어 방향으로 발사합니다.
 */
function resetBall(isA, state, io) {
  if (isA) state.score.playerA++;
  else state.score.playerB++;
  io.to(state.gameId).emit('updateScore', state);
  if (
    state.score.playerA === SCORE_LIMIT ||
    state.score.playerB === SCORE_LIMIT
  ) {
    io.to(state.gameId).emit('gameOver', state);
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
    io.to(state.gameId).emit('updateBall', state);
  }, 3000);
}

/**
 * @brief 게임 상태를 업데이트하는 메소드입니다.
 * @param {*} state 해당 게임 상태입니다.
 * @param {*} io 소켓 통신을 위한 인스턴스입니다.
 * @details 공의 위치를 업데이트하고, 벽에 부딪히면 반사각을 계산하여 적용합니다.
 * 플레이어와 충돌하면 충돌 시간을 업데이트하고 반사각을 계산하여 적용합니다.
 * 충돌 시간이 DEBOUNCINGTIME보다 작으면 충돌을 무시합니다. (무한 충돌 이벤트 발생 방지)
 * 충돌 시간을 업데이트합니다.
 */
function updateGameState(state, io) {
  // 현재 속도에 따라 공의 위치를 업데이트합니다.
  state.ball.x += state.ball.velocity.x;
  state.ball.y += state.ball.velocity.y;

  // 공이 벽에 부딪히면 반사각을 계산하여 적용합니다.
  if (
    state.ball.x - state.ball.radius <= 1 ||
    state.ball.x + state.ball.radius >= SCREEN_WIDTH - 1
  )
    state.ball.velocity.x *= -1;
  // 공이 화면 위 아래에 닿으면 점수를 획득하고 공을 초기화합니다.
  else if (state.ball.y < 0) resetBall(true, state, io); // A 점수 획득
  else if (state.ball.y > SCREEN_HEIGHT) resetBall(false, state, io); // B 점수 획득
  // 플레이어와 충돌하면 충돌 시간을 업데이트하고 반사각을 계산하여 적용합니다.
  // 충돌 시간이 DEBOUNCINGTIME보다 작으면 충돌을 무시합니다. (무한 충돌 이벤트 발생 방지)
  if (
    state.players[0].isCollided(state.ball) ||
    state.players[1].isCollided(state.ball)
  ) {
    const now = Date.now();
    if (
      state.ball.lastCollision &&
      now - state.ball.lastCollision < DEBOUNCINGTIME
    )
      return;
    if (state.players[0].isCollided(state.ball))
      state.players[0].handleCollision(state.ball, now);
    else if (state.players[1].isCollided(state.ball))
      state.players[1].handleCollision(state.ball, now);
  }
}

/**
 * @brief 백엔드 서버를 실행합니다.
 * @details next.js를 사용하여 프론트엔드 서버와 연결합니다.
 * 이 부분은 next.js에 맞게 수정할 수 있습니다. 전체적인 흐름 작성할 것.
 */
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
      gameStates[currentGameKey].players[0].id = socket.id;
    } else {
      //DO NOT RETURN BEFORE SOCKET.ON SETTING !!!!
      gameStates[currentGameKey].players[1].id = socket.id;
      gameStates[currentGameKey].ready = true;
      currentGameKey++;
    }
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
        io.to(state.gameId).emit('updateScore', state); // this should be sent first
        io.to(state.gameId).emit('gameOver', state);
      }
      // if player B disconnects, player A wins
      else if (state.players[1].id === socket.id) {
        state.score.playerA = SCORE_LIMIT;
        io.to(state.gameId).emit('updateScore', state);
        io.to(state.gameId).emit('gameOver', state);
      }
    });
    socket.on('keyDown', (keycode) => {
      // find the player that pressed the key
      const gameId = Object.keys(gameStates).find((id) => {
        const state = gameStates[id];
        return state.players.some((player) => player.id === socket.id);
      });
      const targetPlayer = gameStates[gameId].players.find(
        (player) => player.id === socket.id
      );
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
      const gameId = Object.keys(gameStates).find((id) => {
        const state = gameStates[id];
        return state.players.some((player) => player.id === socket.id);
      });
      const targetPlayer = gameStates[gameId].players.find(
        (player) => player.id === socket.id
      );
      if (!targetPlayer) return;
      targetPlayer.dx = 0;
    });
  });

  //game rendering
  setInterval(() => {
    Object.keys(gameStates).forEach((gameId) => {
      const state = gameStates[gameId];
      if (!state.ready) return;
      updateGameState(state, io);
      io.to(state.gameId).emit('updatePlayers', state);
      io.to(state.gameId).emit('updateBall', state);
    });
  }, RENDERING_RATE);

  //game timer
  setInterval(() => {
    Object.keys(gameStates).forEach((gameId) => {
      const state = gameStates[gameId];
      state.time--;
      if (!state.ready) return;
      if (state.time <= 0) {
        if (state.score.playerA > state.score.playerB)
          io.to(state.gameId).emit('gameOver', state);
        else if (state.score.playerA < state.score.playerB)
          io.to(state.gameId).emit('gameOver', state);
        //close the room
        io.socketsLeave(gameId);
        return;
      }
      io.to(state.gameId).emit('updateTime', state);
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
