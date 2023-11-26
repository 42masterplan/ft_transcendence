import * as API from '@/DummyBackend/socialAPI';
import {
  socialPageTargetUser as target,
  socialPageUserStatus as status
} from '@/lib/types';
import ScrollableContainer from '../container/ScrollableContainer';
import SocialCard from '../card/cardUsedInSocialPage/SocialCard';
import {Accordion} from '../shadcn/ui/accordion';

// function to filter users. Returns filtered users.
function filterUsers(
  users: API.user[],
  searchTarget: target,
  searchTargetStatus: status,
  searchTargetInput: string
): API.user[] {
  // filter friends
  if (searchTarget === 'friend') {
    users = users.filter((user) => user.isFriend);
  }
  // filter status
  if (searchTargetStatus === 'Online') {
    users = users.filter((user) => user.currentStatus === 'Online');
  } else if (searchTargetStatus === 'Offline') {
    users = users.filter((user) => user.currentStatus === 'Offline');
  } else if (searchTargetStatus === 'InGame') {
    users = users.filter((user) => user.currentStatus === 'InGame');
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
  users: API.user[];
  searchTarget: target;
  searchTargetStatus: status;
  searchTargetInput: string;
  className?: string;
}

export default function UserCardSection({
  users,
  searchTarget,
  searchTargetStatus,
  searchTargetInput,
  className = ''
}: UserCardSectionProps) {
  // filter users
	
  users = filterUsers(
    users,
    searchTarget,
    searchTargetStatus,
    searchTargetInput
  );
  return (
    <ScrollableContainer className={` ${className}`}>
      <Accordion
        type='multiple'
        className='flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-5'
      >
        {/* {users.map((user) => (
          <SocialCard
            key={user.id}
            id={user.id}
            profileImage={user.profileImage}
            name={user.name}
            currentStatus={user.currentStatus}
            introduction={user.introduction}
            isFriend={user.isFriend}
            isBlocked={user.isBlocked}
          />
        ))} */}
      </Accordion>
    </ScrollableContainer>
  );
}
