import {useState} from 'react';
import MatchMakingBtn from '@/components/game/matchmaking/LadderMatchMaking';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/shadcn/ui/card';

import styles from './LadderGameSection.module.css';

export default function LadderGameSection() {
  return (
    <Card className='flex flex-col justify-between bg-ladder-background bg-top w-full h-[70vh]'>
      <CardHeader>
        <CardTitle className=' font-extrabold text-7xl text-rose-900'>
          Ladder Game
        </CardTitle>
        <CardDescription className='text-white'>
          공통된 규칙을 따르며 승패를 겨루는 래더게임 입니다. 승리 혹은
          죽음뿐입니다......
        </CardDescription>
      </CardHeader>
      <CardFooter className='flex justify-center'>
        <MatchMakingBtn />
      </CardFooter>
    </Card>
  );
}
