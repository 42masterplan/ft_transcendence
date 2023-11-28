import ScrollableContainer from '../container/ScrollableContainer';
import SocialCard from '../card/cardUsedInSocialPage/SocialCard';
import {Accordion} from '../shadcn/ui/accordion';
import type {userType} from '@/types/user';
import type {
  socialPageTargetUser as target,
  socialPageUserStatus as status
} from '@/types/social';
import {useEffect, useState} from 'react';
import useAxios from '@/hooks/useAxios';
// function to filter users. Returns filtered users.

//TODO: 추후에 status별로 따로 요청 또는 소켓 통해서 사용자 상태 업데이트

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
    users = users.filter((user) => user.currentState === 'on-line');
  } else if (searchTargetStatus === 'off-line') {
    users = users.filter((user) => user.currentState === 'off-line');
  } else if (searchTargetStatus === 'in-game') {
    users = users.filter((user) => user.currentState === 'in-game');
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

export default function UserCardSection({
  allUsers,
  friends,
  searchTarget,
  searchTargetStatus,
  searchTargetInput,
  className = ''
}: UserCardSectionProps) {
  // filter users
  const {fetchData, response, isSuccess, loading} = useAxios();
  const [blockUsers, setBlockUsers] = useState<userType[]>([]);
  const [users, setUsers] = useState<userType[]>([]);

  useEffect(() => {
    if (searchTarget === 'all users') {
      setUsers(filterUsers(allUsers, searchTargetStatus, searchTargetInput));
    } else {
      setUsers(filterUsers(friends, searchTargetStatus, searchTargetInput));
    }
    fetchData({
      method: 'get',
      url: '/users/block',
      errorTitle: 'block 조회 실패',
      errorDescription: 'block 정보 조회에 실패했습니다.',
      disableSuccessToast: true
    });
  }, [searchTarget, searchTargetStatus, searchTargetInput, allUsers, friends]);
  useEffect(() => {
    if (isSuccess === true) {
      setBlockUsers(response);
    }
  }, [loading, isSuccess, response]);
  if (loading == true) return null;
  return (
    <ScrollableContainer className={` ${className}`}>
      <Accordion
        type='multiple'
        className='flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-5'
      >
        {users &&
          users.map((user) => (
            <SocialCard
              key={user.id}
              id={user.id}
              profileImage={user.profileImage}
              name={user.name}
              currentStatus={user.currentState}
              introduction={user.introduction}
              isFriend={isUserIdInArray(user.id, friends)}
              isBlocked={isUserIdInArray(user.id, blockUsers)}
            />
          ))}
      </Accordion>
    </ScrollableContainer>
  );
}
