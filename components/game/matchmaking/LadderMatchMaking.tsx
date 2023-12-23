import MatchMakingTimer from './MatchMakingTimer';
import {Button} from '@/components/shadcn/ui/button';
import {Dialog, DialogContent, DialogTrigger} from './MatchMakingDialog';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import useSocket from '@/hooks/useSocket';

export default function LadderMatchMakingBtn() {
  const [socket] = useSocket('game');
  const router = useRouter();

  useEffect(() => {
    socket.on('ladderMatch', (state) => {
      console.log('래더 매치 발견', state);
      router.push({
        pathname: '/game/pre-game',
        query: {id: state.id, theme: 'default'}
      });
    });
    // THINK: 매치 메이킹 취소 성공 확인?
    return () => {
      socket.off('ladderMatch');
    };
  }, []);
  function startLadderMatchMaking() {
    console.log('래더 매칭 시작');
    if (socket) socket.emit('ladderMatch', {userName: 'daejlee'});
  }
  function stopLadderMatchMaking() {
    console.log('래더 매칭 취소');
    if (socket) socket.emit('ladderMatchCancel', {userName: 'daejlee'});
  }

  return (
    <Dialog onClose={() => stopLadderMatchMaking()}>
      <DialogTrigger asChild>
        <Button onClick={() => startLadderMatchMaking()}>Start Match</Button>
      </DialogTrigger>
      <DialogContent className='w-[480px] h-[500px] bg-custom1 rounded-[10px] shadow flex-col justify-center items-center gap-[110px] inline-flex'>
        <h1 className='text-[40px] font-bold font-[Roboto Mono]'>
          래더 게임 매칭중
        </h1>
        <MatchMakingTimer isAscending={true} />
      </DialogContent>
    </Dialog>
  );
}
