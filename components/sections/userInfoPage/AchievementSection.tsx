import ScrollableContainer from '@/components/container/ScrollableContainer';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/shadcn/ui/card';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/shadcn/ui/tabs';

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
   * * * * achieveRatio: number
   * * error: 404 if user does not exist
   * * error: 500 if server error
   */

  useEffect(() => {
    if (userName === undefined) {
      return;
    }
    fetchData({
      method: 'get',
      url: '/users/challenges',
      params: {
        name: userName
      },
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
      <Card
        className={`m-2 hover:scale-[1.02] duration-200 hover:-translate-y-1 h-96 sm:h-full ${className}`}
      >
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent className='flex justify-center items-center h-full'>
          <SpinningLoader />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`m-2 hover:scale-[1.02] duration-200 hover:-translate-y-1 h-96 sm:h-full ${className}`}
    >
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='myProgress' className='px-2'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='myProgress'>My progress</TabsTrigger>
            <TabsTrigger value='successRate'>Success rate</TabsTrigger>
          </TabsList>
          <TabsContent value='myProgress'>
            <ScrollableContainer className='w-full h-96 sm:h-84'>
              <CardContent className='flex flex-col gap-3'>
                {achievements.map((achievement) => (
                  <AchievementCard
                    key={achievement.name}
                    achievementRate={achievement}
                    type='myProgress'
                  />
                ))}
              </CardContent>
            </ScrollableContainer>
          </TabsContent>
          <TabsContent value='successRate'>
            <ScrollableContainer className='w-full h-96 sm:h-84'>
              <CardContent className='flex flex-col gap-3'>
                {achievements.map((achievement) => (
                  <AchievementCard
                    key={achievement.name}
                    achievementRate={achievement}
                    type='successRate'
                  />
                ))}
              </CardContent>
            </ScrollableContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
