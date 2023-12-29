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
import GradualIncreaser from '@/components/loader/GradualIncreaser';

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
    if (userName === undefined) {
      return;
    }
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

  // render --------------------------------------------------------------------

  function StatSection() {
    const winRate = (rank.win / (rank.win + rank.lose)) * 100;
    return (
      <div className='flex flex-col w-full justify-center items-center px-2'>
        <div className='flex flex-row w-full justify-between py-3'>
          <p className='text-2xl font-bold text-indigo-800'>
            {`Wins : `}
            <GradualIncreaser start={0} end={rank.win} duration={1000} />
          </p>
          <p className='text-2xl font-bold text-rose-800'>
            {`Loses : `}
            <GradualIncreaser start={0} end={rank.lose} duration={1000} />
          </p>
        </div>
        <DynamicProgressBar progress={winRate} />
        <p className='text-2xl font-bold text-custom4 py-3'>
          {`Win Rate : `}
          <GradualIncreaser
            start={0}
            end={winRate}
            useDecimals
            duration={1000}
          />
          %
        </p>
      </div>
    );
  }

  function TierSection() {
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
    return (
      <div className='flex flex-col w-fit justify-center items-center px-20'>
        <Trophy className={`w-32 h-32 sm:w-40 sm:h-40 ${tierStringColor}`} />
        <p
          className={`${tierStringColor}  font-sans text-3xl font-extrabold`}
        >{`${rank.tier}`}</p>
      </div>
    );
  }

  if (loading === true) {
    return (
      <Card className={`m-2 h-80 sm:h-72 ${className}`}>
        <SpinningLoader />
      </Card>
    );
  } else {
    return (
      <Card className={`m-2 ${className}`}>
        <CardHeader>
          <CardTitle>Game Stats</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col sm:flex-row justify-center items-center'>
          <StatSection />
          <TierSection />
        </CardContent>
      </Card>
    );
  }
}
