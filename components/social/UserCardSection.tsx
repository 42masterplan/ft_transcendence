import ScrollableContainer from '../container/ScrollableContainer';
import SocialCard from '../card/cardUsedInSocialPage/SocialCard';
import {Accordion} from '../shadcn/ui/accordion';
import type {userType} from '@/types/user';
import type {
  socialPageTargetUser as target,
  socialPageUserStatus as status
} from '@/types/social';
import {useEffect, useState} from 'react';
// function to filter users. Returns filtered users.
function filterUsers(
  users: userType[],
  searchTargetStatus: status,
  searchTargetInput: string
) {
  if (searchTargetStatus === 'Online') {
    users = users.filter((user) => user.currentState === 'Online');
  } else if (searchTargetStatus === 'Offline') {
    users = users.filter((user) => user.currentState === 'Offline');
  } else if (searchTargetStatus === 'InGame') {
    users = users.filter((user) => user.currentState === 'InGame');
  }
  // filter input
  if (searchTargetInput !== '') {
    users = users.filter((user) =>
      user.name.toLowerCase().includes(searchTargetInput.toLowerCase())
    );
  }
  return users;
}

interface UserCardSectionProps {
  allUsers: userType[];
  friends: userType[];
  searchTarget: target;
  searchTargetStatus: status;
  searchTargetInput: string;
  className?: string;
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

  const [users, setUsers] = useState<userType[]>([]);
  useEffect(() => {
    if (searchTarget === 'all users') {
      setUsers(filterUsers(allUsers, searchTargetStatus, searchTargetInput));
    } else {
      setUsers(filterUsers(friends, searchTargetStatus, searchTargetInput));
    }
  }, [searchTarget]);

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
              isFriend={false}
              isBlocked={false}
            />
          ))}
      </Accordion>
    </ScrollableContainer>
  );
}
