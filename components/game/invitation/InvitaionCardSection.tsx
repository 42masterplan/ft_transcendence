import ScrollableContainer from '@/components/container/ScrollableContainer';
import InvitationCard from './InvitationCard';
import {Accordion} from '@/components/shadcn/ui/accordion';
import type {userType} from '@/types/user';
import {useEffect, useState} from 'react';
import useAxios from '@/hooks/useAxios';
// function to filter users. Returns filtered users.

//TODO: 추후에 status별로 따로 요청 또는 소켓 통해서 사용자 상태 업데이트

interface UserCardSectionProps {
  friends: userType[];
  searchTargetInput: string;
  className?: string;
}

function filterUsers(users: userType[], searchTargetInput: string) {
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

export default function InvitaionCardSection({
  friends,
  searchTargetInput,
  className = ''
}: UserCardSectionProps) {
  const [users, setUsers] = useState<userType[]>([]);

  useEffect(() => {
    setUsers(filterUsers(friends, searchTargetInput));
  }, [searchTargetInput, friends]);
  return (
    <ScrollableContainer className={` ${className}`}>
      <Accordion
        type='multiple'
        className='flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-5'
      >
        {users &&
          users.map((user) => (
            <InvitationCard
              key={user.id}
              id={user.id}
              profileImage={user.profileImage}
              name={user.name}
              currentStatus={user.currentStatus}
              introduction={user.introduction}
              isFriend={isUserIdInArray(user.id, friends)}
              isBlocked={isUserIdInArray(user.id, [])}
            />
          ))}
      </Accordion>
    </ScrollableContainer>
  );
}
