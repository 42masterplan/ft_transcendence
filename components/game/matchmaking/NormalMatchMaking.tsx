import ScrollableContainer from '../../container/ScrollableContainer';
import {Button} from '@/components/shadcn/ui/button';
import {Dialog, DialogContent, DialogTrigger} from './MatchMakingDialog';
import {InvitationNavBar} from '../invitation/InvitationNavBar';
import {userType} from '@/types/user';
import useAxios from '@/hooks/useAxios';
import {useEffect, useState} from 'react';
import InvitaionCardSection from '../invitation/InvitaionCardSection';

function isUserIdInArray(userId: string, array: userType[]) {
  return array.some((user) => user.id === userId);
}

export default function NormalMatchMakingBtn({}) {
  // we are only going to search for online friends
  const [searchTargetInput, setSearchTargetInput] = useState('');
  const {fetchData, response, isSuccess} = useAxios();
  // user data
  const [friends, setFriends] = useState<userType[]>([]);
  // fetch data
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetchData({
      method: 'get',
      // it supposed to be /users/friends but using all for now because of scrollable feature testing !!
      url: '/users',
      params: {
        id: '1'
      },
      errorTitle: '유저 정보 조회 실패',
      errorDescription: '유저 정보 조회에 실패했습니다.'
    });
  }, []); // ignore eslint warning. we only want to fetch data once ^^
  useEffect(() => {
    if (isSuccess === true) {
      setFriends(response);
      console.log('로딩끝', response);
      setLoading(false);
    }
  }, [isSuccess, response]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Start Match</Button>
      </DialogTrigger>
      <DialogContent
        className='w-[480px] h-[500px] bg-custom1 rounded-[10px] shadow flex-col 
      justify-center items-center gap-[110px] inline-flex'
      >
        <div className='flex flex-col w-full h-full px-3 gap-2'>
          <InvitationNavBar setSearchTargetInput={setSearchTargetInput} />
          <InvitaionCardSection
            searchTargetInput={searchTargetInput}
            className=''
            friends={friends}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
