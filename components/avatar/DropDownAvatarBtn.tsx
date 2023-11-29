import {User} from 'lucide-react';
import {Gamepad2, Skull} from 'lucide-react';

import {GiBootKick} from 'react-icons/gi';
import {MdOutlineManageAccounts} from 'react-icons/md';
import {IoVolumeMuteOutline} from 'react-icons/io5';
import {PiPaperPlaneTiltBold, PiSmileyAngry} from 'react-icons/pi';
// 여기까진 아이콘 임포트
import {useRouter} from 'next/router';
import AvatarWithStatus from '../card/userInfoCard/AvatarWithStatus';
import {Button} from '@/components/shadcn/ui/button';
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
} from '@/components/shadcn/ui/dropdown-menu';
import useChatSocket from '@/hooks/useChatSocket';

const moveToProfile = (userId: string) => {
  const router = useRouter();
  router.push('/profile:username');
};

const UserDropdownGroup = () => {
  return (
    <DropdownMenuGroup className=''>
      <DropdownMenuItem>
        <User className='mr-2 h-4 w-4' />
        <span onClick={() => moveToProfile('joushin')}>프로필 보기</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Gamepad2 className='mr-2 h-4 w-4' />
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
              <Skull className='mr-2 h-4 w-4' />
              <span>제명하기(BAN)</span>
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
  profileImage,
  user_name,
  channel_id,
  role,
  isMe
}: {
  profileImage: string;
  user_name: string;
  channel_id: string;
  role: string;
  isMe: boolean;
}) {
  const [socket] = useChatSocket('channel');
  return isMe ? (
    <AvatarWithStatus size='sm' image={profileImage} showStatus={false} />
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className='w-14 h-14 rounded-full'
          onClick={() => {
            socket.emit('myRole', channel_id);
          }}
        >
          <AvatarWithStatus size='sm' image={profileImage} showStatus={false} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user_name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {UserDropdownGroup()}
        <DropdownMenuSeparator />
        {role === 'admin' || role == 'owner' ? AdminDropdownGroup() : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
