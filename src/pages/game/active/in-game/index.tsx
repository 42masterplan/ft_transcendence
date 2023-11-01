import Player from './Player';
import Ball from './Ball';
import {useEffect, useRef, useState} from 'react';
import {bounceIfCollided, handleKeyDowns, handleKeyUps} from './util';
import ScoreBoard from './ScoreBoard';

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const keysPressed = useRef<{[key: string]: boolean}>({});
  const [score, setScore] = useState({playerA: 0, playerB: 0});

  useEffect(() => {
    let animationId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const c = canvas.getContext('2d');
    if (!c) return;
    contextRef.current = c;
    canvas.width = 430;
    canvas.height = 600;

    const playerA = new Player({
      x: canvas.width / 2 - 75,
      y: canvas.height - 30,
      color: 'rgba(217, 217, 217, 1)',
      c
    });
    const playerB = new Player({
      x: canvas.width / 2 - 75,
      y: 15,
      color: 'rgba(0, 133, 255, 1)',
      c
    });
    const ball = new Ball({
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 5,
      color: 'white',
      velocity: {x: 2.5, y: -4.3}, //temp
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
      handleKeyUps(keysPressed.current, playerA, playerB);
      playerA.draw();
      playerB.draw();
      ball.update();
      if (ball.x < 0 || ball.x > canvas.width) ball.velocity.x *= -1;
      if (ball.y < 0) {
        setScore((prev) => {
          const updatedScore = {...prev, playerA: prev.playerA + 1};
          return updatedScore;
        });
        ball.resetPosition();
      } else if (ball.y > canvas.height) {
        setScore((prev) => {
          const updatedScore = {...prev, playerB: prev.playerB + 1};
          return updatedScore;
        });
        ball.resetPosition();
      }
      bounceIfCollided(ball, playerA, playerB);
      animationId = requestAnimationFrame(gameLoop);
    };
    gameLoop();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className='relative w-[430px] h-[600px] mx-auto mt-12'>
      <canvas ref={canvasRef} className='absolute top-0 left-0 z-10' />
      <ScoreBoard AScore={score.playerA} BScore={score.playerB} />
    </div>
  );
}
