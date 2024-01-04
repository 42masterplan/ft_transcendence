import {useEffect, useState, useRef} from 'react';
import SpinningLoader from '@/components/loader/SpinningLoader';
import {useRouter} from 'next/router';
import ScrollableContainer from '@/components/container/ScrollableContainer';
import ChatMessage from '@/components/channel/body/ChatMessage';
import useSocket from '@/hooks/useSocket';
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
  const dmInfoRef = useRef(dmInfo);
  //친구인지 아닌지 알기 위해서
  const chatUser = router.query.userName || '';
  useEffect(() => {
    socket.on('DMNewMessage', ({dmId, participantId, content}) => {
      if (dmId !== dmInfoRef.current.dmId) return;
      setDMData((prev) => {
        return [
          ...prev,
          {
            _participantId: participantId,
            _content: content,
            _id: prev.length,
            _dmId: dmId
          }
        ];
      });
    });

    socket.emit('myInfo', (data: any) => {
      setDMInfo((prev) => ({
        ...prev,
        myId: data.id,
        myName: data.name,
        myProfileImage: data.profileImage
      }));
      dmInfoRef.current = {
        ...dmInfoRef.current,
        myId: data.id,
        myName: data.name,
        myProfileImage: data.profileImage
      };
    });
    return () => {
      socket.off('DMNewMessage');
    };
  }, []);
  useEffect(() => {
    if (chatUser === '') return;
    fetchData({
      method: 'get',
      url: `users/friends/isFriend`,
      params: {name: chatUser},
      disableSuccessToast: true
    });
    socket.emit('DmHistory', chatUser, (data: any) => {
      if (data === 'DmHistory Fail!')
        toast({
          title: 'DM 가져오기 실패!',
          variant: 'destructive',
          description: 'DM 가져오기 실패!'
        });
      else if (data === 'Not Friend!') {
        toast({
          title: 'DM 가져오기 실패!',
          variant: 'destructive',
          description: '친구가 아닙니다.'
        });
        router.replace('/social');
      } else {
        setDMData(data.messages);
        setDMInfo((prev) => ({
          ...prev,
          dmId: data.dmId,
          FriendProfileImage: data.profileImage,
          FriendName: data.name
        }));
        dmInfoRef.current = {
          ...dmInfoRef.current,
          dmId: data.dmId,
          FriendProfileImage: data.profileImage,
          FriendName: data.name
        };
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
      <div className=' text-xl font-bold text-center'>{chatUser}</div>
      <div className='flex flex-col h-5/6'>
        <ScrollableContainer className='bg-custom2 rounded-none h-full'>
          <div className='min-h-5/6 '>
            <ScrollableContainer className='rounded-none bg-custom2 min-h-5/6'>
              <div>
                {DMData?.map((msg: dmMessageType, idx: number) => (
                  <div
                    key={idx}
                    className={cn(
                      'flex w-max max-w-[90%] rounded-lg px-3 text-sm',
                      msg?._participantId === dmInfo.myId ? 'ml-auto' : ''
                    )}
                  >
                    <ChatMessage
                      isDm={true}
                      isMe={msg?._participantId === dmInfo.myId}
                      size='md'
                      message={msg?._content}
                      side={
                        msg?._participantId === dmInfo.myId ? 'right' : 'left'
                      }
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
        </ScrollableContainer>
        <DMInput setDMData={setDMData} dmInfo={dmInfo} />
      </div>
    </>
  );
}
