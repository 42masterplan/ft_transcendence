import {cn} from '@/lib/utils';

import {useRef, useEffect, Dispatch, SetStateAction, useCallback} from 'react';

import {ChannelHistoryType} from '@/types/channel';
import ChatMessage from '@/components/channel/body/ChatCard';
import ScrollableContainer from '../../container/ScrollableContainer';
import useChatSocket from '@/hooks/useChatSocket';

export function ChannelBody({
  channelState,
  dispatch
}: {
  channelState: any;
  dispatch: any;
}) {
  const messageEndRef = useRef<HTMLDivElement>();
  const [socket] = useChatSocket('channel');
  function handleMessageAdd(payload: any) {
    dispatch({
      type: 'MESSAGE_ADD',
      payload: payload
    });
  }
  const newMessageHandler = useCallback(
    ({channelId, userId, userName, profileImage, content}: any) => {
      console.log('newMessage');
      console.log(channelId, userId, userName, profileImage, content);
      console.log('myChannelId', channelState.channelID);
      // if (channelState.channelID === channelId) {
      console.log('메세지가 도착했습니다.');
      handleMessageAdd({
        id: userId,
        name: userName,
        profileImage: profileImage,
        content: content
      });
      // }
    },
    []
  );
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [channelState.messages]);
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
          {typeof channelState.messages === 'object' ? (
            <>
              {channelState.messages.map((msg, idx) => (
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
                    channelId={channelState.channelID}
                    role={channelState.role}
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
