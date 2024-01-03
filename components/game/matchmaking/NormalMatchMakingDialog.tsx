import {MatchMakingDialog, MatchMakingDialogContent} from './MatchMakingDialog';
import MatchMakingTimer from './MatchMakingTimer';
import useSocket from '@/hooks/useSocket';
import {useEffect, useState} from 'react';
import {Theme} from '@/lib/types';
import ChildTab from '../ChildTab';
import {Button} from '@/components/shadcn/ui/button';
import {useToast} from '@/components/shadcn/ui/use-toast';

interface NormalMatchMakingDialogProps {
  isWaiting: boolean;
  setIsWaiting: any;
  matchId: string;
  setMatchId: any;
  userId: string;
  isThemeSelecting: boolean;
  setIsThemeSelecting: any;
}

export default function NormalMatchMakingDialog(
  props: NormalMatchMakingDialogProps
) {
  const [alarm_sock] = useSocket('alarm');
  const {
    isWaiting,
    setIsWaiting,
    matchId,
    setMatchId,
    userId,
    isThemeSelecting,
    setIsThemeSelecting
  } = props;
  const [theme, setTheme] = useState(Theme.Default);
  const {toast} = useToast();
  function stopNormalMatchMaking() {
    alarm_sock.emit('normalGameCancel', {matchId: matchId});
  }
  useEffect(() => {
    alarm_sock.on('normalGameReject', () => {
      setIsWaiting(false);
      toast({
        title: '매칭 실패',
        description: '상대방이 매칭을 거절했습니다.'
      });
    });
    return () => {
      alarm_sock.off('normalGameReject');
    };
  }, [alarm_sock]);

  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      alarm_sock.emit('normalGameCancel', {matchId: matchId});
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [alarm_sock, matchId]);

  return (
    <>
      <MatchMakingDialog
        onClose={() => setIsThemeSelecting(false)}
        open={isThemeSelecting}
        onOpenChange={setIsThemeSelecting}
      >
        <MatchMakingDialogContent className='w-[480px] h-[500px] bg-custom1 rounded-[10px] shadow flex-col justify-center items-center gap-[50px] inline-flex'>
          <h1 className='text-[40px] font-bold font-[Roboto Mono]'>
            테마를 선택해주세요!
          </h1>
          <ChildTab setTheme={setTheme} />
          <Button
            onClick={() => {
              setIsThemeSelecting(false);
              setIsWaiting(true);
              alarm_sock.emit(
                'normalGameRequest',
                {
                  userId: userId,
                  theme: theme
                },
                (state: any) => {
                  if (state.msg == 'gameRequestSuccess!') {
                    setIsWaiting(true);
                    setMatchId(state.matchId);
                  } else
                    toast({
                      title: '게임 요청 실패',
                      description: '게임 요청에 실패했습니다.'
                    });
                }
              );
            }}
            className=' w-[200px] h-[50px] rounded-[10px] text-[20px] font-bold font-[Roboto Mono]'
          >
            매칭 시작
          </Button>
        </MatchMakingDialogContent>
      </MatchMakingDialog>
      <MatchMakingDialog
        onClose={() => {
          stopNormalMatchMaking();
          setIsWaiting(false);
        }}
        open={isWaiting}
        onOpenChange={setIsWaiting}
      >
        <MatchMakingDialogContent className='w-[480px] h-[500px] bg-custom1 rounded-[10px] shadow flex-col justify-center items-center gap-[110px] inline-flex'>
          <h1 className='text-[40px] font-bold font-[Roboto Mono]'>
            매칭을 수락하길 기다리는 중
          </h1>
          <MatchMakingTimer
            isAscending={false}
            matchId={matchId}
            stopNormalMatchMaking={stopNormalMatchMaking}
            setIsWaiting={setIsWaiting}
          />
        </MatchMakingDialogContent>
      </MatchMakingDialog>
    </>
  );
}
