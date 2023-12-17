import ScrollableContainer from '@/components/container/ScrollableContainer';
import InvitationCard from './InvitationCard';
import {Accordion} from '@/components/shadcn/ui/accordion';
import type {userType} from '@/types/user';
import {useEffect, useState} from 'react';
import useAxios from '@/hooks/useAxios';

interface InvitationCardSectionProps {
  friends: userType[];
  searchTargetInput: string;
  className?: string;
  theme?: string;
  setIsWaiting: any;
  startNormalMatchMaking: any;
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

export default function InvitationCardSection({
  friends,
  searchTargetInput,
  className = '',
  theme,
  setIsWaiting,
  startNormalMatchMaking
}: InvitationCardSectionProps) {
  const [users, setUsers] = useState<userType[]>([]);
  const {fetchData, response, isSuccess} = useAxios();
  function handleCardClick(
    userId: string,
    theme: string | undefined,
    setIsWaiting: any,
    startNormalMatchMaking: any
  ) {
    console.log('useId: ', userId, 'theme: ', theme);
    setIsWaiting(true);
    startNormalMatchMaking();
  }
  useEffect(() => {
    setUsers(filterUsers(friends, searchTargetInput));
  }, [searchTargetInput, friends]);
  return (
    <ScrollableContainer className={`${className}`}>
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
                handleCardClick(
                  user.id,
                  theme,
                  setIsWaiting,
                  startNormalMatchMaking
                )
              }
            />
          ))}
      </Accordion>
    </ScrollableContainer>
  );
}
