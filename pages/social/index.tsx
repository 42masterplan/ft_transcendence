import * as API from '@/DummyBackend/socialAPI';
import {signal, effect, Signal} from '@preact/signals-react';
import SocialCard from '@/components/card/cardUsedInSocialPage/SocialCard';

import * as React from 'react';
import {
  target,
  status,
  SocialPageNavBar
} from '@/components/social/SocialPageNavBar';
import {ScrollArea} from '@/components/shadcn/ui/scroll-area';

const searchTarget = signal<target>('friend');
const searchTargetStatus = signal<status>('All');
const searchTargetInput = signal<string>('');

interface UserCardSectionProps {
  users: API.user[];
  className?: string;
}

function filterUsers(users: API.user[]): API.user[] {
  // filter friends
  if (searchTarget.value === 'friend') {
    users = users.filter((user) => user.isFriend);
  }
  // filter status
  if (searchTargetStatus.value === 'Online') {
    users = users.filter((user) => user.currentStatus === 'Online');
  } else if (searchTargetStatus.value === 'Offline') {
    users = users.filter((user) => user.currentStatus === 'Offline');
  } else if (searchTargetStatus.value === 'InGame') {
    users = users.filter((user) => user.currentStatus === 'InGame');
  }
  // filter input
  if (searchTargetInput.value !== '') {
    users = users.filter((user) =>
      user.name.toLowerCase().includes(searchTargetInput.value.toLowerCase())
    );
  }
  return users;
}

function UserCardSection({users, className = ''}: UserCardSectionProps) {
  let filteredUsers = filterUsers(users);
  effect(() => {
    console.log(
      `searchTarget: ${searchTarget.value}, \nsearchTargetStatus: ${searchTargetStatus.value}, \nsearchTargetInput: ${searchTargetInput.value}`
    ); // TEST
    filteredUsers = filterUsers(users);
    console.log(filteredUsers); // TEST
  });
  return (
    <ScrollArea
      className={`h-[200px] w-[350px] rounded-md border p-4 ${className}`}
    >
      {filteredUsers.map((user) => (
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
      ))}
    </ScrollArea>
  );
}

function DMSection() {
  return (
    <div>
      <p>This is DM Section</p>
    </div>
  );
}

export default function SocialPage() {
  console.log('render social page');
  // get users from backend
  const users = API.social__getUsers();
  return (
    <>
      <SocialPageNavBar
        searchTarget={searchTarget}
        searchTargetStatus={searchTargetStatus}
        searchTargetInput={searchTargetInput}
      />
      <div className='flex flex-row w-full'>
        <UserCardSection users={users} />
        <DMSection />
      </div>
    </>
  );
}
