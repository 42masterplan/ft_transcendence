import {useState} from 'react';
import ChildTab from '@/components/game/ChildTab';

import NormalMatchMakingBtn from '@/components/game/matchmaking/NormalMatchMakingBtn';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/shadcn/ui/card';

import {Theme} from '@/types/game';

export default function NormalGameSection() {
  const [theme, setTheme] = useState(Theme.Default);
  return (
    <>
      <Card className='flex flex-col justify-between bg-normal-background bg-top w-full h-[70vh]'>
        <CardHeader>
          <CardTitle className='font-extrabold text-7xl text-emerald-700'>
            Normal Game
          </CardTitle>
          <CardDescription className='text-black'>
            다양한 테마와 규칙을 적용할 수 있는 노멀 게임입니다. 친구를 초대해
            즐겨보세요!
          </CardDescription>
        </CardHeader>
        <CardContent className='flex justify-center'>
          <ChildTab setTheme={setTheme} />
        </CardContent>
        <CardFooter className='flex justify-center'>
          <NormalMatchMakingBtn theme={theme} />
        </CardFooter>
      </Card>
    </>
  );
}
