import {Button} from '@/components/shadcn/ui/button';
import {
  MatchMakingDialog,
  MatchMakingDialogContent,
  MatchMakingDialogTrigger
} from './MatchMakingDialog';
import {InvitationNavBar} from '../invitation/InvitationNavBar';
import {userType} from '@/types/user';
import useAxios from '@/hooks/useAxios';
import {useEffect, useState} from 'react';
import InvitationCardSection from '../invitation/InvitationCardSection';
import MatchMakingTimer from './MatchMakingTimer';
import useSocket from '@/hooks/useSocket';
import {useToast} from '@/components/shadcn/ui/use-toast';

export default function NormalMatchMakingBtn({theme}: {theme: string}) {
  // we are only going to search for online friends
  const [searchTargetInput, setSearchTargetInput] = useState('');
  const {fetchData, response, isSuccess} = useAxios();
  const [friends, setFriends] = useState<userType[]>([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const [socket] = useSocket('alarm');
  const forwardTheme = theme;
  const {toast} = useToast();
  const [matchId, setMatchId] = useState('');

  function stopNormalMatchMaking({matchId}: {matchId: string}) {
    socket.emit('normalGameCancel', {matchId});
  }
  function startNormalMatchMaking({
    userId,
    theme
  }: {
    userId: string;
    theme: string;
  }) {
    console.log('userId: ', userId, 'theme: ', theme);
    socket.emit(
      'normalGameRequest',
      {
        userId: userId,
        theme: theme
      },
      (state: any) => {
        if (state.msg === 'gameRequestSuccess!') {
          setIsWaiting(true);
          setMatchId(state.matchId);
        } else {
          toast({
            title: '매칭 실패',
            description: '매칭에 실패했습니다.',
            variant: 'destructive'
          });
        }
      }
    );
  }
  useEffect(() => {
    fetchData({
      // API로 받을거임.
      method: 'get',
      url: '/users/friends',
      errorTitle: '유저 정보 조회 실패',
      errorDescription: '유저 정보 조회에 실패했습니다.',
      disableSuccessToast: true
    });
  }, []); // ignore eslint warning. we only want to fetch data once ^^
  useEffect(() => {
    if (isSuccess === true) {
      response.forEach((friend: userType) => {
        if (friend.currentStatus === 'online')
          setFriends((prev) => [...prev, friend]);
      });
    }
  }, [isSuccess, response]);
  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      socket.emit('normalGameCancel', {matchId: matchId});
    }
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [socket, matchId]);
  return isWaiting === false ? (
    <MatchMakingDialog>
      <MatchMakingDialogTrigger asChild>
        <Button>Start Match</Button>
      </MatchMakingDialogTrigger>
      <MatchMakingDialogContent className='w-[480px] h-[500px] bg-custom1 rounded-[10px] shadow flex-col justify-center items-center gap-[20px] inline-flex'>
        <div className='flex flex-col w-full h-[390px] px-3 gap-2'>
          <InvitationNavBar setSearchTargetInput={setSearchTargetInput} />
          <InvitationCardSection
            searchTargetInput={searchTargetInput}
            friends={friends}
            theme={forwardTheme}
            setIsWaiting={setIsWaiting}
            startNormalMatchMaking={startNormalMatchMaking}
          />
        </div>
      </MatchMakingDialogContent>
    </MatchMakingDialog>
  ) : (
    <MatchMakingDialog
      onClose={() => {
        stopNormalMatchMaking({matchId: matchId});
        setIsWaiting(false);
      }}
    >
      <MatchMakingDialogContent className='w-[480px] h-[500px] bg-custom1 rounded-[10px] shadow flex-col justify-center items-center gap-[110px] inline-flex'>
        <h1 className='text-[40px] font-bold font-[Roboto Mono] items-center'>
          매칭을 수락하길 기다리는중
        </h1>
        <MatchMakingTimer
          isAscending={false}
          matchId={matchId}
          stopNormalMatchMaking={stopNormalMatchMaking}
          setIsWaiting={setIsWaiting}
        />
      </MatchMakingDialogContent>
    </MatchMakingDialog>
  );
}
