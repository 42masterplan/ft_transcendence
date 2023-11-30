import {cn} from '@/lib/utils';

import {useRef, useEffect, Dispatch, SetStateAction, useCallback} from 'react';

import {ChannelHistoryType} from '@/types/channel';
import ChatMessage from '@/components/channel/body/ChatCard';
import ScrollableContainer from '../../container/ScrollableContainer';
import useChatSocket from '@/hooks/useChatSocket';

export function ChannelBody({
  messages,
  setMessages,
  nowChannelId,
  role,
  channel_name
}: {
  messages: ChannelHistoryType[];
  setMessages: Dispatch<SetStateAction<ChannelHistoryType[]>>;
  nowChannelId: string;
  role: string;
  channel_name: string;
}) {
  const messageEndRef = useRef<HTMLDivElement>();
  const [socket] = useChatSocket('channel');
  const newMessageHandler = useCallback(
    ({channelId, userId, userName, profileImage, content}: any) => {
      console.log('newMessage');
      console.log(channelId, userId, userName, profileImage, content);
      console.log('myChannelId', nowChannelId);
      // if (nowChannelId === channelId) {
      console.log('메세지가 도착했습니다.');
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: userId,
          name: userName,
          profileImage: profileImage,
          content: content
        }
      ]);
      // }
    },
    []
  );
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);
  useEffect(() => {
    socket.on('newMessage', newMessageHandler);
    return () => {
      socket.off('newMessage', newMessageHandler);
    };
  }, []);
  return (
    <div className='h-full'>
      <ScrollableContainer className='rounded-none'>
        <div>
          {messages ? (
            <>
              {messages.map((message, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'flex w-max max-w-[90%] rounded-lg px-3 text-sm',
                    message.name === 'joushin' ? 'ml-auto' : 'p-2'
                  )}
                >
                  <ChatMessage
                    isMe={message.name === 'joushin'}
                    size='md'
                    message={message.content}
                    side={message.name === 'joushin' ? 'right' : 'left'}
                    className='m-2 hover:scale-[1.02] duration-200 hover:-translate-y-1 bg-custom4'
                    ref={messageEndRef as any}
                    profileImage={message.profileImage}
                    user_name={message.name}
                    channelId={nowChannelId}
                    role={role}
                  />
                </div>
              ))}
            </>
          ) : null}
        </div>
      </ScrollableContainer>
    </div>
  );
}
