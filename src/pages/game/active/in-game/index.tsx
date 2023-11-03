import Player from '../../../../classes/Player';
import Ball from '../../../../classes/Ball';
import {useEffect, useRef, useState} from 'react';
import {bounceIfCollided, handleKeyDowns, handleKeyUps} from './util';
import ScoreBoard from '../../../../components/game/ScoreBoard';
import GameStatus from '../../../../components/game/GameStatus';

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const keysPressed = useRef<{[key: string]: boolean}>({});
  const [score, setScore] = useState({playerA: 0, playerB: 0});
  const [gameover, setGameOver] = useState(false);

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
      x: canvas.width / 2 - 50,
      y: canvas.height - 30,
      color: 'rgba(217, 217, 217, 1)',
      c
    });
    const playerB = new Player({
      x: canvas.width / 2 - 50,
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
          if (updatedScore.playerA === 10) setGameOver(true);
          return updatedScore;
        });
        ball.resetPosition();
      } else if (ball.y > canvas.height) {
        setScore((prev) => {
          const updatedScore = {...prev, playerB: prev.playerB + 1};
          if (updatedScore.playerB === 10) setGameOver(true);
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
    <div className='relative min-h-screen flex justify-center items-center'>
      <canvas ref={canvasRef} className='z-10 absolute' />

      {gameover ? (
        <div className='absolute z-20 text-white text-4xl font-bold'>
          GameOver
        </div>
      ) : (
        <>
          <div className='absolute left-[calc(50%+217px)] '>
            <GameStatus gameover={gameover} setGameOver={setGameOver} />
          </div>
          <ScoreBoard AScore={score.playerA} BScore={score.playerB} />
        </>
      )}
    </div>
  );
}
