import Player from '@/classes/Player';
import {SCREEN_WIDTH, SCREEN_HEIGHT, PADDLE_OFFSET} from './macros';
import {Socket} from 'socket.io-client';

export function handleKeyDowns(
  keysPressed: {[key: string]: boolean},
  player: Player,
  socket: Socket,
  isA: boolean
) {
  if (!player) return;
  if (keysPressed['a'] || keysPressed['A'] || keysPressed['ㅁ']) {
    if (player.x > 0) {
      player.x -= PADDLE_OFFSET;
      player.dx = PADDLE_OFFSET;
      socket.emit('keyDown', 'a');
    }
  }
  if (keysPressed['d'] || keysPressed['D'] || keysPressed['ㅇ']) {
    if (player.x < SCREEN_WIDTH - player.width) {
      player.x += PADDLE_OFFSET;
      player.dx = PADDLE_OFFSET;
      socket.emit('keyDown', 'd');
    }
  }
  if (keysPressed['w'] || keysPressed['W'] || keysPressed['ㅈ']) {
    if (isA && player.y > 0) player.y -= PADDLE_OFFSET / 2;
    else if (!isA && player.y > (SCREEN_HEIGHT / 3) * 2 - player.height)
      player.y -= PADDLE_OFFSET / 2;
    socket.emit('keyDown', 'w');
  }
  if (keysPressed['s'] || keysPressed['S'] || keysPressed['ㄴ']) {
    if (isA && player.y < SCREEN_HEIGHT / 3 - player.height) {
      player.y += PADDLE_OFFSET / 2;
    } else if (!isA && player.y < SCREEN_HEIGHT - player.height) {
      player.y += PADDLE_OFFSET / 2;
    }
    socket.emit('keyDown', 's');
  }
}

export function handleKeyUps(
  keysPressed: {[key: string]: boolean},
  player: Player,
  socket: Socket
) {
  if (!player) return;
  if (!player.dx) return;
  if (
    !keysPressed['a'] &&
    !keysPressed['A'] &&
    !keysPressed['d'] &&
    !keysPressed['D']
  ) {
    player.dx = 0;
    socket.emit('keyUp');
  }
}
