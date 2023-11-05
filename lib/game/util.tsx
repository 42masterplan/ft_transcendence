import Ball from '@/lib/classes/Ball';
import Player from '@/lib/classes/Player';
import {SCREEN_WIDTH, SCREEN_HEIGHT, PADDLE_OFFSET} from './macros';

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
  playerB: Player
) {
  if (keysPressed['a'] || keysPressed['A']) {
    if (playerA.x > 0) {
      playerA.x -= PADDLE_OFFSET;
      playerA.dx = PADDLE_OFFSET;
    }
  }
  if (keysPressed['d'] || keysPressed['D']) {
    if (playerA.x < SCREEN_WIDTH - playerA.width) {
      playerA.x += PADDLE_OFFSET;
      playerA.dx = PADDLE_OFFSET;
    }
  }
  if (keysPressed['w'] || keysPressed['W']) {
    if (playerA.y > (SCREEN_HEIGHT / 3) * 2 - playerA.height)
      playerA.y -= PADDLE_OFFSET / 2;
  }
  if (keysPressed['s'] || keysPressed['S']) {
    if (playerA.y < SCREEN_HEIGHT - playerA.height)
      playerA.y += PADDLE_OFFSET / 2;
  }

  if (keysPressed['ArrowLeft']) {
    if (playerB.x > 0) {
      playerB.x -= PADDLE_OFFSET;
      playerB.dx = PADDLE_OFFSET;
    }
  }
  if (keysPressed['ArrowRight']) {
    if (playerB.x < SCREEN_WIDTH - playerB.width) {
      playerB.x += PADDLE_OFFSET;
      playerB.dx = PADDLE_OFFSET;
    }
  }
  if (keysPressed['ArrowUp']) {
    if (playerB.y > 0) playerB.y -= PADDLE_OFFSET / 2;
  }
  if (keysPressed['ArrowDown']) {
    if (playerB.y < SCREEN_HEIGHT / 3 - playerA.height)
      playerB.y += PADDLE_OFFSET / 2;
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
  )
    playerA.dx = 0;
  if (!keysPressed['ArrowLeft'] && !keysPressed['ArrowRight']) playerB.dx = 0;
}
