import * as Type from '@/lib/types';
import {User} from '@/lib/classes/User';
import UserInfoCard from '../userInfoCard/UserInfoCard';
import ButtonGroup from './buttonGroup/ButtonGroup';
import {AccordionItem} from '@radix-ui/react-accordion';
import {
  AccordionContent,
  AccordionTrigger
} from '@/components/shadcn/ui/accordion';
import {TooltipProvider} from '@/components/shadcn/ui/tooltip';

function userPropsToUserClass(props: SocialCardProps): Type.UserInfo {
  const userClass = new User();
  userClass.id = props.id;
  userClass.profileImage = props.profileImage;
  userClass.name = props.name;
  userClass.currentStatus = props.currentStatus as Type.userStatus;
  userClass.introduction = props.introduction;
  return userClass as Type.UserInfo;
}

interface SocialCardProps {
  id: string;
  profileImage: string;
  name: string;
  currentStatus: Type.userStatus | string;
  introduction: string;
  isFriend: boolean;
  isBlocked: boolean;
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
    printIntro = true;
    insteadOfIntro =
      'This should not happen - ERROR: Followed and Blocked at the same time';
  }

  return (
    <AccordionItem
      value={props.id}
      className={`flex flex-col w-fit px-3 justify-between items-center gap-2 rounded-xl hover:scale-[1.02] duration-200 ${cardColor} `}
    >
      <AccordionTrigger>
        <UserInfoCard
          userInfo={user}
          size='md'
          printIntro={printIntro}
          stretch={false}
          insteadOfIntro={insteadOfIntro}
        />
      </AccordionTrigger>
      <AccordionContent>
        <TooltipProvider>
          <div className='flex flex-row gap-10 p-2'>
            <ButtonGroup
              userId={props.id}
              isFriend={props.isFriend}
              isBlocked={props.isBlocked}
              userName={props.name}
            />
          </div>
        </TooltipProvider>
      </AccordionContent>
    </AccordionItem>
  );
}
