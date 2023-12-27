import {useEffect, useState, useRef} from 'react';
import SpinningLoader from '@/components/loader/SpinningLoader';
import {useRouter} from 'next/router';
import ScrollableContainer from '@/components/container/ScrollableContainer';
import ChatMessage from '@/components/channel/body/ChatMessage';
import useSocket from '@/hooks/useSocket';
import Axios from '@/api';
import {MsgHistoryType} from '@/types/channel';
import {useToast} from '@/components/shadcn/ui/use-toast';
import {cn} from '@/lib/utils';
import DMInput from '@/components/input/DmInput';
import {dmMessageType} from '@/types/dm';
export default function DMPage() {
  const router = useRouter();
  const [msg, setMsg] = useState('');
  const [DMData, setDMData] = useState<dmMessageType[] | null>(null);
  const [socket] = useSocket('alarm');
  const [blockUsers, setBlockUsers] = useState<string[] | null>(null);
  const [friendUsers, setFriendUsers] = useState<string[] | null>(null);
  const messageEndRef = useRef<HTMLDivElement>();
  const {toast} = useToast();
  //친구인지 아닌지 알기 위해서
  const chatUser = router.query.userName || '';
  useEffect(() => {
    socket.on(
      'newDm',
      ({dm, sendFrom}: {dm: MsgHistoryType; sendFrom: string}) => {
        if (sendFrom !== chatUser) return;
        setDMData((prev) => {
          if (prev === null) return [dm];
          return [...prev, dm];
        });
      }
    );
    dataFetch();
    socket.emit('DmHistory', chatUser, ({message}: dmMessageType[]) => {
      //TODO dmId가 현재 내 DM ID인지 확인
			setDMData(message);
      else console.log('디엠 가져오기 실패');
    });
    return () => {
      socket.off('newDm');
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
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [DMData]);

  const dataFetch = () => {
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
  };

  if (blockUsers === null || friendUsers === null) return <SpinningLoader />;

  // if (!DMData) return <SpinningLoader />;
  // ---------------------------------------------------------------------------

  return (
    <>
      <div className='bg-custom4'>header</div>
      <div className='h-full'>
        <ScrollableContainer className='rounded-none'>
          <div>
            {DMData?.map((msg: dmMessageType, idx: number) => (
              <div
                key={idx}
                className={cn(
                  'flex w-max max-w-[90%] rounded-lg px-3 text-sm',
                  msg.name === 'hkong' ? 'ml-auto' : 'p-2'
                )}
              >
                {/* TODO 채팅 메시지 내 정보랑 비교하기
                 */}
                <ChatMessage
                  isMe={msg.name === 'hkong'}
                  size='md'
                  message={msg.content}
                  side={msg.name === 'hkong' ? 'right' : 'left'}
                  className='m-2 hover:scale-[1.02] duration-200 hover:-translate-y-1 bg-custom4'
                  ref={messageEndRef as any}
                  profileImage={msg.profileImage}
                  user_name={msg.name}
                  channelId={''}
                  role={'user'}
                  user_id={msg.id}
                />
              </div>
            ))}
          </div>
        </ScrollableContainer>
      </div>
      <DMInput
        msg={msg}
        chatUser={chatUser}
        setDMData={setDMData}
        setMsg={setMsg}
      />
    </>
  );
}
