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
  useEffect(() => {
    fetchData({
      method: 'get',
      url: '/users/friends',
      params: {
        id: '1'
      },
      errorTitle: '유저 정보 조회 실패',
      errorDescription: '유저 정보 조회에 실패했습니다.'
    });
  }, []);
  useEffect(() => {
    if (isSuccess === true) {
      setUsers(response.data);
      setLoading(false);
      console.log(response.data);
    }
  }, [isSuccess, response]);

  // TEST: TODO: erase this ----------------------------------------------------
  if (loading == true) return <SpinningLoader />;
  return (
    <div className='flex flex-col w-full h-full px-3 gap-2'>
      <SocialPageNavBar
        searchTarget={searchTarget}
        setSearchTarget={setSearchTarget}
        searchTargetStatus={searchTargetStatus}
        setSearchTargetStatus={setSearchTargetStatus}
        searchTargetInput={searchTargetInput}
        setSearchTargetInput={setSearchTargetInput}
      />
      <UserCardSection
        users={users}
        searchTarget={searchTarget}
        searchTargetStatus={searchTargetStatus}
        searchTargetInput={searchTargetInput}
      />
    </div>
  );
}
