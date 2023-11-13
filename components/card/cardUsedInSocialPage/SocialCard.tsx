import * as Type from '@/lib/types';
import {User} from '@/lib/classes/User';
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
  let printIntro: boolean;
  let insteadOfIntro: string = '';
  if (props.isFriend && !props.isBlocked) {
    // friend
    cardColor = 'bg-custom3/50';
    printIntro = true;
  } else if (!props.isFriend && !props.isBlocked) {
    // not friend and not blocked
    cardColor = 'bg-custom2/50';
    printIntro = true;
  } else if (props.isBlocked && !props.isFriend) {
    // blocked
    cardColor = 'bg-custom4/40';
    printIntro = true;
    insteadOfIntro =
      "Current user is blocked. You can't see this user's intro.";
  } else {
    // Error: invalid user status
    cardColor = 'bg-rose-900';
    console.log('invalid user status');
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
    </div>
  );
}
