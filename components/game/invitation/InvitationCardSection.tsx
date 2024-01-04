import ScrollableContainer from '@/components/container/ScrollableContainer';
import InvitationCard from './InvitationCard';
import {Accordion} from '@/components/shadcn/ui/accordion';
import type {userType} from '@/types/user';
import {useEffect, useState} from 'react';

interface InvitationCardSectionProps {
  friends: userType[];
  searchTargetInput: string;
  theme: string;
  setIsWaiting: any;
  startNormalMatchMaking: any;
}

function filterUsers(users: userType[], searchTargetInput: string) {
  // filter input
  if (searchTargetInput !== '') {
    users = users.filter((user) =>
      user?.name?.toLowerCase()?.includes(searchTargetInput?.toLowerCase())
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
  theme,
  startNormalMatchMaking
}: InvitationCardSectionProps) {
  const [users, setUsers] = useState<userType[]>([]);
  function handleCardClick(
    userId: string,
    theme: string,
    startNormalMatchMaking: any
  ) {
    startNormalMatchMaking({userId, theme});
  }
  useEffect(() => {
    setUsers(filterUsers(friends, searchTargetInput));
  }, [searchTargetInput, friends]);
  return (
    <ScrollableContainer>
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
                handleCardClick(user.id, theme, startNormalMatchMaking)
              }
            />
          ))}
      </Accordion>
    </ScrollableContainer>
  );
}
