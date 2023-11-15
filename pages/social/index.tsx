import * as API from '@/DummyBackend/socialAPI';

import * as React from 'react';
import {
  socialPageTargetUser as target,
  socialPageUserStatus as status
} from '@/lib/types';
import {SocialPageNavBar} from '@/components/social/SocialPageNavBar';
import UserCardSection from '@/components/social/UserCardSection';
import SpinningLoader from '@/components/loader/SpinningLoader';

export default function SocialPage() {
  // search options
  const [searchTarget, setSearchTarget] = React.useState<target>('friend');
  const [searchTargetStatus, setSearchTargetStatus] =
    React.useState<status>('All');
  const [searchTargetInput, setSearchTargetInput] = React.useState<string>('');

  // user data
  const [users, setUsers] = React.useState<API.user[]>([]);
  async function getUserData() {
    const users = await API.social__getUsersAsync();
    setUsers(users);
  }
  getUserData();

  // TEST: TODO: erase this ----------------------------------------------------

  console.log('render social page');
  React.useEffect(() => {
    console.log(
      "SocialPage's useEffect[searchTarget, searchTargetStatus, searchTargetInput]"
    );
    console.log('Search target: ', searchTarget);
    console.log('Search target status: ', searchTargetStatus);
    console.log('Search target input: ', searchTargetInput);
  }, [searchTarget, searchTargetStatus, searchTargetInput]);
  React.useEffect(() => {
    console.log("SocialPage's useEffect[users]");
    console.log('Users: ', users);
  }, [users]);

  // TEST: TODO: erase this ----------------------------------------------------

  return (
    <>
      <div className='flex flex-col w-full h-full px-3 gap-2'>
        <SocialPageNavBar
          searchTarget={searchTarget}
          setSearchTarget={setSearchTarget}
          searchTargetStatus={searchTargetStatus}
          setSearchTargetStatus={setSearchTargetStatus}
          searchTargetInput={searchTargetInput}
          setSearchTargetInput={setSearchTargetInput}
        />
        {users.length > 0 ? (
          <UserCardSection
            users={users}
            searchTarget={searchTarget}
            searchTargetStatus={searchTargetStatus}
            searchTargetInput={searchTargetInput}
          />
        ) : (
          <SpinningLoader />
        )}
      </div>
    </>
  );
}
