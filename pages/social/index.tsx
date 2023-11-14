import * as API from '@/DummyBackend/socialAPI';
import {signal, effect, Signal} from '@preact/signals-react';

import * as React from 'react';
import {
  socialPageTargetUser as target,
  socialPageUserStatus as status
} from '@/lib/types';
import {SocialPageNavBar} from '@/components/social/SocialPageNavBar';
import UserCardSection from '@/components/social/UserCardSection';
import DMSection from '@/components/social/DMSection';

export default function SocialPage() {
  // search options
  const searchTarget = signal<target>('friend');
  const searchTargetStatus = signal<status>('All');
  const searchTargetInput = signal<string>('');

  console.log('render social page');
  // get users from backend
  const users = API.social__getUsers();
  return (
    <>
      <div className='flex flex-col w-full h-full px-3 gap-2'>
        <SocialPageNavBar
          searchTarget={searchTarget}
          searchTargetStatus={searchTargetStatus}
          searchTargetInput={searchTargetInput}
        />
        <UserCardSection
          users={users}
          searchTarget={searchTarget}
          searchTargetStatus={searchTargetStatus}
          searchTargetInput={searchTargetInput}
          className='w-full'
        />
      </div>
    </>
  );
}
