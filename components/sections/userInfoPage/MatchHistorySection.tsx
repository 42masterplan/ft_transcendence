import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/shadcn/ui/card';
import ScrollableContainer from '@/components/container/ScrollableContainer';
import useAxios from '@/hooks/useAxios';
import {useEffect, useState} from 'react';
import SpinningLoader from '@/components/loader/SpinningLoader2';
import {match} from './forDataFetching/interfaces';
import MatchHistoryCard from '@/components/card/cardUsedInHomePage/MatchHistoryCard';

interface MatchHistorySectionProps {
  userName: string;
  className?: string;
}

export default function MatchHistorySection({
  userName,
  className = ''
}: MatchHistorySectionProps) {
  const {fetchData, response, isSuccess, loading} = useAxios();
  const [matchHistory, setMatchHistory] = useState<match[]>([]);

  // fetch data from server -----------------------------------------------------

  /**
   * API: GET /users/matches
   * @param name: string
   * @returns match[]
   * @description
   * * Get user matches by name
   * * response:
   * * * match[]
   * * * Match:
   * * * * createdAt: string
   * * * * player1Name: string
   * * * * player2Name: string
   * * * * player1Score: number
   * * * * player2Score: number
   * * error: 404 if user does not exist
   * * error: 500 if server error
   */

  useEffect(() => {
    fetchData({
      method: 'get',
      url: '/users/matches',
      params: {
        name: userName
      },
      errorTitle: '매치 정보 조회 실패',
      errorDescription: '매치 정보 조회에 실패했습니다.'
    });
    if (isSuccess === true) {
      setMatchHistory(response.data);
    }
  }, [userName]);

  if (loading === true) {
    return <SpinningLoader />;
  }
  return (
    <Card
      className={`m-2 hover:scale-[1.02] duration-200 hover:-translate-y-1 ${className}`}
    >
      <CardHeader>
        <CardTitle>Match history</CardTitle>
      </CardHeader>
      <ScrollableContainer className='w-full h-[47rem]'>
        <CardContent className='flex flex-col gap-3'>
          {matchHistory.map((match) => (
            <MatchHistoryCard key={match.createdAt} match={match} />
          ))}
        </CardContent>
      </ScrollableContainer>
    </Card>
  );
}
