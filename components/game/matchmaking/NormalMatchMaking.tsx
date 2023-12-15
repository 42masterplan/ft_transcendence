import {Button} from '@/components/shadcn/ui/button';
import {Dialog, DialogContent, DialogTrigger} from './MatchMakingDialog';
import {InvitationNavBar} from '../invitation/InvitationNavBar';
import {userType} from '@/types/user';
import useAxios from '@/hooks/useAxios';
import {useEffect, useState} from 'react';
import InvitationCardSection from '../invitation/InvitationCardSection';
import MatchMakingTimer from './MatchMakingTimer';
import {io, Socket} from 'socket.io-client';
import {useNavigate} from 'react-router-dom';

export default function NormalMatchMakingBtn({theme}: {theme: string}) {
  // we are only going to search for online friends
  const [searchTargetInput, setSearchTargetInput] = useState('');
  const {fetchData, response, isSuccess} = useAxios();
  const [friends, setFriends] = useState<userType[]>([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const forwardTheme = theme;
  const [socket, setSocket] = useState<Socket | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io('http://localhost:4242');
    setSocket(socket);
    socket.on('normalMatch', (state) => {
      console.log('일반 매치 발견', state);
      navigate(`/game/active/in-game/${state.id}`, {state: state});
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  function stopNormalMatchMaking() {
    console.log('노멀 매칭 취소');
    if (socket) socket.emit('normalMatchCancel', {userName: 'daejlee'});
  }
  function startNormalMatchMaking() {
    console.log('노멀 매칭 시작');
    if (socket)
      socket.emit('normalMatch', {
        userName: 'daejlee',
        theme: forwardTheme
      });
  }
  useEffect(() => {
    fetchData({
      method: 'get',
      // NOTICE: it supposed to be /users/friends but using all for now because of scrollable feature testing !!
      // TODO: we are only going to search for online friends so we need to change this later !!
      // socket will be used for this feature -> 알림 소켓이 구현되면 그때 바꿔야함.
      url: '/users',
      params: {
        id: '1'
      },
      errorTitle: '유저 정보 조회 실패',
      errorDescription: '유저 정보 조회에 실패했습니다.',
      disableSuccessToast: true
    });
  }, []); // ignore eslint warning. we only want to fetch data once ^^
  useEffect(() => {
    if (isSuccess === true) setFriends(response);
  }, [isSuccess, response]);

  return isWaiting === false ? (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Start Match</Button>
      </DialogTrigger>
      <DialogContent
        className='w-[480px] h-[500px] bg-custom1 rounded-[10px] shadow flex-col 
      justify-center items-center gap-[20px] inline-flex'
      >
        <div className='flex flex-col w-full h-[390px] px-3 gap-2'>
          <InvitationNavBar setSearchTargetInput={setSearchTargetInput} />
          <InvitationCardSection
            searchTargetInput={searchTargetInput}
            className=''
            friends={friends}
            theme={forwardTheme}
            setIsWaiting={setIsWaiting}
            startNormalMatchMaking={startNormalMatchMaking}
          />
        </div>
      </DialogContent>
    </Dialog>
  ) : (
    <Dialog
      onClose={() => {
        stopNormalMatchMaking();
        setIsWaiting(false);
      }}
    >
      <DialogContent className='w-[480px] h-[500px] bg-custom1 rounded-[10px] shadow flex-col justify-center items-center gap-[110px] inline-flex'>
        <h1 className='text-[40px] font-bold font-[Roboto Mono]'>
          매칭을 수락하길 기다리는중
        </h1>
        <MatchMakingTimer
          isAscending={false}
          stopNormalMatchMaking={stopNormalMatchMaking}
          setIsWaiting={setIsWaiting}
        />
      </DialogContent>
    </Dialog>
  );
}
