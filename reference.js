// ... 기존 코드 ...
/*
방 관리: 클라이언트가 연결될 때마다 새로운 방을 만들거나 기존 방에 가입하게 합니다. 방은 고유한 ID를 가지며, 각 방은 독립된 게임 상태를 유지합니다.

방별 상태 저장: 각 방의 게임 상태(플레이어, 볼의 위치, 점수 등)를 저장하기 위한 구조를 만듭니다.

이벤트 방송: 게임 상태 업데이트, 점수 변경 등의 이벤트를 해당 방에만 방송합니다.
*/
// 방별 상태를 저장할 객체
const gameStates = {};

io.on('connection', (socket) => {
  // 클라이언트가 연결될 때 처리
  socket.on('joinGame', (roomId) => {
    socket.join(roomId);
    // 새로운 게임 상태 생성 또는 기존 상태 사용
    if (!gameStates[roomId]) {
      gameStates[roomId] = createNewGameState(roomId);
    }
    // 클라이언트에 초기 게임 상태 전송
    io.to(roomId).emit('gameState', gameStates[roomId]);
  });

  // ... 기존의 이벤트 핸들러 ...

  setInterval(() => {
    Object.keys(gameStates).forEach((roomId) => {
      const state = gameStates[roomId];
      updateGameState(state); // 게임 상태 업데이트
      // 방별로 상태 업데이트 이벤트 방송
      io.to(roomId).emit('updatePlayers', state.players);
      io.to(roomId).emit('updateBall', state.ball);
    });
  }, RENDERING_RATE);
});

// 새로운 게임 상태 생성 함수
function createNewGameState(roomId) {
  // 여기에 게임 초기 상태 설정 로직 추가
  return {
    roomId: roomId,
    players: [],
    ball: {
      /* ... */
    },
    score: {playerA: 0, playerB: 0}
    // 다른 필요한 상태 추가
  };
}

// 게임 상태 업데이트 함수
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

  // 다른 게임 로직 추가...
}

// 볼 리셋 함수
function resetBall(isA, state) {
  // 볼 리셋 및 점수 업데이트 로직
  // ...
}

// ... 기존 코드 ...
function createNewGameState(roomId) {
  return {
    roomId: roomId,
    players: [
      // 플레이어 A의 초기 상태
      {
        id: null, // 플레이어의 소켓 ID 또는 기타 식별자
        x: SCREEN_WIDTH / 2 - PLAYER_WIDTH / 2,
        y: SCREEN_HEIGHT - 45,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
        color: PLAYER_A_COLOR,
        dx: 0
      },
      // 플레이어 B의 초기 상태
      {
        id: null, // 플레이어의 소켓 ID 또는 기타 식별자
        x: SCREEN_WIDTH / 2 - PLAYER_WIDTH / 2,
        y: 30,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
        color: PLAYER_B_COLOR,
        dx: 0
      }
    ],
    ball: {
      x: SCREEN_WIDTH / 2,
      y: SCREEN_HEIGHT / 2,
      velocity: {x: 0, y: 0},
      radius: BALL_RADIUS,
      color: BALL_COLOR,
      lastCollision: 0
    },
    score: {
      playerA: 0,
      playerB: 0
    }
    // 다른 게임 관련 상태 변수들...
  };
}
