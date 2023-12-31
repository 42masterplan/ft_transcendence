import {match} from '@/components/sections/userInfoPage/forDataFetching/interfaces';
import {Card, CardHeader} from '../../shadcn/ui/card';

interface MatchHistoryCardProps {
  match: match;
}

interface SingleSideCardProps {
  name: string;
  score: number;
  result: 'win' | 'lose' | 'draw';
}

function SingleSideCard({name, score, result}: SingleSideCardProps) {
  let boxSizingClassName = '';
  if (result === 'win') {
    boxSizingClassName = 'scale-[1.2]';
  }

  let scoreColor = '';
  if (result === 'win') {
    scoreColor = 'text-indigo-500';
  } else if (result === 'lose') {
    scoreColor = 'text-rose-500';
  } else {
    scoreColor = 'text-gray-500';
  }
  return (
    <div
      className={`flex flex-col justify-center items-center ${boxSizingClassName}`}
    >
      <h1 className={`text-base`}>{name}</h1>
      <h1 className={`text-xl ${scoreColor}`}>{score}</h1>
    </div>
  );
}

export default function MatchHistoryCard({match}: MatchHistoryCardProps) {
  let player1Status: 'win' | 'lose' | 'draw';
  let player2Status: 'win' | 'lose' | 'draw';
  if (match.playerAScore > match.playerBScore) {
    player1Status = 'win';
    player2Status = 'lose';
  } else if (match.playerAScore < match.playerBScore) {
    player1Status = 'lose';
    player2Status = 'win';
  } else {
    player1Status = 'draw';
    player2Status = 'draw';
  }

  return (
    <Card className='flex-col bg-custom1/50 px-1 py-2 hover:scale-[1.02] duration-200'>
      <CardHeader className='p-2'>
        <h1 className='flex text-sm rounded-md bg-custom3/50 px-2 py-1 w-fit'>
          {match.createdAt}
        </h1>
      </CardHeader>
      <div className='flex flex-row justify-around items-center'>
        <SingleSideCard
          name={match.playerAName}
          score={match.playerAScore}
          result={player1Status}
        />
        <div className='flex flex-row justify-center items-center'>
          <p>:</p>
        </div>
        <SingleSideCard
          name={match.playerBName}
          score={match.playerBScore}
          result={player2Status}
        />
      </div>
    </Card>
  );
}
