import {Button} from '@/components/shadcn/button';
import {Input} from '@/components/shadcn/input';
import {Label} from '@/components/shadcn/label';
import GameRequest from '../alarm/GameRequest';
import FreindRequest from '../alarm/FriendRequest';
import ImageBtn from './ImageBtn';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/shadcn/sheet';

export default function AlarmBtn() {
  // 이건 일단 받아왔다고 생각하고 일단 진행 추후에는 직접 받아서 진행합니다.
  // 실제로 이렇게 생기지 않았을 가능성 높음!
  const gameRequests = [
    {
      id: 'uuid',
      name: 'Seoyoo',
      profile_image: 'shark_health',
      current_status: 'ONLINE',
      introduction: 'I love Health',
      game_mode: 'health'
    },
    {
      id: 'uuid',
      name: 'hkong',
      profile_image: 'koala_health',
      current_status: 'OFFLINE',
      introduction: 'I love Swimming~',
      game_mode: 'swim'
    },
    {
      id: 'uuid',
      name: 'hkong',
      profile_image: 'koala_health',
      current_status: 'OFFLINE',
      introduction: 'I love Swimming~',
      game_mode: 'swim'
    },
    {
      id: 'uuid',
      name: 'hkong',
      profile_image: 'koala_health',
      current_status: 'OFFLINE',
      introduction: 'I love Swimming~',
      game_mode: 'swim'
    }
  ];
  const friendRequest = [
    {
      id: 'RandomUUid',
      name: 'jjin',
      profile_image: 'polarbear_ski',
      introduction: 'I love badminton',
      current_status: 'INGAME'
    },
    {
      id: 'RandomUUid',
      name: 'daejlee',
      profile_image: 'rhino_health',
      introduction: '난 대지리다!',
      current_status: 'OFFLINE'
    },
    {
      id: 'RandomUUid',
      name: 'joushin',
      profile_image: 'gorilla_baseBall',
      introduction: '난 조신이다!',
      current_status: 'OFFLINE'
    }
  ];
  return (
    <p className='fixed top-2.5 right-24'>
      <Sheet>
        <SheetTrigger asChild>
          <ImageBtn btn_type='HeaderBtn' file='alarm' width={50} height={50} />
        </SheetTrigger>
        <SheetContent className=' overflow-y-auto max-h-screen bg-color_3'>
          <SheetHeader>
            <SheetTitle>알림</SheetTitle>
          </SheetHeader>
          <div className='flex flex-col gap-4 py-4'>
            <h1
              className='text-1xl font-extrabold text-orange-500
						'
            >
              게임 요청
            </h1>
            {gameRequests.map((item) => (
              <div>
                <GameRequest {...item} />
              </div>
            ))}
          </div>
          <h1
            className='text-1xl font-extrabold text-orange-500
						'
          >
            친구 요청
          </h1>
          <div className='flex flex-col gap-4 py-4'>
            {friendRequest.map((item) => (
              <div>
                <FreindRequest {...item} />
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </p>
  );
}
