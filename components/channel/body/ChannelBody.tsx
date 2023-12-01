import {cn} from '@/lib/utils';

import {useRef, useEffect, Dispatch, SetStateAction, useCallback} from 'react';

import {ChannelHistoryType} from '@/types/channel';
import ChatMessage from '@/components/channel/body/ChatCard';
import ScrollableContainer from '../../container/ScrollableContainer';
import useChatSocket from '@/hooks/useChatSocket';

export function ChannelBody({
  channelInfoState,
  messageState,
  messageDispatch
}: {
  channelInfoState: any;
  messageState: any;
  messageDispatch: any;
}) {
  const messageEndRef = useRef<HTMLDivElement>();
  const [socket] = useChatSocket('channel');
  function handleMessageAdd(payload: any) {
    messageDispatch({
      type: 'MESSAGE_ADD',
      payload: payload
    });
  }
  const newMessageHandler = useCallback(
    ({channelId, userId, userName, profileImage, content}: any) => {
      console.log('newMessage');
      console.log(channelId, userId, userName, profileImage, content);
      console.log('myChannelId', channelInfoState.channelID);
      if (channelInfoState.channelID === channelId) {
        console.log('메세지가 도착했습니다.');
        handleMessageAdd({
          id: userId,
          name: userName,
          profileImage: profileImage,
          content: content
        });
      }
    },
    []
  );
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messageState]);
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
          {messageState ? (
            <>
              {messageState.map((msg: ChannelHistoryType, idx: number) => (
                <div
                  key={idx}
                  className={cn(
                    'flex w-max max-w-[90%] rounded-lg px-3 text-sm',
                    msg.name === 'joushin' ? 'ml-auto' : 'p-2'
                  )}
                >
                  <ChatMessage
                    isMe={msg.name === 'joushin'}
                    size='md'
                    message={msg.content}
                    side={msg.name === 'joushin' ? 'right' : 'left'}
                    className='m-2 hover:scale-[1.02] duration-200 hover:-translate-y-1 bg-custom4'
                    ref={messageEndRef as any}
                    profileImage={msg.profileImage}
                    user_name={msg.name}
                    channelId={channelInfoState.channelID}
                    role={channelInfoState.role}
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
