import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT, //screen ratio is 2:3
  PLAYER_WIDTH,
  PLAYER_A_COLOR,
  PLAYER_B_COLOR,
  BACKGROUND_COLOR,
  SCORE_LIMIT,
  RENDERING_RATE
} from '@/lib/game/macros';
import Player from '@/lib/classes/Player';
import Ball from '@/lib/classes/Ball';
import Particle from '@/lib/classes/Particle';
import {useEffect, useRef, useState} from 'react';
import {handleKeyDowns, handleKeyUps} from '@/lib/game/util';
import ScoreBoard from '@/components/game/ScoreBoard';
import GameStatus from '@/components/game/GameStatus';
import GameResult from '@/components/game/GameResult';
import io from 'socket.io-client';

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const keysPressed = useRef<{[key: string]: boolean}>({});
  const [time, setTime] = useState(120);
  const [score, setScore] = useState({playerA: 0, playerB: 0});
  const [gameover, setGameOver] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:4242');
    let animationId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const c = canvas.getContext('2d');
    if (!c) return;
    const devicePixelRatio = window.devicePixelRatio || 1;
    contextRef.current = c;
    canvas.width = SCREEN_WIDTH * devicePixelRatio;
    canvas.height = SCREEN_HEIGHT * devicePixelRatio;
    c.scale(devicePixelRatio, devicePixelRatio);
    canvas.style.width = `${SCREEN_WIDTH}px`;
    canvas.style.height = `${SCREEN_HEIGHT}px`;
    const particles = [] as Particle[];
    const playerA = new Player({
      id: '',
      x: SCREEN_WIDTH / 2 - PLAYER_WIDTH / 2,
      y: SCREEN_HEIGHT - 45,
      color: PLAYER_A_COLOR,
      c,
      socket
    });
    const playerB = new Player({
      id: '',
      x: SCREEN_WIDTH / 2 - PLAYER_WIDTH / 2,
      y: 30,
      color: PLAYER_B_COLOR,
      c,
      socket
    });
    const ball = new Ball({
      x: SCREEN_WIDTH / 2,
      y: SCREEN_HEIGHT / 2,
      c,
      lastCollision: 0
    });
    socket.on('updatePlayers', (backendPlayers) => {
      if (backendPlayers.length < 2) return;
      if (!playerA.id) playerA.id = backendPlayers[0].id;
      if (!playerB.id) playerB.id = backendPlayers[1].id;
      playerA.x = backendPlayers[0].x;
      playerA.y = backendPlayers[0].y;
      playerB.x = backendPlayers[1].x;
      playerB.y = backendPlayers[1].y;
      playerA.dx = backendPlayers[0].dx;
      playerB.dx = backendPlayers[1].dx;
      if (!(playerA.id in backendPlayers)) delete backendPlayers[playerA.id];
      if (!(playerB.id in backendPlayers)) delete backendPlayers[playerB.id];
    });
    socket.on('updateBall', (backendBall) => {
      ball.x = backendBall.x;
      ball.y = backendBall.y;
      ball.velocity = backendBall.velocity;
      ball.lastCollision = backendBall.lastCollision;
    });
    socket.on('updateScore', (backendScore) => {
      ball.resetPosition(particles);
      console.log('updateScore', backendScore);
      setScore(() => {
        const updatedScore = {...backendScore};
        if (
          updatedScore.playerB >= SCORE_LIMIT ||
          updatedScore.playerA >= SCORE_LIMIT
        ) {
          setGameOver(true);
          cancelAnimationFrame(animationId);
          socket.off('connect');
          socket.off('disconnect');
          socket.disconnect();
        }
        return updatedScore;
      });
    });
    socket.on('updateTime', (backendTime) => {
      setTime(backendTime);
    });
    setInterval(() => {
      if (keysPressed.current) {
        if (socket.id == playerA.id) {
          handleKeyDowns(keysPressed.current, playerA, socket, true);
          handleKeyUps(keysPressed.current, playerA, socket);
        }
        if (socket.id == playerB.id) {
          handleKeyDowns(keysPressed.current, playerB, socket, false);
          handleKeyUps(keysPressed.current, playerB, socket);
        }
      }
    }, RENDERING_RATE);
    addEventListener(
      'keydown',
      (event) => (keysPressed.current[event.key] = true)
    );
    addEventListener('keyup', (event) => delete keysPressed.current[event.key]);
    const gameLoop = () => {
      c.fillStyle = BACKGROUND_COLOR;
      c.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
      playerA.draw();
      playerB.draw();
      ball.draw();
      particles.forEach((particle) => {
        if (particle.alpha <= 0.01) {
          particles.splice(particles.indexOf(particle), 1);
        } else particle.update();
      });
      animationId = requestAnimationFrame(gameLoop);
    };
    gameLoop();
    return () => {
      cancelAnimationFrame(animationId);
      socket.off('connect');
      socket.off('disconnect');
      socket.disconnect();
    };
  }, []);

  return (
    <div className='relative min-h-screen flex justify-center items-center'>
      {gameover ? (
        <GameResult playerA={score.playerA} playerB={score.playerB} />
      ) : (
        <>
          <canvas ref={canvasRef} className='z-10 absolute' />
          <div className='absolute left-[calc(50%+200px)] '>
            <GameStatus
              gameover={gameover}
              setGameOver={setGameOver}
              time={time}
            />
          </div>
          <ScoreBoard AScore={score.playerA} BScore={score.playerB} />
        </>
      )}
    </div>
  );
}
