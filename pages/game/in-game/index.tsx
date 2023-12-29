import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT, //screen ratio is 2:3
  PLAYER_WIDTH,
  PLAYER_A_COLOR,
  PLAYER_B_COLOR,
  BACKGROUND_COLOR,
  BACKGROUND_SHADOW_COLOR,
  RENDERING_RATE,
  GAME_TIME_LIMIT,
  SCORE_LIMIT
} from '@/lib/game/macros';
import Player from '@/lib/classes/Player';
import Ball from '@/lib/classes/Ball';
import Particle from '@/lib/classes/Particle';
import {useEffect, useRef, useState} from 'react';
import {handleKeyDowns, handleKeyUps} from '@/lib/game/util';
import ScoreBoard from '@/components/game/ingame/ScoreBoard';
import GameStatus from '@/components/game/ingame/GameStatus';
import GameResult from '@/components/game/ingame/GameResult';
import {io, Socket} from 'socket.io-client';
import {useRouter} from 'next/router';
import useSocket from '@/hooks/useSocket';

function prepGame(
  canvas: HTMLCanvasElement,
  contextRef: any,
  socket: Socket,
  c: CanvasRenderingContext2D
) {
  contextRef.current = c;
  const devicePixelRatio = window.devicePixelRatio || 1;
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
  return {playerA, playerB, ball, particles};
}

function listenToSocketEvents(
  socket: Socket,
  matchId: string | string[] | undefined,
  playerA: Player,
  playerB: Player,
  ball: Ball,
  setScore: any,
  setGameOver: any,
  setTime: any,
  setForfeit: any,
  setDeuce: any,
  animationId: number,
  particles: Particle[]
) {
  socket.on('updatePlayers', (state) => {
    if (state.matchId != matchId) return;
    if (!state.isReady) return;
    if (!playerA.id) playerA.id = state.playerA.id;
    if (!playerB.id) playerB.id = state.playerB.id;
    playerA.x = state.playerA.x;
    playerA.y = state.playerA.y;
    playerA.dx = state.playerA.dx;
    playerB.x = state.playerB.x;
    playerB.y = state.playerB.y;
    playerB.dx = state.playerB.dx;
  });
  socket.on('updateBall', (state) => {
    if (state.matchId != matchId) return;
    const backendBall = state.ball;
    ball.x = backendBall.x;
    ball.y = backendBall.y;
    ball.velocity = backendBall.velocity;
    ball.lastCollision = backendBall.lastCollision;
  });
  socket.on('updateScore', (state) => {
    if (state.matchId != matchId) return;
    const backendScore = state.score;
    ball.resetPosition(particles);
    setScore(backendScore);
  });
  socket.on('gameOver', (state) => {
    if (state.matchId != matchId) return;
    if (state.forfeit) setForfeit(true);
    setGameOver(true);
    cancelAnimationFrame(animationId);
    socket.off('connect');
    socket.off('disconnect');
    socket.disconnect();
  });
  socket.on('updateTime', (state) => {
    if (state.matchId != matchId) return;
    const backendTime = state.time;
    setTime(backendTime);
  });
  socket.on('deuce', (state) => {
    if (state.matchId != matchId) return;
    setDeuce(true);
  });
}

function handleKeys(
  keysPressed: any,
  playerA: Player,
  playerB: Player,
  socket: Socket
) {
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
}

function addEventListeners(keysPressed: any) {
  addEventListener(
    'keydown',
    (event) => (keysPressed.current[event.key] = true)
  );
  addEventListener('keyup', (event) => delete keysPressed.current[event.key]);
}

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const keysPressed = useRef<{[key: string]: boolean}>({});
  const [time, setTime] = useState(GAME_TIME_LIMIT);
  const [score, setScore] = useState({playerA: 0, playerB: 0});
  const [gameover, setGameOver] = useState(false);
  const [forfeit, setForfeit] = useState(false);
  const [deuce, setDeuce] = useState(false);
  const [matchId, setMatchId] = useState<string>('');
  const [theme, setTheme] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      setMatchId(router.query.id as string);
    }
    if (router.query.theme) {
      setTheme(router.query.theme as string);
    }
  }, [router]);

  const initSocket = matchId != '' && theme != '';
  console.log('initSocket', initSocket);
  console.log('matchId', matchId);
  console.log('@@@@@');
  const [socket] = useSocket('game', {
    autoConnect: initSocket
  });

  useEffect(() => {
    if (!initSocket) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const c = canvas.getContext('2d');
    if (!c) return;
    let animationId: number;
    const {playerA, playerB, ball, particles} = prepGame(
      canvas,
      contextRef,
      socket,
      c
    );
    const backgroundImage = new Image();
    if (theme && theme != 'default')
      backgroundImage.src = `/gameThemes/${theme}.png`;
    console.log('matchId', matchId);
    socket.emit('joinRoom', {matchId: matchId});
    socket.on('joinedRoom', () => {
      listenToSocketEvents(
        socket,
        matchId,
        playerA,
        playerB,
        ball,
        setScore,
        setGameOver,
        setTime,
        setForfeit,
        setDeuce,
        animationId,
        particles
      );
    });
    setInterval(() => {
      handleKeys(keysPressed, playerA, playerB, socket);
    }, RENDERING_RATE);
    addEventListeners(keysPressed);
    const gameLoop = () => {
      if (theme && theme != 'default') {
        if (backgroundImage.complete) {
          c.drawImage(backgroundImage, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
          c.fillStyle = BACKGROUND_SHADOW_COLOR;
        }
      } else c.fillStyle = BACKGROUND_COLOR;
      c.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
      c.strokeStyle = 'white';
      c.lineWidth = 2;
      c.strokeRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
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
      console.log('game unmounted');
      // socket.off('updatePlayers');
      // socket.off('updateBall');
      // socket.off('updateScore');
      // socket.off('gameOver');
      // socket.off('updateTime');
      // socket.off('deuce');
      // socket.off('connect');
      // socket.off('disconnect');
      cancelAnimationFrame(animationId);
    };
  }, [socket, initSocket]);

  return (
    <div className='relative min-h-screen flex justify-center items-center'>
      {gameover ? (
        <GameResult
          score={score}
          time={time}
          winner={score.playerA == SCORE_LIMIT ? true : false}
          forfeit={forfeit}
        />
      ) : (
        <>
          <canvas ref={canvasRef} className='z-10 absolute' />
          <div className='absolute left-[calc(50%+200px)] '>
            <GameStatus
              gameover={gameover}
              setGameOver={setGameOver}
              time={time}
              deuce={deuce}
            />
          </div>
          <ScoreBoard AScore={score.playerA} BScore={score.playerB} />
        </>
      )}
    </div>
  );
}
