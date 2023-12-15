import {Button} from '@/components/shadcn/ui/button';
import {Dialog, DialogContent, DialogTrigger} from './MatchMakingDialog';
import {InvitationNavBar} from '../invitation/InvitationNavBar';
import {userType} from '@/types/user';
import useAxios from '@/hooks/useAxios';
import {useEffect, useState} from 'react';
import InvitationCardSection from '../invitation/InvitationCardSection';
import MatchMakingTimer from './MatchMakingTimer';

export const startNormalMatchMaking = () => {
  console.log('노멀 매칭 시작');
  // TODO: 매치 매이킹 소켓 연결
};

function stopNormalMatchMaking() {
  console.log('노멀 매칭 취소');
  // TODO: 매치 매이킹 소켓 연결 해제, dialog 닫기
}

export default function NormalMatchMakingBtn({theme}: {theme: string}) {
  // we are only going to search for online friends
  const [searchTargetInput, setSearchTargetInput] = useState('');
  const {fetchData, response, isSuccess} = useAxios();
  const [friends, setFriends] = useState<userType[]>([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const forwardTheme = theme;
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
    if (isSuccess === true) {
      setFriends(response);
    }
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
          />
        </div>
      </DialogContent>
    </Dialog>
  ) : (
    <Dialog
      onClose={() => {
        setIsWaiting(false);
        stopNormalMatchMaking();
      }}
    >
      <DialogContent
        className='w-[480px] h-[500px] bg-custom1 rounded-[10px] shadow flex-col 
      justify-center items-center gap-[20px] inline-flex'
      >
        <div className='flex flex-col justify-center items-center'>
          <div className='text-4xl font-bold'>Waiting for opponent...</div>
          <MatchMakingTimer
            isAscending={false}
            stopNormalMatchMaking={stopNormalMatchMaking}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
