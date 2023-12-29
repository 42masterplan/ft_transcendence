import {
  Card,
  CardContent,
  CardDescription,
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
   * * * * playerAName: string
   * * * * playerBName: string
   * * * * playerAScore: number
   * * * * playerBScore: number
   * * * * matchId: string
   * * error: 404 if user does not exist
   * * error: 500 if server error
   */

  useEffect(() => {
    if (userName === undefined) {
      return;
    }
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
      setMatchHistory(response);
    }
  }, [userName]);

  // render --------------------------------------------------------------------

  if (loading === true) {
    return (
      <Card className={`${className}`}>
        <SpinningLoader />
      </Card>
    );
  }
  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle>Match History</CardTitle>
      </CardHeader>
      <CardDescription>
        <CardContent>
          <ScrollableContainer className='h-[50vh]'>
            {matchHistory.map((match) => (
              <MatchHistoryCard
                key={match.matchId}
                match={match}
              ></MatchHistoryCard>
            ))}
          </ScrollableContainer>
        </CardContent>
      </CardDescription>
    </Card>
  );
}
