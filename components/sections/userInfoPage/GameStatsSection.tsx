import DynamicProgressBar from '@/components/graph/DynamicProgressBar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/shadcn/ui/card';
import {Trophy} from 'lucide-react';
import useAxios from '@/hooks/useAxios';
import {useEffect, useState} from 'react';
import SpinningLoader from '@/components/loader/SpinningLoader2';

import {rank} from './forDataFetching/interfaces';

interface GameStatsCardProps {
  userName: string;
  className?: string;
}

export default function GameStatsSection({
  userName,
  className = ''
}: GameStatsCardProps) {
  const {fetchData, response, isSuccess, loading} = useAxios();
  const [rank, setRank] = useState<rank>({
    tier: '',
    win: 0,
    lose: 0
  });

  // fetch data from server -----------------------------------------------------

  /**
   * API: GET /users/rank
   * @param name: string
   * @returns rank
   * @description
   * * Get user rank by name
   * * response:
   * * * tier: string
   * * * win: number
   * * * lose: number
   * * error: 404 if user does not exist
   * * error: 500 if server error
   */

  useEffect(() => {
    fetchData({
      method: 'get',
      url: '/users/rank',
      params: {
        name: userName
      },
      errorTitle: '유저 정보 조회 실패',
      errorDescription: '유저 정보 조회에 실패했습니다.'
    });
  }, [userName]);
  useEffect(() => {
    if (isSuccess === true) {
      rank.tier = response.tier;
      rank.win = response.win;
      rank.lose = response.lose;
      setRank(rank);
    }
  }, [isSuccess, response]);

  const winRate = (rank.win / (rank.win + rank.lose)) * 100;

  let tierStringColor = '';
  if (rank.tier === 'Bronze') {
    tierStringColor = 'text-amber-700	';
  } else if (rank.tier === 'Silver') {
    tierStringColor = 'text-gray-500';
  } else if (rank.tier === 'Gold') {
    tierStringColor = 'text-yellow-600	';
  } else if (rank.tier === 'Platinum') {
    tierStringColor = 'text-stone-600	';
  } else {
    tierStringColor = 'text-black';
  }

  // render --------------------------------------------------------------------

  if (loading === true)
    return (
      <Card
        className={`m-2 hover:scale-102 duration-200 hover:-translate-y-1 h-80 sm:h-72 ${className}`}
      >
        <SpinningLoader />
      </Card>
    );

  return (
    <Card
      className={`m-2 hover:scale-102 duration-200 hover:-translate-y-1 h-80 sm:h-72 ${className}`}
    >
      <CardHeader>
        <CardTitle>Game Stats</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-3'>
        <div>
          <div className='flex flex-row w-full justify-between py-1'>
            <p className='text-lg text-blue-300'>Wins: {rank.win}</p>
            <p className='text-lg text-rose-300'>Losses: {rank.lose}</p>
          </div>
          <DynamicProgressBar progress={winRate} />
        </div>
        <div className='flex flex-col w-full gap-1 items-center'>
          <Trophy className={`w-20 h-20 ${tierStringColor}`} />
          <p
            className={`${tierStringColor}  font-sans text-3xl font-extrabold`}
          >{`${rank.tier}`}</p>
        </div>
      </CardContent>
    </Card>
  );
}
