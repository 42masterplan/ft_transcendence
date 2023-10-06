import GameRequest from '../alarm/GameRequest';
import FreindRequest from '../alarm/FriendRequest';
import ImageBtn from './ImageBtn';
import {useContext} from 'react';
import {APIContext} from '../Layout';

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
  const {gameRequests, friendInfos} = useContext(APIContext);
  return (
    <p className='fixed top-2.5 right-24'>
      <Sheet>
        <SheetTrigger asChild>
          <ImageBtn btn_type='HeaderBtn' file='alarm' width={50} height={50} />
        </SheetTrigger>
        <SheetContent className=' overflow-y-auto max-h-screen bg-color_3'>
          <SheetHeader>
            <SheetTitle className='text-center'>알림</SheetTitle>
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
            {friendInfos.map((item, idx) => (
              <div key={idx}>
                <FreindRequest {...item} />
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </p>
  );
}
