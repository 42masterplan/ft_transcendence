import Router from 'next/router';
import ScrollableContainer from '@/components/container/ScrollableContainer';
import UserInfoCard from '@/components/card/userInfoCard/UserInfoCard';
import {useEffect, useState} from 'react';
import useAxios from '@/hooks/useAxios';
import GameStatsSection from '@/components/sections/userInfoPage/GameStatsSection';
import AchievementSection from '@/components/sections/userInfoPage/AchievementSection';
import MatchHistorySection from '@/components/sections/userInfoPage/MatchHistorySection';
import {User} from '@/classes/User';
import SpinningLoader from '@/components/loader/SpinningLoader';

export default function UserPage() {
  const router = Router;
  // get user name from url
  const userName = router.query.userName as string;
  const {fetchData, response, isSuccess, loading, error} = useAxios();
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
      url: `/users/info/${userName}`,
      errorTitle: '유저 정보 조회 실패',
      errorDescription: '유저 정보 조회에 실패했습니다.',
      disableSuccessToast: true
    });
  }, [userName]);
  useEffect(() => {
    if (error === true) {
      // user not found -> redirect to 404 page
      router.push('/404');
    }
    if (isSuccess === true) {
      // when user is found

      const tmp = new User();
      tmp.id = response.id;
      tmp.name = response.name;
      tmp.profileImage = response.profileImage;
      tmp.currentStatus = response.currentStatus;
      tmp.introduction = response.introduction;
      setCurrentUser(tmp);
    }
  }, [isSuccess, response]);

  const animation = 'm-2 hover:scale-[1.02] duration-200 hover:-translate-y-1';

  // render --------------------------------------------------------------------

  if (loading === true) {
    return (
      <>
        <div className='flex w-full items-center justify-center'>
          <SpinningLoader />
        </div>
      </>
    );
  } else {
    return (
      <>
        <ScrollableContainer className='w-full max-w-5xl'>
          <div className='p-4'>
            <UserInfoCard
              userInfo={currentUser}
              size='lg'
              side='left'
              printIntro
              showStatus={false}
              stretch
              className={`${animation}`}
            />
          </div>
          <GameStatsSection userName={currentUser.name} className={animation} />
          <div className='flex flex-col sm:flex-row gap-3 w-full'>
            <AchievementSection
              userName={currentUser.name}
              className={`flex-1 ${animation}`}
            />
            <MatchHistorySection
              userName={currentUser.name}
              className={`flex-1 ${animation}`}
            />
          </div>
        </ScrollableContainer>
      </>
    );
  }
}
