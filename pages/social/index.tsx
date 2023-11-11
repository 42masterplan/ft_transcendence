import ResponsiveContainer from '@/components/container/ResponsiveContainer';
import {Button} from '@/components/shadcn/ui/button';
import {Input} from '@/components/shadcn/ui/input';
import {Switch} from '@/components/shadcn/ui/switch';
import {Search} from 'lucide-react';
import * as API from '@/DummyBackend/socialAPI';
import {signal, effect, Signal} from '@preact/signals-react';
import SocialCard from '@/components/card/cardUsedInSocialPage/SocialCard';

import * as React from 'react';
import ScrollableContainer from '@/components/container/ScrollableContainer';
import {
  target,
  status,
  SocialPageNavBar
} from '@/components/social/SocialPageNavBar';

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
    <ScrollableContainer>
      <ResponsiveContainer
        className={`flex flex-col gap-5 w-full px-3 py-3 ${className}`}
      >
        <div></div>
        {filteredUsers.map((user) => (
          <SocialCard
            id={user.id}
            profileImage={user.profileImage}
            name={user.name}
            currentStatus={user.currentStatus}
            introduction={user.introduction}
            isFriend={user.isFriend}
            isBlocked={user.isBlocked}
          />
        ))}
      </ResponsiveContainer>
    </ScrollableContainer>
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
      <UserCardSection users={users} />
    </>
  );
}
