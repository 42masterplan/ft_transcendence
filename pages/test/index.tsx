import UserInfoCard from '@/components/card/userInfoCard/UserInfoCard';
import {User} from '@/lib/classes/User';
import * as Type from '@/lib/types';
import * as API from '@/DummyBackend/mainAPI';
import ScrollableContainer from '@/components/container/ScrollableContainer';

export default function TestPage() {
  console.log('render test page');

  // get user info from server
  const userInfo = API.main__getUserInfo();
  const currentUser = new User();
  // push data to currentUser
  currentUser.id = userInfo.id;
  currentUser.name = userInfo.name;
  currentUser.profileImage = userInfo.profileImage;
  currentUser.currentStatus = userInfo.currentStatus as Type.userStatus;
  currentUser.introduction = userInfo.introduction;
  return (
    <ScrollableContainer className='bg-custom2 w-full px-10'>
      <UserInfoCard
        userInfo={currentUser}
        size='lg'
        printIntro
        className='m-2 hover:scale-[1.02] duration-200 hover:-translate-y-1 bg-custom3'
      />
      <UserInfoCard
        userInfo={currentUser}
        size='lg'
        printIntro
        className='m-2 hover:scale-[1.02] duration-200 hover:-translate-y-1 bg-custom3'
      />
      <UserInfoCard
        userInfo={currentUser}
        size='md'
        printIntro
        stretch
        className='m-2 hover:scale-[1.02] duration-200 hover:-translate-y-1 bg-custom3'
      />
      <UserInfoCard
        userInfo={currentUser}
        size='md'
        printIntro
        className='m-2 hover:scale-[1.02] duration-200 hover:-translate-y-1 bg-custom3'
      />
      <UserInfoCard
        userInfo={currentUser}
        size='sm'
        printIntro
        stretch
        className='m-2 hover:scale-[1.02] duration-200 hover:-translate-y-1 bg-custom3'
      />
      <UserInfoCard
        userInfo={currentUser}
        size='sm'
        printIntro
        className='m-2 hover:scale-[1.02] duration-200 hover:-translate-y-1 bg-custom3'
      />
      <UserInfoCard
        userInfo={currentUser}
        size='lg'
        printIntro
        side='right'
        className='m-2 hover:scale-[1.02] duration-200 hover:-translate-y-1 bg-custom3'
      />
      <UserInfoCard
        userInfo={currentUser}
        size='md'
        side='right'
        printIntro
        className='m-2 hover:scale-[1.02] duration-200 hover:-translate-y-1 bg-custom3'
      />
      <UserInfoCard
        userInfo={currentUser}
        size='lg'
        printIntro
        stretch
        className='m-2 hover:scale-[1.02] duration-200 hover:-translate-y-1 bg-custom3'
      />
      <UserInfoCard
        userInfo={currentUser}
        size='lg'
        printIntro
        stretch
        className='m-2 hover:scale-[1.02] duration-200 hover:-translate-y-1 bg-custom3'
      />
      <UserInfoCard
        userInfo={currentUser}
        size='lg'
        printIntro
        stretch
        className='m-2 hover:scale-[1.02] duration-200 hover:-translate-y-1 bg-custom3'
      />
    </ScrollableContainer>
  );
}
