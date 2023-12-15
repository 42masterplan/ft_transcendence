import ScrollableContainer from '@/components/container/ScrollableContainer';
import InvitationCard from './InvitationCard';
import {Accordion} from '@/components/shadcn/ui/accordion';
import type {userType} from '@/types/user';
import {useEffect, useState} from 'react';
import useAxios from '@/hooks/useAxios';
import {startNormalMatchMaking} from '../matchmaking/NormalMatchMaking';

interface InvitationCardSectionProps {
  friends: userType[];
  searchTargetInput: string;
  className?: string;
  theme?: string;
  setIsWaiting: any;
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

function handleCardClick(
  userId: string,
  fetchData: any,
  theme: string | undefined,
  setIsWaiting: any
) {
  console.log('useId: ', userId, 'theme: ', theme);
  setIsWaiting(true);
  startNormalMatchMaking();
  // TODO: Add invitation request with socket -> 구현 예정인 알림 소켓을 활용할 수 있을 것임. 그때 구현
}

export default function InvitationCardSection({
  friends,
  searchTargetInput,
  className = '',
  theme,
  setIsWaiting
}: InvitationCardSectionProps) {
  const [users, setUsers] = useState<userType[]>([]);
  const {fetchData, response, isSuccess} = useAxios();

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
              onClick={() =>
                handleCardClick(user.id, fetchData, theme, setIsWaiting)
              }
            />
          ))}
      </Accordion>
    </ScrollableContainer>
  );
}
