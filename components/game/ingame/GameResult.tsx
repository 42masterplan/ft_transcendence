import PlayerPortrait from '@/components/game/PlayerPortrait';
import {useRouter} from 'next/router';
import {Player} from '@/types/game';
import {GAME_TIME_LIMIT} from '@/lib/game/macros';
import {Button} from '@/components/shadcn/ui/button';

const textcss =
  'text-center text-white text-[40px] font-bold font-[Roboto Mono]';

export default function GameResult(props: {
  playerA: Player;
  playerB: Player;
  score: {playerA: number; playerB: number};
  time: number;
  winner: boolean; // if true, playerA won
  forfeit: boolean;
}) {
  const {playerA, playerB, score, winner, forfeit} = props;
  const time = GAME_TIME_LIMIT - props.time; // how long the game lasted
  const router = useRouter();
  // console.log('A won: ', winner);
  // console.log('forfeit: ', forfeit);

  return (
    <div className='w-[600px] px-20 pt-5 pb-8 bg-slate-600 rounded-[10px] border  border-black flex flex-col gap-10'>
      <div className='flex flex-row justify-between gap-5'>
        <div className='flex flex-col gap-3'>
          <h2 className={textcss}>Winner</h2>
          {winner ? ( // A won
            <>
              <PlayerPortrait {...playerA} />
              <h3 className={textcss}>{score.playerA}</h3>
            </>
          ) : (
            // B won
            <>
              <PlayerPortrait {...playerB} />
              <h3 className={textcss}>{score.playerB}</h3>
            </>
          )}
        </div>
        <div className='flex flex-col gap-3'>
          <h2 className={textcss}>Loser</h2>
          {!winner ? ( // A lost
            <>
              <PlayerPortrait {...playerA} />
              {forfeit ? (
                <h3 className={textcss}>기권패</h3>
              ) : (
                <h3 className={textcss}>{score.playerA}</h3>
              )}
            </>
          ) : (
            // B lost
            <>
              <PlayerPortrait {...playerB} />
              {forfeit ? (
                <h3 className={textcss}>기권패</h3>
              ) : (
                <h3 className={textcss}>{score.playerB}</h3>
              )}
            </>
          )}
        </div>
      </div>
      <span className={textcss}>
        게임 지속 시간{' '}
        {time >= 60 ? Math.floor(time / 60) + ':' + (time % 60) : '0:' + time}
      </span>
      <div className='flex flex-row justify-center gap-20'>
        <Button
          onClick={() => {
            router.replace('/');
          }}
        >
          마이페이지로 가기
        </Button>
        <Button
          onClick={() => {
            router.replace('/game');
          }}
        >
          한판 더 하기
        </Button>
      </div>
    </div>
  );
}
