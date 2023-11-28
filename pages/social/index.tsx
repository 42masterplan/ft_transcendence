import {userType} from '@/types/user';
import {
  socialPageTargetUser as target,
  socialPageUserStatus as status
} from '@/types/social';
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
  const [allUsers, setAllUsers] = useState<userType[]>([]);
  const [friends, setFriends] = useState<userType[]>([]);
  // fetch data
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
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
        url: '/users',
        params: {
          state: 'on-line'
        },
        errorTitle: '유저 정보 조회 실패',
        errorDescription: '유저 정보 조회에 실패했습니다.'
      });
    }
  }, [searchTarget, searchTargetStatus]);
  useEffect(() => {
    if (isSuccess === true) {
      if (searchTarget === 'all users') setAllUsers(response);
      if (searchTarget === 'friend') setFriends(response);
      console.log('로딩끝', response);
      setLoading(false);
    }
  }, [isSuccess, response]);

  if (loading == true) return <SpinningLoader />;
  return (
    <div className='flex flex-col w-full h-full px-3 gap-2'>
      <SocialPageNavBar
        searchTarget={searchTarget}
        searchTargetStatus={searchTargetStatus}
        setSearchTarget={setSearchTarget}
        setSearchTargetStatus={setSearchTargetStatus}
        setSearchTargetInput={setSearchTargetInput}
      />
      <UserCardSection
        allUsers={allUsers}
        friends={friends}
        searchTarget={searchTarget}
        searchTargetStatus={searchTargetStatus}
        searchTargetInput={searchTargetInput}
      />
    </div>
  );
}
