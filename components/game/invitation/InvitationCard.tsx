import * as Type from '@/lib/types';
import {User} from '@/lib/classes/User';
import UserInfoCard from '@/components/card/userInfoCard/UserInfoCard';
import {AccordionItem} from '@radix-ui/react-accordion';

function userPropsToUserClass(props: InvitationCardProps): Type.UserInfo {
  const userClass = new User();
  userClass.id = props.id;
  userClass.profileImage = props.profileImage;
  userClass.name = props.name;
  userClass.currentStatus = props.currentStatus as Type.userStatus;
  userClass.introduction = props.introduction;
  return userClass as Type.UserInfo;
}

interface InvitationCardProps {
  id: string;
  profileImage: string;
  name: string;
  currentStatus: Type.userStatus | string;
  introduction: string;
  isFriend: boolean;
  isBlocked: boolean;
  onClick: () => void; // onClick 속성 추가
}

export default function InvitationCard(props: InvitationCardProps) {
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
    printIntro = true;
    insteadOfIntro =
      'This should not happen - ERROR: Followed and Blocked at the same time';
  }

  return (
    <AccordionItem
      value={props.id}
      className={`flex flex-col w-full px-3 justify-between items-left gap-2 rounded-xl hover:scale-[1.02] duration-200 ${cardColor}`}
      onClick={props.onClick}
    >
      <UserInfoCard
        userInfo={user}
        size='md'
        printIntro={false}
        stretch={false}
        insteadOfIntro={insteadOfIntro}
        className='p-3'
      />
    </AccordionItem>
  );
}
