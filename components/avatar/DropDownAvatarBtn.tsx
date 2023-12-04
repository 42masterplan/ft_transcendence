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
import {useToast} from '../shadcn/ui/use-toast';
import useAxios from '@/hooks/useAxios';
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

const UserDropdownGroup = ({
  userId,
  userName
}: {
  userId: string;
  userName: string;
}) => {
  const router = useRouter();
  const {toast} = useToast();
  const {fetchData} = useAxios();
  return (
    <DropdownMenuGroup className=''>
      <DropdownMenuItem>
        <User className='mr-2 h-4 w-4' />
        <span
          onClick={() => {
            router.push(`/${userName}`);
          }}
        >
          프로필 보기
        </span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Gamepad2 className='mr-2 h-4 w-4' />
        <span
          onClick={() => {
            toast({
              title: '게임 신청',
              description: '준비중인 기능입니다. 다른 기능을 이용해주세요.'
            });
          }}
        >
          일대일 게임
        </span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <PiSmileyAngry className='mr-2 h-4 w-4' />
        <span
          onClick={() => {
            fetchData({
              url: `/users/block`,
              method: 'post',
              body: {
                id: userId
              },
              successTitle: '유저 차단',
              successDescription: '유저를 차단했습니다.',
              errorTitle: '유저 차단 실패',
              errorDescription: '유저 차단에 실패했습니다.'
            });
          }}
        >
          차단하기
        </span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <PiPaperPlaneTiltBold className='mr-2 h-4 w-4' />
        <span
          onClick={() => {
            toast({
              title: 'DM 보내기',
              description: '준비중인 기능입니다. 다른 기능을 이용해주세요.'
            });
          }}
        >
          일대일 채팅
        </span>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
};

interface DropdownAvatarBtnProps {
  profileImage: string;
  user_name: string;
  user_id: string;
  channel_id: string;
  role: string;
  isMe: boolean;
}

export default function DropdownAvatarBtn({
  profileImage,
  user_name,
  user_id,
  channel_id,
  role,
  isMe
}: DropdownAvatarBtnProps) {
  const [socket] = useChatSocket('channel');
  const {toast} = useToast();
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
                <span
                  onClick={() => {
                    socket.emit(
                      'banUser',
                      {
                        channelId: channel_id,
                        userId: user_id
                      },
                      (res: string) => {
                        if (res === 'ban Success!')
                          toast({
                            title: '유저 제명',
                            description: `${user_name}님을 제명했습니다.`
                          });
                        else
                          toast({
                            title: '유저 제명 실패',
                            description: `${user_name}님을 제명에 실패했습니다. 일반 유저만 재명할 수 있습니다.`
                          });
                      }
                    );
                  }}
                >
                  제명하기(BAN)
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <GiBootKick className='mr-2 h-4 w-4' />
                <span
                  onClick={() => {
                    socket.emit(
                      'kickUser',
                      {
                        channelId: channel_id,
                        userId: user_id
                      },
                      (res: string) => {
                        if (res === 'kick Success!')
                          toast({
                            title: '유저 추방',
                            description: `${user_name}님을 추방했습니다.`
                          });
                        else
                          toast({
                            title: '유저 추방 실패',
                            description: `${user_name}님을 추방에 실패했습니다. 일반 유저만 추방할 수 있습니다.`
                          });
                      }
                    );
                  }}
                >
                  추방하기(KICK)
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <IoVolumeMuteOutline className='mr-2 h-4 w-4' />
                <span
                  onClick={() => {
                    socket.emit(
                      'muteUser',
                      {
                        channelId: channel_id,
                        userId: user_id
                      },
                      (res: string) => {
                        if (res === 'mute Success!')
                          toast({
                            title: '유저 mute',
                            description: `${user_name}님을 mute했습니다. 일정 시간동안 채팅을 할 수 없습니다.`
                          });
                        else
                          toast({
                            title: '유저 mute 실패',
                            description: `${user_name}님을 mute에 실패했습니다. 일반 유저만 mute할 수 있습니다.`
                          });
                      }
                    );
                  }}
                >
                  음소거(MUTE)
                </span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuGroup>
    );
  };

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
        <UserDropdownGroup userId={user_id} userName={user_name} />
        <DropdownMenuSeparator />
        {role === 'admin' || role == 'owner' ? <AdminDropdownGroup /> : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
