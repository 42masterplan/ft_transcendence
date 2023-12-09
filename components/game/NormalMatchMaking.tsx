import ScrollableContainer from '../container/ScrollableContainer';
import {Button} from '@/components/shadcn/ui/button';
import {Dialog, DialogContent, DialogTrigger} from './MatchMakingDialog';
import {SocialPageNavBar} from '@/components/social/SocialPageNavBar';
import {userType} from '@/types/user';
import {
  socialPageTargetUser as target,
  socialPageUserStatus as status
} from '@/types/social';
import useAxios from '@/hooks/useAxios';
import {useEffect, useState} from 'react';
import InvitaionCardSection from './InvitaionCardSection';

interface UserCardSectionProps {
  allUsers: userType[];
  friends: userType[];
  searchTarget: target;
  searchTargetStatus: status;
  searchTargetInput: string;
  className?: string;
}

function filterUsers(
  users: userType[],
  searchTargetStatus: status,
  searchTargetInput: string
) {
  if (searchTargetStatus === 'on-line') {
    users = users.filter((user) => user.currentStatus === 'on-line');
  } else if (searchTargetStatus === 'off-line') {
    users = users.filter((user) => user.currentStatus === 'off-line');
  } else if (searchTargetStatus === 'in-game') {
    users = users.filter((user) => user.currentStatus === 'in-game');
  }
  // filter input
  if (searchTargetInput !== '') {
    users = users.filter((user) =>
      user.name.toLowerCase().includes(searchTargetInput.toLowerCase())
    );
  }
  return users;
}

function isUserIdInArray(userId: string, array: userType[]) {
  return array.some((user) => user.id === userId);
}

export default function NormalMatchMakingBtn({}: UserCardSectionProps) {
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Start Match</Button>
      </DialogTrigger>
      <DialogContent
        className='w-[480px] h-[500px] bg-slate-400 rounded-[10px] shadow flex-col 
      justify-center items-center gap-[110px] inline-flex'
      >
        <div className='flex flex-col w-full h-full px-3 gap-2'>
          <SocialPageNavBar
            searchTarget={searchTarget}
            searchTargetStatus={searchTargetStatus}
            setSearchTarget={setSearchTarget}
            setSearchTargetStatus={setSearchTargetStatus}
            setSearchTargetInput={setSearchTargetInput}
          />
          <InvitaionCardSection
            allUsers={allUsers}
            friends={friends}
            searchTarget={searchTarget}
            searchTargetStatus={searchTargetStatus}
            searchTargetInput={searchTargetInput}
            className=''
          />
          {/* <ScrollableContainer className={''}>
            <InvitationCard
              id={'1'}
              name='test'
              introduction='test'
              isFriend={true}
              isBlocked={false}
              currentStatus='online'
              profileImage=''
            />
          </ScrollableContainer> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
