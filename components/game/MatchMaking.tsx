import MatchMakingTimer from './MatchMakingTimer';
import {Button} from '@/components/shadcn/ui/button';
import {Dialog, DialogContent, DialogTrigger} from './MatchMakingDialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';

interface gameInfo {
  option: boolean;
}

export default function MatchMakingBtn() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Start Match</Button>
      </DialogTrigger>
      <DialogContent className='w-[480px] h-[500px] bg-slate-400 rounded-[10px] shadow flex-col justify-center items-center gap-[110px] inline-flex'>
        <h1 className='text-[40px] font-bold font-[Roboto Mono]'>
          래더 게임 매칭중
        </h1>
        <MatchMakingTimer />
      </DialogContent>
    </Dialog>
  );
}
