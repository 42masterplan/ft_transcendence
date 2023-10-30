import Player from './Player';
import Ball from './Ball';
import {useEffect, useRef} from 'react';

function bounceIfCollided(ball: Ball, playerA: Player, playerB: Player) {
  const debouncingTime = 10;
  const now = Date.now();
  if (
    ball.state.lastCollision &&
    now - ball.state.lastCollision < debouncingTime
  )
    return;
  if (playerA.isACollided(ball)) playerA.handleCollision(ball, now);
  else if (playerB.isBVollided(ball)) playerB.handleCollision(ball, now);
}

function handleKeyDowns(
  keysPressed: {[key: string]: boolean},
  playerA: Player,
  playerB: Player,
  canvas: HTMLCanvasElement,
  paddleOffset: number
) {
  if (keysPressed['a'] || keysPressed['A']) {
    if (playerA.state.x > 0) {
      playerA.setState({x: playerA.state.x - paddleOffset});
      playerA.setState({x: playerA.state.dx - paddleOffset});
    }
  }
  if (keysPressed['d'] || keysPressed['D']) {
    if (playerA.state.x < canvas.width - playerA.state.width) {
      playerA.setState({x: playerA.state.x + paddleOffset});
      playerA.setState({x: playerA.state.dx + paddleOffset});
    }
  }
  if (keysPressed['w'] || keysPressed['W'])
    playerA.setState({y: playerA.state.y - paddleOffset / 2});
  if (keysPressed['s'] || keysPressed['S'])
    playerA.setState({y: playerA.state.y + paddleOffset / 2});
  if (keysPressed['ArrowLeft'])
    if (playerB.state.x > 0) {
      if (playerB.state.x > 0) {
        playerB.setState({x: playerB.state.x - paddleOffset});
        playerB.setState({x: playerB.state.dx - paddleOffset});
      }
    }
  if (keysPressed['ArrowRight'])
    if (playerB.state.x < canvas.width - playerB.state.width) {
      if (playerB.state.x < canvas.width - playerB.state.width) {
        playerB.setState({x: playerB.state.x + paddleOffset});
        playerB.setState({x: playerB.state.dx + paddleOffset});
      }
    }
  if (keysPressed['ArrowUp'])
    playerB.setState({y: playerB.state.y - paddleOffset / 2});
  if (keysPressed['ArrowDown'])
    playerB.setState({y: playerB.state.y + paddleOffset / 2});
}

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const keysPressed = useRef<{[key: string]: boolean}>({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const c = canvas.getContext('2d');
    if (!c) return;
    contextRef.current = c;
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    const playerA = new Player({
      x: canvas.width / 2 - 75,
      y: canvas.height - 30,
      color: 'rgba(217, 217, 217, 1)',
      c
    });
    const playerB = new Player({
      x: canvas.width / 2 - 75,
      y: 15,
      color: 'rgba(217, 217, 217, 1)',
      c
    });
    const ball = new Ball({
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 10,
      color: 'white',
      velocity: {x: 5, y: 5},
      c,
      lastCollision: 0
    });
    addEventListener(
      'keydown',
      (event) => (keysPressed.current[event.key] = true)
    );
    addEventListener('keyup', (event) => delete keysPressed.current[event.key]);
    const gameLoop = () => {
      c.fillStyle = 'rgba(15, 23, 42, 0.8)';
      c.fillRect(0, 0, canvas.width, canvas.height);
      handleKeyDowns(
        keysPressed.current,
        playerA,
        playerB,
        canvas,
        canvas.width / 100
      );
      playerA.draw();
      playerB.draw();
      ball.update();
      bounceIfCollided(ball, playerA, playerB);
      requestAnimationFrame(gameLoop);
    };
    requestAnimationFrame(gameLoop);
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
}
