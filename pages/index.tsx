// This page will be redirected to logged in user's page.

import Router from 'next/router';
import useAxios from '@/hooks/useAxios';
import {useEffect, useState} from 'react';
import SpinningLoader from '@/components/loader/SpinningLoader';
import {User} from '@/lib/classes/User';
import ScrollableContainer from '@/components/container/ScrollableContainer';
import UserInfoCard from '@/components/card/userInfoCard/UserInfoCard';
import GameStatsSection from '@/components/sections/userInfoPage/GameStatsSection';
import AchievementSection from '@/components/sections/userInfoPage/AchievementSection';
import MatchHistorySection from '@/components/sections/userInfoPage/MatchHistorySection';

export default function HomePage() {
  const router = Router;
  // userName
  const {
    fetchData: fetchUserName,
    response: responseUserName,
    isSuccess: isSuccessUserName,
    loading: loadingUserName,
    error: errorUserName
  } = useAxios();
  // user info
  const {
    fetchData: fetchUserInfo,
    response: responseUserInfo,
    isSuccess: isSuccessUserInfo,
    loading: loadingUserInfo,
    error: errorUserInfo
  } = useAxios();
  const [currentUser, setCurrentUser] = useState<User>(new User());

  // fetch data from server ----------------------------------------------------

  /**
   * API: GET /users/myName
   * @returns name: string
   * @description
   * * Get current user's name
   * * response:
   * * * name: string
   * * error: 404 if user does not exist
   * * error: 500 if server error
   */
  useEffect(() => {
    fetchUserName({
      method: 'get',
      url: '/users/myName',
      errorTitle: '유저 정보 조회 실패',
      errorDescription: '유저 정보 조회에 실패했습니다.'
    });
  }, []);
  useEffect(() => {
    if (errorUserName === true) {
      // user not found -> redirect to 404 page
      router.push('/404');
    }
    if (isSuccessUserName === true) {
      // when user is found -> fetch user info
      fetchUserInfo({
        method: 'get',
        url: '/users/info/' + responseUserName?.name,
        errorTitle: '유저 정보 조회 실패',
        errorDescription: '유저 정보 조회에 실패했습니다.',
        disableSuccessToast: true
      });
    }
  }, [errorUserName, isSuccessUserName, responseUserName]);

  useEffect(() => {
    if (errorUserInfo === true) {
      // user not found -> redirect to 404 page
      router.push('/404');
    }
    if (isSuccessUserInfo === true) {
      // when user is found
      const tmp = new User();
      tmp.id = responseUserInfo.id;
      tmp.name = responseUserInfo.name;
      tmp.profileImage = responseUserInfo.profileImage;
      tmp.currentStatus = responseUserInfo.currentStatus;
      tmp.introduction = responseUserInfo.introduction;
      setCurrentUser(tmp);
    }
  }, [isSuccessUserInfo, responseUserInfo]);

  const animation = 'm-2 hover:scale-[1.02] duration-200 hover:-translate-y-1';

  // render --------------------------------------------------------------------

  if (loadingUserInfo === true) {
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
