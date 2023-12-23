import Router from 'next/router';
import ScrollableContainer from '@/components/container/ScrollableContainer';
import UserInfoCard from '@/components/card/userInfoCard/UserInfoCard';
import {useEffect, useState} from 'react';
import useAxios from '@/hooks/useAxios';
import GameStatsSection from '@/components/sections/userInfoPage/GameStatsSection';
import AchievementSection from '@/components/sections/userInfoPage/AchievementSection';
import MatchHistorySection from '@/components/sections/userInfoPage/MatchHistorySection';
import {User} from '@/lib/classes/User';
import SpinningLoader from '@/components/loader/SpinningLoader';

export default function UserPage() {
  const router = Router;
  // get user name from url
  const userName = router.query.userName as string;
  const {fetchData, response, isSuccess, loading} = useAxios();
  const [currentUser, setCurrentUser] = useState<User>(new User());

  // fetch data from server ----------------------------------------------------

  /**
   * API: GET /users
   * @param name: string
   * @returns UserInfo
   * @description
   * * Get user info by name
   * * response:
   * * * id: string
   * * * name: string
   * * * profileImage: string
   * * * currentStatus: userStatus ['on-line' | 'off-line' | 'in-Game' | 'AFK'] (string)
   * * * introduction: string
   * * error: 404 if user does not exist
   * * error: 500 if server error
   */
  useEffect(() => {
    if (userName === undefined) {
      return;
    }
    fetchData({
      method: 'get',
      url: '/users',
      params: {
        name: userName
      },
      errorTitle: '유저 정보 조회 실패',
      errorDescription: '유저 정보 조회에 실패했습니다.'
    });
  }, [userName]);
  useEffect(() => {
    if (isSuccess === true) {
      // when user is found
      currentUser.id = response.id;
      currentUser.name = response.name;
      currentUser.profileImage = response.profileImage;
      currentUser.currentStatus = response.currentStatus;
      currentUser.introduction = response.introduction;
      setCurrentUser(currentUser);
    } else {
      // user not found -> redirect to 404 page
      router.push('/404');
    }
  }, [isSuccess, response]);

  // render --------------------------------------------------------------------

  if (loading === true) {
    return (
      <>
        <div className='flex w-full items-center justify-center'>
          <SpinningLoader />
        </div>
      </>
    );
  }

  return (
    <>
      <ScrollableContainer className='w-full h-96 sm:h-84'>
        <UserInfoCard
          userInfo={currentUser}
          size='lg'
          printIntro
          stretch
          className={`m-2 hover:scale-[1.02] duration-200 hover:-translate-y-1 `}
        />
        <div className='flex flex-col sm:flex-row gap-2 sm:gap-0 h-full'>
          <div className='flex flex-col flex-1 h-full justify-evenly'>
            {/* left side */}
            <GameStatsSection userName={currentUser.name} />
            <AchievementSection userName={currentUser.name} />
          </div>
          <div className='flex flex-col flex-1 h-full justify-evenly'>
            {/* right side */}
            <MatchHistorySection userName={currentUser.name} />
          </div>
        </div>
      </ScrollableContainer>
    </>
  );
}
