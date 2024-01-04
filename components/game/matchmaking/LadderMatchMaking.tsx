import MatchMakingTimer from './MatchMakingTimer';
import {Button} from '@/components/shadcn/ui/button';
import {
  MatchMakingDialog,
  MatchMakingDialogContent,
  MatchMakingDialogTrigger
} from './MatchMakingDialog';
import useSocket from '@/hooks/useSocket';
import {useEffect, useState} from 'react';
import {useToast} from '@/components/shadcn/ui/use-toast';

export default function LadderMatchMakingBtn() {
  const [socket] = useSocket('alarm');
  const [rejection, setRejection] = useState(false);
  const {toast} = useToast();
  function startLadderMatchMaking() {
    if (socket) socket.emit('ladderGameRequest');
  }
  function stopLadderMatchMaking() {
    if (!rejection) socket.emit('ladderGameCancel');
  }

  useEffect(() => {
    socket.on('ladderGameReject', () => {
      setRejection(true);
      toast({
        title: '래더 매칭 실패: 현재 래더 큐에 사람이 없습니다.',
        variant: 'destructive'
      });
    });
    return () => {
      socket.off('ladderGameReject');
    };
  }, [socket]);

  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (!rejection && socket) socket.emit('ladderGameCancel');
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [socket, rejection]);

  return (
    <MatchMakingDialog onClose={() => stopLadderMatchMaking()}>
      <MatchMakingDialogTrigger asChild>
        <Button
          className='w-40 h-16 bg-rose-900 text-2xl font-semibold text-gray-300'
          onClick={() => {
            startLadderMatchMaking();
            setRejection(false);
          }}
        >
          Start Match
        </Button>
      </MatchMakingDialogTrigger>
      <MatchMakingDialogContent className='w-[480px] h-[500px] bg-custom1 rounded-[10px] shadow flex-col justify-center items-center gap-[110px] inline-flex'>
        <h1 className='text-[40px] font-bold font-[Roboto Mono]'>
          래더 게임 매칭중
        </h1>
        <MatchMakingTimer isAscending={true} isRejection={rejection} />
      </MatchMakingDialogContent>
    </MatchMakingDialog>
  );
}
