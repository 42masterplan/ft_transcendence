import ScrollableContainer from '@/components/container/ScrollableContainer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/shadcn/ui/card';

import useAxios from '@/hooks/useAxios';
import {useEffect, useState} from 'react';
import SpinningLoader from '@/components/loader/SpinningLoader2';
import {challenge} from './forDataFetching/interfaces';
import AchievementCard from '@/components/card/cardUsedInHomePage/AchievementCard';

interface AchievementSectionProps {
  userName: string;
  className?: string;
}

export default function AchievementSection({
  userName,
  className = ''
}: AchievementSectionProps) {
  const {fetchData, response, isSuccess, loading} = useAxios();
  const [achievements, setAchievements] = useState<challenge[]>([]);

  // fetch data from server -----------------------------------------------------

  /**
   * API: GET /users/challenges
   * @param name: string
   * @returns challenge[]
   * @description
   * * Get user challenges by name
   * * response:
   * * * challenge[]
   * * * Challenge:
   * * * * name: string
   * * * * description: string
   * * * * progressRate: number
   * * error: 404 if user does not exist
   * * error: 500 if server error
   */

  useEffect(() => {
    if (userName === undefined || userName === '' || userName === null) {
      return;
    }
    fetchData({
      method: 'get',
      url: '/users/challenges/' + userName,
      errorTitle: '유저 정보 조회 실패',
      errorDescription: '유저 정보 조회에 실패했습니다.'
    });
  }, [userName]);
  useEffect(() => {
    if (isSuccess === true) {
      setAchievements(response);
    }
  }, [isSuccess, response]);

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
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollableContainer className='h-[50vh]'>
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.name} challenge={achievement} />
          ))}
        </ScrollableContainer>
      </CardContent>
    </Card>
  );
}
