/**
 * @desc UserCardAvatar component can be used to display user avatar and status
 * props for UserCardAvatar: {userInfo}
 * @usage <UserCardAvatar userInfo={userInfo} />
 */

import AvatarIcon from '../../avatar/AvatarIcon';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/shadcn/tooltip';

export default function UserCardAvatar(props: any) {
  const userAvatar = props.userInfo.profile_image;
  const userStatus = props.userInfo.current_status;

  // user status icon
  let userStatusIcon: string;
  switch (userStatus) {
    case 'ONLINE':
      userStatusIcon = '/icon/user-card-icon/circle-online.svg';
      break;
    case 'OFFLINE':
      userStatusIcon = '/icon/user-card-icon/circle-offline.svg';
      break;
    case 'INGAME':
      userStatusIcon = '/icon/user-card-icon/circle-ingame.svg';
      break;
    default:
      userStatusIcon = '/icon/user-card-icon/circle-offline.svg';
      break;
  }

  // tailwind css style
  const style = {
    avatarContainer: 'p-2 relative',
    statusIconContainer:
      'flex justify-between items-center m-0 p-0 absolute top-2 right-3'
  };

  return (
    <div className={style.avatarContainer}>
      <AvatarIcon avatarName={userAvatar} />
      <div className={style.statusIconContainer}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <img src={userStatusIcon} alt={userStatus} />
            </TooltipTrigger>
            <TooltipContent>
              <p>{userStatus}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
