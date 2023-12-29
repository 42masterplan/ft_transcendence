import {useEffect, useState, useRef} from 'react';
import SpinningLoader from '@/components/loader/SpinningLoader';
import {useRouter} from 'next/router';
import ScrollableContainer from '@/components/container/ScrollableContainer';
import ChatMessage from '@/components/channel/body/ChatMessage';
import useSocket from '@/hooks/useSocket';
import {MsgHistoryType} from '@/types/channel';
import {useToast} from '@/components/shadcn/ui/use-toast';
import {cn} from '@/lib/utils';
import DMInput from '@/components/input/DmInput';
import {dmMessageType, dmInfoType} from '@/types/dm';
import useAxios from '@/hooks/useAxios';
export default function DMPage() {
  const messageEndRef = useRef<HTMLDivElement>();
  const [DMData, setDMData] = useState<dmMessageType[]>([]);
  const [dmInfo, setDMInfo] = useState<dmInfoType>({
    dmId: '',
    myId: '',
    myName: '',
    myProfileImage: '',
    FriendName: '',
    FriendProfileImage: ''
  });
  const router = useRouter();
  const {toast} = useToast();
  const [socket] = useSocket('alarm');
  const {fetchData, loading, response, isSuccess, error} = useAxios();
  //친구인지 아닌지 알기 위해서
  const chatUser = router.query.userName || '';
  useEffect(() => {
    socket.on(
      'DMNewMessage',
      ({dm, sendFrom}: {dm: MsgHistoryType; sendFrom: string}) => {
        if (sendFrom !== chatUser) return;
        setDMData((prev) => {
          if (prev === null) return [dm];
          return [...prev, dm];
        });
      }
    );

    socket.emit('myInfo', (data) => {
      setDMInfo((prev) => ({
        ...prev,
        myId: data.id,
        myName: data.name,
        myProfileImage: data.profileImage
      }));
    });
    return () => {
      socket.off('newDm');
    };
  }, []);
  useEffect(() => {
    if (chatUser === '') return;
    fetchData({
      method: 'get',
      url: `users/friends/isFriend`,
      params: {name: chatUser}
    });
    socket.emit('DmHistory', chatUser, (data) => {
      console.log('DmHistory', data);
      if (data === 'DmHistory Fail!')
        toast({
          title: 'DM 가져오기 실패!',
          variant: 'destructive',
          description: 'DM 가져오기 실패!'
        });
      else {
        setDMData(data.messages);
        setDMInfo((prev) => ({
          ...prev,
          dmId: data.dmId,
          FriendProfileImage: data.profileImage,
          FriendName: data.name
        }));
      }
    });
  }, [chatUser]);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [DMData]);

  useEffect(() => {
    if (isSuccess && response.isFriends === false) {
      toast({
        title: 'DM 실패!',
        variant: 'destructive',
        description: '친구가 아닙니다.'
      });
      router.replace('/social');
    } else if (error === true) {
      router.replace('/social');
    }
  }, [isSuccess, error]);
  if (loading || dmInfo.dmId === '' || dmInfo.myId === '')
    return <SpinningLoader />;
  return (
    <>
      <div className=' bg-custom3 text-center text-lg'>{chatUser}</div>
      <div className='h-full'>
        <ScrollableContainer className='rounded-none bg-custom2'>
          <div>
            {DMData?.map((msg: dmMessageType, idx: number) => (
              <div
                key={idx}
                className={cn(
                  'flex w-max max-w-[90%] rounded-lg px-3 text-sm',
                  msg._participantId === dmInfo.myId ? 'ml-auto' : 'p-2'
                )}
              >
                <ChatMessage
                  isMe={msg._participantId === dmInfo.myId}
                  size='md'
                  message={msg._content}
                  side={msg.participantId === dmInfo.myId ? 'right' : 'left'}
                  className='m-2 hover:scale-[1.02] duration-200 hover:-translate-y-1 bg-custom4'
                  ref={messageEndRef as any}
                  profileImage={
                    msg._participantId === dmInfo.myId
                      ? dmInfo.myProfileImage
                      : dmInfo.FriendProfileImage
                  }
                  user_name={
                    msg._participantId === dmInfo.myId
                      ? dmInfo.myName
                      : dmInfo.FriendName
                  }
                  channelId={''}
                  role={'user'}
                  user_id={msg._participantId}
                />
              </div>
            ))}
          </div>
        </ScrollableContainer>
      </div>
      <DMInput setDMData={setDMData} dmInfo={dmInfo} />
    </>
  );
}
