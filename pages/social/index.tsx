import * as API from '@/DummyBackend/socialAPI';

import {
  socialPageTargetUser as target,
  socialPageUserStatus as status
} from '@/lib/types';
import {SocialPageNavBar} from '@/components/social/SocialPageNavBar';
import UserCardSection from '@/components/social/UserCardSection';
import SpinningLoader from '@/components/loader/SpinningLoader';
import useAxios from '@/hooks/useAxios';
import {useEffect, useState} from 'react';
export default function SocialPage() {
  // search options
  const [searchTarget, setSearchTarget] = useState<target>('friend');
  const [searchTargetStatus, setSearchTargetStatus] = useState<status>('All');
  const [searchTargetInput, setSearchTargetInput] = useState('');
  const {fetchData, response, isSuccess} = useAxios();
  // user data
  const [users, setUsers] = useState<API.user[]>([]);
  const [loading, setLoading] = useState(true);
  async function getUserData() {
    const users = await API.social__getUsersAsync();
    setUsers(users);
  }
  useEffect(() => {
    if (searchTarget === 'friend') {
      fetchData({
        method: 'get',
        url: '/users/friends',
        params: {
          id: '1'
        },
        errorTitle: '유저 정보 조회 실패',
        errorDescription: '유저 정보 조회에 실패했습니다.'
      });
    } else if (searchTarget === 'all users') {
      fetchData({
        method: 'get',
        url: '/users/all',
        errorTitle: '유저 정보 조회 실패',
        errorDescription: '유저 정보 조회에 실패했습니다.'
      });
      // getUserData();
    }
  }, [searchTarget, searchTargetStatus]);
  useEffect(() => {
    if (isSuccess === true) {
      setUsers(response);
      setLoading(false);
      console.log('로딩끝', response);
    }
  }, [isSuccess, response]);

  // TEST: TODO: erase this ----------------------------------------------------
  if (loading == true) return <SpinningLoader />;
  return (
    <div className='flex flex-col w-full h-full px-3 gap-2'>
      <SocialPageNavBar
        searchTarget={searchTarget}
        setSearchTarget={setSearchTarget}
        setSearchTargetStatus={setSearchTargetStatus}
        setSearchTargetInput={setSearchTargetInput}
      />
      <UserCardSection
        users={users}
        searchTargetStatus={searchTargetStatus}
        searchTargetInput={searchTargetInput}
      />
    </div>
  );
}
