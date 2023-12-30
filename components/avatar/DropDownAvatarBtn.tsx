import {User} from 'lucide-react';
import {Gamepad2, Skull} from 'lucide-react';
import {GiBootKick} from 'react-icons/gi';
import {MdOutlineManageAccounts} from 'react-icons/md';
import {IoVolumeMuteOutline} from 'react-icons/io5';
import {PiPaperPlaneTiltBold, PiSmileyAngry} from 'react-icons/pi';
// 여기까진 아이콘 임포트
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
import {useToast} from '../shadcn/ui/use-toast';
import {Button} from '@/components/shadcn/ui/button';
import {useRouter} from 'next/router';
import AvatarWithStatus from '../card/userInfoCard/AvatarWithStatus';
import useAxios from '@/hooks/useAxios';
import useSocketAction from '@/hooks/useSocketAction';
import useSocket from '@/hooks/useSocket';
import {useState} from 'react';
import NormalMatchMakingDialog from '../game/matchmaking/NormalMatchMakingDialog';

const UserDropdownGroup = ({
  userId,
  userName,
  alarm_sock,
  setIsWaiting,
  setMatchId
}: {
  userId: string;
  userName: string;
  alarm_sock: any;
  setIsWaiting: any;
  setMatchId: any;
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
            router.push(`userInfo/${userName}`);
          }}
        >
          프로필 보기
        </span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Gamepad2 className='mr-2 h-4 w-4' />

        <span
          onClick={() => {
            alarm_sock.emit(
              'gameRequest',
              {
                userId: userId,
                gameMode: 'normal',
                theme: 'default'
              },
              (state: any) => {
                console.log(state);
                if (state.msg == 'gameRequestSuccess!') {
                  setIsWaiting(true);
                  setMatchId(state.matchId);
                } else
                  toast({
                    title: '게임 요청 실패',
                    description: '게임 요청에 실패했습니다.'
                  });
              }
            );
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
  const [alarm_sock] = useSocket('alarm');
  const [isWaiting, setIsWaiting] = useState(false);
  const [matchId, setMatchId] = useState('');
  const [isThemeSelect, setIsThemeSelect] = useState(false);
  const banAction = useSocketAction(
    'banUser',
    '유저 제명',
    '님을 제명했습니다.',
    '유저 제명 실패',
    '님을 제명에 실패했습니다. 일반 유저만 재명할 수 있습니다.'
  );
  const kickAction = useSocketAction(
    'kickUser',
    '유저 추방',
    '님을 추방했습니다.',
    '유저 추방 실패',
    '님을 추방에 실패했습니다. 일반 유저만 추방할 수 있습니다.'
  );
  const muteAction = useSocketAction(
    'muteUser',
    '유저 음소거',
    '님을 음소거했습니다.',
    '유저 음소거 실패',
    '님을 음소거에 실패했습니다. 일반 유저만 음소거할 수 있습니다.'
  );

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
                    banAction(channel_id, user_id, user_name);
                  }}
                >
                  제명하기(BAN)
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <GiBootKick className='mr-2 h-4 w-4' />
                <span
                  onClick={() => {
                    kickAction(channel_id, user_id, user_name);
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
                    muteAction(channel_id, user_id, user_name);
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
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className='w-14 h-14 rounded-full'>
            <AvatarWithStatus
              size='sm'
              image={profileImage}
              showStatus={false}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{user_name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <UserDropdownGroup
            userId={user_id}
            userName={user_name}
            alarm_sock={alarm_sock}
            setIsWaiting={setIsWaiting}
            setMatchId={setMatchId}
          />
          <DropdownMenuSeparator />
          {role === 'admin' || role == 'owner' ? <AdminDropdownGroup /> : null}
        </DropdownMenuContent>
      </DropdownMenu>

      <NormalMatchMakingDialog
        isWaiting={isWaiting}
        setIsWaiting={setIsWaiting}
        matchId={matchId}
        setMatchId={setMatchId}
        userId={user_id}
        isThemeSelecting={isThemeSelect}
        setIsThemeSelecting={setIsThemeSelect}
      />
    </>
  );
}
