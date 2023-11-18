import PlayerPortrait from '@/components/game/PlayerPortrait';
import {PLAYER_DUMMY_1} from '@/DummyBackend/APIData';
import {PLAYER_DUMMY_2} from '@/DummyBackend/APIData';

export default function GameStatus(props: {
  gameover: boolean;
  setGameOver: (gameOver: boolean) => void;
  time: number;
}) {
  const time = props.time;
  return (
    <div className='w-[220px] h-[400px] py-9 bg-slate-600  rounded-[10px] border border-black flex-col justify-center items-center gap-5 inline-flex'>
      <PlayerPortrait {...PLAYER_DUMMY_1} />
      <span className='w-[480px] text-center text-white text-[40px] font-bold font-[Roboto Mono]'>
        {time >= 60 ? Math.floor(time / 60) + ':' + (time % 60) : '0:' + time}
      </span>
      <PlayerPortrait {...PLAYER_DUMMY_2} />
    </div>
  );
}
