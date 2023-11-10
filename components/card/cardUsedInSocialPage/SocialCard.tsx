import * as Type from '@/lib/types';
import {User} from '@/lib/classes/User';
import {SocialCardButton, SocialCardButtonTypes} from './SocialCardButton';
import UserInfoCard from '../userInfoCard/UserInfoCard';

interface SocialCardProps {
  id: string;
  profileImage: string;
  name: string;
  currentStatus: Type.userStatus | string;
  introduction: string;
  isFriend: boolean;
  isBlocked: boolean;
}

function userPropsToUserClass(props: SocialCardProps): Type.UserInfo {
  const userClass = new User();
  userClass.id = props.id;
  userClass.profileImage = props.profileImage;
  userClass.name = props.name;
  userClass.currentStatus = props.currentStatus as Type.userStatus;
  userClass.introduction = props.introduction;
  return userClass as Type.UserInfo;
}

export default function SocialCard(props: SocialCardProps) {
  const user = userPropsToUserClass(props);
  let cardColor: string;
  let buttons: SocialCardButtonTypes[] = [];
  let onClicks: (() => void)[] = [];
  let printIntro: boolean;
  let insteadOfIntro: string = '';
  if (props.isFriend && !props.isBlocked) {
    // friend
    cardColor = 'bg-custom3/50';
    buttons = ['matchRequest', 'unfollow', 'block'];
    onClicks = [
      () => {
        console.log('match request button clicked');
        // API.social__unblockUser(props.id);
      },
      () => {
        console.log('unfollow button clicked');
        // API.social__unblockUser(props.id);
      },
      () => {
        console.log('block button clicked');
        // API.social__unblockUser(props.id);
      }
    ];
    printIntro = true;
  } else if (!props.isFriend && !props.isBlocked) {
    // not friend and not blocked
    cardColor = 'bg-custom2/50';
    buttons = ['matchRequest', 'follow', 'block'];
    onClicks = [
      () => {
        console.log('match request button clicked');
        // API.social__unblockUser(props.id);
      },
      () => {
        console.log('follow button clicked');
        // API.social__unblockUser(props.id);
      },
      () => {
        console.log('block button clicked');
        // API.social__unblockUser(props.id);
      }
    ];
    printIntro = true;
  } else if (props.isBlocked && !props.isFriend) {
    // blocked
    cardColor = 'bg-custom4/40';
    buttons = ['unblock'];
    onClicks = [
      () => {
        console.log('unblock button clicked');
        // API.social__unblockUser(props.id);
      }
    ];
    printIntro = true;
    insteadOfIntro =
      "Current user is blocked. You can't see this user's intro.";
  } else {
    // Error: invalid user status
    cardColor = 'bg-custom4/20';
    console.log('invalid user status');
    buttons = [];
    printIntro = true;
    insteadOfIntro =
      'This should not happen - ERROR: Followed and Blocked at the same time';
  }

  return (
    <div
      className={`flex flex-row w-full justify-between p-3 rounded-xl hover:scale-[1.02] duration-200 ${cardColor} `}
    >
      <UserInfoCard
        userInfo={user}
        size='md'
        printIntro={printIntro}
        stretch={false}
        insteadOfIntro={insteadOfIntro}
      />
      <div className='flex flex-col justify-center items-center gap-2'>
        {buttons.map((button) => (
          <SocialCardButton
            key={button}
            type={button}
            onClick={onClicks[buttons.indexOf(button)]}
          />
        ))}
      </div>
    </div>
  );
}
