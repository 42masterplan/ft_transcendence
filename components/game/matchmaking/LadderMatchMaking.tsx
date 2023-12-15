import MatchMakingTimer from './MatchMakingTimer';
import {Button} from '@/components/shadcn/ui/button';
import {Dialog, DialogContent, DialogTrigger} from './MatchMakingDialog';

function startLadderMatchMaking() {
  console.log('래더 매칭 시작');
  // TODO: 매치 매이킹 소켓 연결
}

function stopLadderMatchMaking() {
  console.log('래더 매칭 취소');
  // TODO: 매치 매이킹 소켓 연결 해제
}

export default function LadderMatchMakingBtn() {
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
