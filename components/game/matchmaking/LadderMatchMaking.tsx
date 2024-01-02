import MatchMakingTimer from './MatchMakingTimer';
import {Button} from '@/components/shadcn/ui/button';
import {
  MatchMakingDialog,
  MatchMakingDialogContent,
  MatchMakingDialogTrigger
} from './MatchMakingDialog';
import useSocket from '@/hooks/useSocket';

export default function LadderMatchMakingBtn() {
  const [socket] = useSocket('alarm');
  function startLadderMatchMaking() {
    console.log('래더 매칭 시작');
    if (socket) socket.emit('ladderGameRequest');
  }
  function stopLadderMatchMaking() {
    console.log('래더 매칭 취소');
    if (socket) socket.emit('gameCancel');
  }

  return (
    <MatchMakingDialog onClose={() => stopLadderMatchMaking()}>
      <MatchMakingDialogTrigger asChild>
        <Button onClick={() => startLadderMatchMaking()}>Start Match</Button>
      </MatchMakingDialogTrigger>
      <MatchMakingDialogContent className='w-[480px] h-[500px] bg-custom1 rounded-[10px] shadow flex-col justify-center items-center gap-[110px] inline-flex'>
        <h1 className='text-[40px] font-bold font-[Roboto Mono]'>
          래더 게임 매칭중
        </h1>
        <MatchMakingTimer isAscending={true} />
      </MatchMakingDialogContent>
    </MatchMakingDialog>
  );
}
