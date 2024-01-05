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
  SCORE_LIMIT,
  PRE_GAME_TIME
} from '@/lib/game/macros';
import Player from '@/classes/Player';
import Ball from '@/classes/Ball';
import Particle from '@/classes/Particle';
import {useEffect, useRef, useState} from 'react';
import {handleKeyDowns, handleKeyUps} from '@/lib/game/util';
import ScoreBoard from '@/components/game/ingame/ScoreBoard';
import GameStatus from '@/components/game/ingame/GameStatus';
import GameResult from '@/components/game/ingame/GameResult';
import {io, Socket} from 'socket.io-client';
import {useRouter} from 'next/router';
import getAuthorization from '@/lib/utils/cookieUtils';
import PlayerPortrait from '@/components/game/PlayerPortrait';
import Divider from '@/components/game/ingame/Divider';
import useSocket from '@/hooks/useSocket';
const socketServerUrl = process.env.NEXT_PUBLIC_CHAT_SOCKET;
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
    if (state.isForfeit) setForfeit(true);
    setGameOver(true);
    console.log('game over!!!');
    cancelAnimationFrame(animationId);
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
  const [preGameTime, setPreGameTime] = useState(PRE_GAME_TIME);
  const [time, setTime] = useState(GAME_TIME_LIMIT);
  const [score, setScore] = useState({playerA: 0, playerB: 0});
  const [gameover, setGameOver] = useState(false);
  const [forfeit, setForfeit] = useState(false);
  const [deuce, setDeuce] = useState(false);
  const [matchId, setMatchId] = useState('');
  const [gameMode, setGameMode] = useState('');
  const [side, setSide] = useState('');
  const router = useRouter();
  const {aName, aProfileImage, bName, bProfileImage, theme} = router.query as {
    aName: string;
    aProfileImage: string;
    bName: string;
    bProfileImage: string;
    theme: string;
  };
  const [initSocket, setInitSocket] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(''); // 상태로 배경 이미지 URL을 관리
  const [gameStarted, setGameStarted] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [alarm_sock, disconnect] = useSocket('alarm');

  useEffect(() => {
    function handleBeforeUnload(event: any) {
      event.preventDefault();
      event.returnValue =
        '게임이 진행중입니다. 정말로 나가시겠습니까? (이 경우 기권패로 처리됩니다.)';
      console.log(socket);
      if (socket) {
        console.log('게임 소켓 연결 해제');
        socket.disconnect(); // 게임 소켓 연결 해제 -> 순서 강제
      }
      console.log('알람 소켓 연결 해제');
      disconnect(); // 알람 소켓 연결 해제
      return '게임이 진행중입니다. 정말로 나가시겠습니까? (이 경우 기권패로 처리됩니다.)';
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [socket]);

  useEffect(() => {
    if (gameMode != '' && matchId != '' && side != '') setInitSocket(true);
  }, [gameMode, matchId, side]);

  useEffect(() => {
    if (router.query.matchId) setMatchId(router.query.matchId as string);
    if (router.query.gameMode) setGameMode(router.query.gameMode as string);
    if (router.query.side) setSide(router.query.side as string);
  }, [router.query, router.isReady]);

  useEffect(() => {
    if (!socket) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const c = canvas.getContext('2d');
    if (!c) return;
    socket.on('gameFull', () => {
      router.push('/');
    });
    let animationId: number;
    const {playerA, playerB, ball, particles} = prepGame(
      canvas,
      contextRef,
      socket,
      c
    );
    const backgroundImage = new Image();
    if (theme && theme != 'Default')
      backgroundImage.src = `/gameThemes/${theme}.png`;
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
    // if (gameStarted)
    socket.emit('gameReady');
    console.log('game ready emitted');
    setInterval(() => {
      handleKeys(keysPressed, playerA, playerB, socket);
    }, RENDERING_RATE);
    addEventListeners(keysPressed);
    const gameLoop = () => {
      if (theme && theme != 'Default') {
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
      socket.off('updatePlayers');
      socket.off('updateBall');
      socket.off('updateScore');
      socket.off('gameOver');
      socket.off('updateTime');
      socket.off('deuce');
      socket.off('joinedRoom');
      socket.off('gameFull');
      socket.off('connect');
      socket.off('disconnect');
      socket.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [gameStarted, socket]);

  useEffect(() => {
    if (!initSocket || gameMode == '' || matchId == '' || side == '') return;
    const newSocket = io(`${socketServerUrl}/game` as string, {
      transports: ['websocket'],
      auth: {
        Authorization: `Bearer ${getAuthorization()}`
      }
    });
    newSocket.on('invalidMatch', () => {
      newSocket.disconnect();
      router.replace('/');
    });
    newSocket.on('updateScore', (state) => {
      if (state.matchId != matchId) return;
      const backendScore = state.score;
      setScore(backendScore);
    });
    newSocket.on('gameOver', (state) => {
      if (state.matchId != matchId) return;
      if (state.isForfeit) setForfeit(true);
      setGameOver(true);
      console.log('game over!!!');
      newSocket.disconnect();
    });
    newSocket.emit('joinRoom', {
      matchId: matchId,
      gameMode: gameMode,
      side: side
    });
    setSocket(newSocket);
    return () => {
      newSocket.off('updateScore');
      newSocket.off('gameOver');
      newSocket.disconnect();
    };
  }, [gameMode, initSocket, matchId, side]);

  useEffect(() => {
    if (!aName || !aProfileImage || !bName || !bProfileImage || !theme) {
      if (socket) socket.disconnect();
      router.replace('/');
    }
    const timer = setInterval(() => {
      setPreGameTime((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timer); // 타이머를 여기서 정지
          if (socket) socket.disconnect();
          setGameStarted(true);
          return 0; // 시간이 0이 되었으므로 0을 반환
        }
        return prevTime - 1; // 시간을 감소시킴
      });
    }, 1000);
    if (theme && theme !== 'Default') {
      const imageSrc = `/gameThemes/${theme}.png`;
      const img = new Image();
      img.onload = () => {
        setBackgroundImage(imageSrc);
      };
      img.src = imageSrc;
    }
    return () => clearInterval(timer);
  }, []);

  const style =
    backgroundImage != ''
      ? {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover', // 배경 이미지가 컨테이너를 꽉 채우도록 설정
          backgroundPosition: 'center center' // 이미지를 중앙에 위치시킴
        }
      : {};

  return gameStarted ? (
    <div className='relative min-h-screen flex justify-center items-center'>
      {gameover ? (
        <GameResult
          playerA={{
            name: aName,
            profileImage: aProfileImage
          }}
          playerB={{
            name: bName,
            profileImage: bProfileImage
          }}
          score={score}
          time={time}
          winner={score.playerA >= score.playerB ? true : false}
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
              playerA={{name: aName, profileImage: aProfileImage}}
              playerB={{name: bName, profileImage: bProfileImage}}
            />
          </div>
          <ScoreBoard AScore={score.playerA} BScore={score.playerB} />
        </>
      )}
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center pt-8 gap-10 h-full'>
      <h1 className='text-4xl text-white font-bold'>
        게임 시작까지: {preGameTime}
      </h1>
      <div
        className='w-[400px] h-[600px] py-[50px] bg-slate-800 rounded-[10px] shadow border border-black flex flex-col justify-between items-center'
        style={style}
      >
        <PlayerPortrait name={bName} profileImage={bProfileImage} />
        <Divider />
        <PlayerPortrait name={aName} profileImage={aProfileImage} />
      </div>
      <div className='text-sm text-white font-bold'>
        <p>
          규칙: 10점을 먼저 달성하거나, 1분 30초 안에 더 많은 점수를 획득한
          플레이어가 승리합니다.
        </p>
        <p>경기 도중 나가게 되면 기권패로 처리됩니다.</p>
        <p>
          1분 30초가 지나도 동점인 경우, 듀스 상황이 발생하여 공의 속도가
          빨라지고 2점 차이가 나면 경기가 종료됩니다.
        </p>
      </div>
    </div>
  );
}
