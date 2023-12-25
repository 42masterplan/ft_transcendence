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
// ball velocity's speed is 5
BALL_VELOCITY = {x: 1.1785, y: 1.1785};
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
 * @param {*} roomId 소켓룸 ID입니다.
 * @returns 생성되어 초기화된 게임 상태를 반환합니다.
 */
function createNewGameState(roomId) {
  return {
    roomId: roomId,
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
    time: GAME_TIME_LIMIT,
    forfeit: false,
    isDeuce: false
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
  io.to(state.roomId).emit('updateScore', state);
  if (
    (!state.deuce && state.score.playerA === SCORE_LIMIT) ||
    state.score.playerB === SCORE_LIMIT
  ) {
    io.to(state.roomId).emit('gameOver', state);
    io.socketsLeave(state.roomId);
    return;
  } else if (
    state.isDeuce &&
    Math.abs(state.score.playerA - state.score.playerB) >= 2
  ) {
    io.to(state.roomId).emit('gameOver', state);
    io.socketsLeave(state.roomId);
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
    io.to(state.roomId).emit('updateBall', state);
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
 */
nextApp.prepare().then(() => {
  const app = express();
  const server = http.createServer(app);
  const io = socketIO(server, {
    pingInterval: 2000, // 추후 테스트 필요
    pingTimeout: 5000,
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  });

  let currentGameKey = 0; // 소켓 룸 아이디에 해당하는 '게임 키'가 필요합니다. 플레이어 짝이 지어질 때마다 게임 키를 1씩 증가시킵니다.

  // 새로운 소켓이 연결되면 실행될 초기화 콜백 함수입니다.
  io.on('connection', (socket) => {
    socket.join(currentGameKey); // 현재 게임 키에 해당하는 소켓룸에 클라이언트를 추가합니다.
    socket.emit('joinedRoom', currentGameKey); // 클라이언트에게 현재 게임 키를 전달합니다.
    if (!gameStates[currentGameKey]) {
      // 현재 게임 키에 해당하는 게임 상태가 없으면 새로 생성합니다. (2명 중 1명이 들어온 경우)
      gameStates[currentGameKey] = createNewGameState(currentGameKey);
      gameStates[currentGameKey].players[0].id = socket.id; // 플레이어 A의 소켓 ID를 초기화합니다.
    } else {
      // 현재 게임 키에 해당하는 게임 상태가 있으면 플레이어 B의 소켓 ID를 초기화합니다.
      gameStates[currentGameKey].players[1].id = socket.id;
      gameStates[currentGameKey].ready = true;
      currentGameKey++; // 다음 게임 키를 위해 게임 키를 1 증가시킵니다.
    }

    // 플레이어가 연결을 끊으면 실행될 콜백 함수입니다.
    socket.on('disconnect', (reason) => {
      console.log(reason); // 연결 끊김 원인을 출력합니다.
      // 플레이어가 배정된 게임 룸을 찾습니다.
      const roomId = Object.keys(gameStates).find((id) => {
        const state = gameStates[id];
        return state.players.some((player) => player.id === socket.id);
      });
      if (!roomId) console.error('this should not happen'); // 게임 룸을 찾지 못하면 에러를 출력합니다. (로직상 불가능합니다 ;)..
      if (!gameStates[roomId].ready) {
        // 1명이 들어왔는데 두 번째 플레이어가 들어오기 전에 연결이 끊긴 경우 게임 상태를 삭제합니다.
        delete gameStates[roomId];
        return;
      }
      // 플레이어 A가 연결을 끊으면 플레이어 B가 기권승합니다.
      const state = gameStates[roomId];
      if (state.players[0].id === socket.id) {
        state.score.playerB = SCORE_LIMIT;
        state.forfeit = true;
        io.to(state.roomId).emit('updateScore', state);
        io.to(state.roomId).emit('gameOver', state);
      }
      // 플레이어 B가 연결을 끊으면 플레이어 A가 기권승합니다.
      else if (state.players[1].id === socket.id) {
        state.score.playerA = SCORE_LIMIT;
        state.forfeit = true;
        io.to(state.roomId).emit('updateScore', state);
        io.to(state.roomId).emit('gameOver', state);
      }
    });

    // 플레이어가 키를 누르면 실행될 콜백 함수입니다. 프론트에서 감지한 키를 전달받습니다.
    socket.on('keyDown', (keycode) => {
      // 키를 누른 플레이어를 찾습니다.
      const roomId = Object.keys(gameStates).find((id) => {
        const state = gameStates[id];
        return state.players.some((player) => player.id === socket.id);
      });
      const targetPlayer = gameStates[roomId].players.find(
        (player) => player.id === socket.id
      );
      if (!targetPlayer) return;
      const isA = targetPlayer.color === PLAYER_A_COLOR;
      // 키에 따라 플레이어의 위치를 업데이트합니다. 화면 중앙 가까이 한계선을 설정해서 넘어가지 않도록 합니다.
      // 플레이어가 움직이고 있기 때문에 dx를 업데이트합니다. (스핀 적용을 위해서 필요합니다. dy는 사용하지 않습니다.)
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

    // 플레이어가 키에서 손을 떼면 실행될 콜백 함수입니다. 플레이어가 정지했으므로 dx를 0으로 초기화합니다.
    socket.on('keyUp', () => {
      const roomId = Object.keys(gameStates).find((id) => {
        const state = gameStates[id];
        return state.players.some((player) => player.id === socket.id);
      });
      const targetPlayer = gameStates[roomId].players.find(
        (player) => player.id === socket.id
      );
      if (!targetPlayer) return;
      targetPlayer.dx = 0;
    });
  });

  // 게임 상태를 업데이트하는 렌더링 루프입니다.
  setInterval(() => {
    // 모든 게임 상태를 업데이트합니다.
    Object.keys(gameStates).forEach((roomId) => {
      const state = gameStates[roomId];
      if (!state.ready) return; // 아직 게임이 시작되지 않은 상태라면 업데이트하지 않습니다.
      updateGameState(state, io);
      io.to(state.roomId).emit('updatePlayers', state); // 플레이어의 위치를 업데이트합니다.
      io.to(state.roomId).emit('updateBall', state); // 공의 위치를 업데이트합니다.
    });
  }, RENDERING_RATE);

  // 게임 시간을 업데이트하는 렌더링 루프입니다. 게임 시간이 0이 되면 게임을 종료합니다.
  const timerId = setInterval(() => {
    Object.keys(gameStates).forEach((roomId) => {
      const state = gameStates[roomId];
      state.time--;
      if (!state.ready) return;
      if (state.time <= 0) {
        if (state.score.playerA > state.score.playerB)
          io.to(state.roomId).emit('gameOver', state);
        else if (state.score.playerA < state.score.playerB)
          io.to(state.roomId).emit('gameOver', state);
        else {
          // 듀스!! 공의 속력이 1.5배로 증가합니다. 먼저 2점차를 만들면 승리합니다.
          state.isDeuce = true;
          state.ball.velocity.x *= 1.5;
          state.ball.velocity.y *= 1.5;
          BALL_SPEED *= 1.5;
          io.to(state.roomId).emit('deuce', state);
          clearInterval(timerId);
          return;
        }
        clearInterval(timerId);
        io.socketsLeave(roomId);
        return;
      }

      io.to(state.roomId).emit('updateTime', state);
    });
  }, 1000);

  // 아래는 nest.js에 맞게 변경할 수 있습니다.
  app.use(express.static('public'));
  app.get('*', (req, res) => {
    return nextHandler(req, res);
  });
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
