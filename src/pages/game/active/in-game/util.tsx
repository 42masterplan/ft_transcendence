import Ball from '../../../../classes/Ball';
import Player from '../../../../classes/Player';

export function bounceIfCollided(ball: Ball, playerA: Player, playerB: Player) {
  const debouncingTime = 300;
  const now = Date.now();
  if (ball.lastCollision && now - ball.lastCollision < debouncingTime) return;
  if (playerA.isACollided(ball)) playerA.handleCollision(ball, now);
  else if (playerB.isBCollided(ball)) playerB.handleCollision(ball, now);
}

export function handleKeyDowns(
  keysPressed: {[key: string]: boolean},
  playerA: Player,
  playerB: Player,
  canvas: HTMLCanvasElement,
  paddleOffset: number
) {
  if (keysPressed['a'] || keysPressed['A']) {
    if (playerA.x > 0) {
      playerA.x -= paddleOffset;
      playerA.dx = paddleOffset;
    }
  }
  if (keysPressed['d'] || keysPressed['D']) {
    if (playerA.x < canvas.width - playerA.width) {
      playerA.x += paddleOffset;
      playerA.dx = paddleOffset;
    }
  }
  if (keysPressed['w'] || keysPressed['W']) {
    if (playerA.y > (canvas.height / 3) * 2 - playerA.height)
      playerA.y -= paddleOffset / 2;
  }
  if (keysPressed['s'] || keysPressed['S']) {
    if (playerA.y < canvas.height - playerA.height)
      playerA.y += paddleOffset / 2;
  }

  if (keysPressed['ArrowLeft']) {
    if (playerB.x > 0) {
      playerB.x -= paddleOffset;
      playerB.dx = paddleOffset;
    }
  }
  if (keysPressed['ArrowRight']) {
    if (playerB.x < canvas.width - playerB.width) {
      playerB.x += paddleOffset;
      playerB.dx = paddleOffset;
    }
  }
  if (keysPressed['ArrowUp']) {
    if (playerB.y > 0) playerB.y -= paddleOffset / 2;
  }
  if (keysPressed['ArrowDown']) {
    if (playerB.y < canvas.height / 3 - playerA.height)
      playerB.y += paddleOffset / 2;
  }
}

export function handleKeyUps(
  keysPressed: {[key: string]: boolean},
  playerA: Player,
  playerB: Player
) {
  if (!playerA.dx && !playerB.dx) return;
  if (
    !keysPressed['a'] &&
    !keysPressed['A'] &&
    !keysPressed['d'] &&
    !keysPressed['D']
  ) {
    playerA.dx = 0;
  }
  if (!keysPressed['ArrowLeft'] && !keysPressed['ArrowRight']) {
    playerB.dx = 0;
  }
}
