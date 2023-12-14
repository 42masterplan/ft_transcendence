import {Button} from '@/components/shadcn/ui/button';
import {Dialog, DialogContent, DialogTrigger} from './MatchMakingDialog';
import {InvitationNavBar} from '../invitation/InvitationNavBar';
import {userType} from '@/types/user';
import useAxios from '@/hooks/useAxios';
import {useEffect, useState} from 'react';
import InvitationCardSection from '../invitation/InvitationCardSection';

export default function NormalMatchMakingBtn({theme}: {theme: string}) {
  // we are only going to search for online friends
  const [searchTargetInput, setSearchTargetInput] = useState('');
  const {fetchData, response, isSuccess} = useAxios();
  // user data
  const [friends, setFriends] = useState<userType[]>([]);
  // fetch data
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
      console.log('로딩끝', response);
    }
  }, [isSuccess, response]);

  return (
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
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
