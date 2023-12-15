import MatchMakingTimer from './MatchMakingTimer';
import {Button} from '@/components/shadcn/ui/button';
import {Dialog, DialogContent, DialogTrigger} from './MatchMakingDialog';
import {useNavigate} from 'react-router-dom';
import {Socket, io} from 'socket.io-client';
import {useEffect, useState} from 'react';

export default function LadderMatchMakingBtn() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io('http://localhost:4242');
    setSocket(socket);
    socket.on('ladderMatch', (state) => {
      console.log('래더 매치 발견', state);
      navigate(`/game/active/in-game/${state.id}`, {state: state});
    });
    // THINK: 매치 메이킹 취소 성공 확인?
    return () => {
      socket.disconnect();
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
