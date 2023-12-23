import {useEffect, useState} from 'react';
import SpinningLoader from '@/components/loader/SpinningLoader';
import {useRouter} from 'next/router';
import ScrollableContainer from '@/components/container/ScrollableContainer';
import MessageInputBar from '@/components/input/MessageInputBar';
import DMCard from '@/components/card/cardUsedInDMPage/DMCard';
import {DMType} from '@/lib/types';
import {DM} from '@/lib/classes/DM';
import useSocket from '@/hooks/useSocket';
import Axios from '@/api';
import {useToast} from '@/components/shadcn/ui/use-toast';
export default function DMPage() {
  const router = useRouter();
  const [isSending, setIsSending] = useState(false);
  const [msg, setMsg] = useState('');
  const [DMData, setDMData] = useState<DMType[] | null>(null);
  const [socket] = useSocket('alarm');
  const [blockUsers, setBlockUsers] = useState<string[] | null>(null);
  const [friendUsers, setFriendUsers] = useState<string[] | null>(null);

  const {toast} = useToast();
  //친구인지 아닌지 알기 위해서
  const chatUser = router.query.userName;
  useEffect(() => {
    socket.on('newDm', (dm: DM) => {
      console.log(dm);
    });
    socket.on('DmHistory', (dm: DM[]) => {
      console.log(dm);
      setDMData(dm);
    });
    Axios.get('users/block')
      .then((res) => {
        const data = res.data?.map((user: any) => user.name);
        setBlockUsers(data);
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: '차단 목록을 불러오는데 실패했습니다.',
          variant: 'destructive',
          description: '차단 목록을 불러오는데 실패했습니다.'
        });
        router.replace('/social');
      });
    Axios.get('users/friends')
      .then((res) => {
        const data = res.data?.map((user: any) => user.name);
        console.log(res.data);
        setFriendUsers(data);
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: '친구 목록을 불러오는데 실패했습니다.',
          variant: 'destructive',
          description: '친구 목록을 불러오는데 실패했습니다.'
        });
        router.replace('/social');
      });

    return () => {
      socket.off('newDm');
      socket.off('DmHistory');
    };
  }, []);

  //여기서 차단 여부, 친구 여부 확인해서 아니면 페이지를 이동시켜버림.
  useEffect(() => {
    if (blockUsers !== null && blockUsers?.includes(chatUser as string)) {
      toast({
        title: 'DM 실패!',
        variant: 'destructive',
        description: '차단한 사용자입니다.'
      });
      router.replace('/social', undefined, {shallow: true});
    } else if (
      friendUsers !== null &&
      !friendUsers?.includes(chatUser as string)
    ) {
      toast({
        title: 'DM 실패!',
        variant: 'destructive',
        description: '친구가 아닙니다.'
      });
      router.replace('/social', undefined, {shallow: true});
    }
  }, [blockUsers, friendUsers]);

  // when getDMData() is done, setDMData() to the result

  if (blockUsers === null || friendUsers === null) return <SpinningLoader />;

  if (!DMData) return <SpinningLoader />;

  async function handleSendDM() {
    // wait for 1 sec
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = true; // change to false to test friend request failed
    if (response) {
      // if success,
    } else {
      // if failed, show error message
    }
  }

  // ---------------------------------------------------------------------------

  return (
    <>
      <div className='bg-custom4'>header</div>
      <ScrollableContainer gap={3}>
        <div>
          {DMData.map((dm) => (
            <DMCard key={dm.id} dmInfo={dm} myName='sender' className='mb-3' />
          ))}
        </div>
      </ScrollableContainer>
      <MessageInputBar
        isSending={isSending}
        setIsSending={setIsSending}
        msg={msg}
        setMsg={setMsg}
        handleSendMsg={handleSendDM}
      />
    </>
  );
}
