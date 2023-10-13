import {User} from 'lucide-react';
import {LuGamepad2, LuSkull} from 'react-icons/lu';
import {GiBootKick} from 'react-icons/gi';
import {MdOutlineManageAccounts} from 'react-icons/md';
import {IoVolumeMuteOutline} from 'react-icons/io5';
import {PiPaperPlaneTiltBold, PiSmileyAngry} from 'react-icons/pi';
// 여기까진 아이콘 임포트

import AvatarIcon from '@/components/avatar/AvatarIcon';
import {Button} from '@/components/shadcn/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/shadcn/dropdown-menu';

const UserDropdownGroup = () => {
  return (
    <DropdownMenuGroup className=''>
      <DropdownMenuItem>
        <User className='mr-2 h-4 w-4' />
        <span>프로필 보기</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <LuGamepad2 className='mr-2 h-4 w-4' />
        <span>일대일 게임</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <PiSmileyAngry className='mr-2 h-4 w-4' />
        <span>차단하기</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <PiPaperPlaneTiltBold className='mr-2 h-4 w-4' />
        <span>일대일 채팅</span>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
};

const AdminDropdownGroup = () => {
  return (
    <DropdownMenuGroup>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <MdOutlineManageAccounts className='mr-2 h-4 w-4' />
          <span>유저 관리</span>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent>
            <DropdownMenuItem>
              <LuSkull className='mr-2 h-4 w-4' />
              <span>재명하기(BAN)</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <GiBootKick className='mr-2 h-4 w-4' />
              <span>추방하기(KICK)</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <IoVolumeMuteOutline className='mr-2 h-4 w-4' />
              <span>음소거(MUTE)</span>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    </DropdownMenuGroup>
  );
};

export default function DropdownAvatarBtn({
  profile_image,
  user_name
}: {
  profile_image: string;
  user_name: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='w-14 h-14 rounded-full'>
          <AvatarIcon size='small' avatarName={profile_image} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user_name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {UserDropdownGroup()}
        <DropdownMenuSeparator />
        {AdminDropdownGroup()}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
