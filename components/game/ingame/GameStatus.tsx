import PlayerPortrait from '@/components/game/PlayerPortrait';
import {Player} from '@/DummyBackend/APIData';

export default function GameStatus(props: {
  gameover: boolean;
  setGameOver: (gameOver: boolean) => void;
  time: number;
  deuce: boolean;
  playerA: Player;
  playerB: Player;
}) {
  const {gameover, setGameOver, time, deuce, playerA, playerB} = props;
  return (
    <div className='flex flex-col items-center'>
      {deuce ? (
        <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center'>
          <span className='text-white text-[50px] font-bold font-[Roboto Mono]'>
            DEUCE
          </span>
        </div>
      ) : null}
      <div className='w-[220px] h-[400px] py-9 bg-slate-600  rounded-[10px] border border-black flex-col justify-center items-center gap-5 inline-flex'>
        <PlayerPortrait {...playerA} />
        <span className='text-center text-white text-[40px] font-bold font-[Roboto Mono]'>
          {time >= 60 ? Math.floor(time / 60) + ':' + (time % 60) : '0:' + time}
        </span>
        <PlayerPortrait {...playerB} />
      </div>
    </div>
  );
}
