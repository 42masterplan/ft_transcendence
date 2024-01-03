import {cn} from '@/lib/utils';
import React from 'react';
import {useRef, useEffect, useCallback} from 'react';
import {MsgHistoryType, channelStateType} from '@/types/channel';
import ScrollableContainer from '../../container/ScrollableContainer';
import ChatMessage from '@/components/channel/body/ChatMessage';
import useSocket from '@/hooks/useSocket';
import SystemCard from './SystemCard';

interface MessageHandlerArgs {
  channelId: string;
  userId: string;
  userName: string;
  profileImage: string;
  content: string;
}

export default React.forwardRef(function ChannelBody(
  {
    channelInfoState,
    messageState,
    messageDispatch,
    historyLoading
  }: {
    channelInfoState: channelStateType;
    messageState: MsgHistoryType[];
    messageDispatch: any;
    historyLoading: any;
  },
  channelInfoRef: any
) {
  const messageEndRef = useRef<HTMLDivElement>();
  const [socket] = useSocket('channel');
  function handleMessageAdd(payload: any) {
    messageDispatch({
      type: 'MESSAGE_ADD',
      payload: payload
    });
  }
  const newMessageHandler = useCallback(
    ({
      channelId,
      userId,
      userName,
      profileImage,
      content
    }: MessageHandlerArgs) => {
      if (channelInfoRef?.current.channelId === channelId) {
        handleMessageAdd({
          id: userId,
          name: userName,
          profileImage: profileImage,
          content: content
        });
      }
      if (content.startsWith('[system]')) {
        if (!content.endsWith('뮤트되었습니다.')) socket.emit('myChannels');
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
          {messageState?.map((msg: MsgHistoryType, idx: number) =>
            msg.content.startsWith('[system]') ? (
              <SystemCard ref={messageEndRef} key={idx}>
                {msg.content.substring(8)}
              </SystemCard>
            ) : (
              <div
                key={idx}
                className={cn(
                  'flex w-max max-w-[90%] rounded-lg px-3 text-sm',
                  msg.id === channelInfoRef.current.myId ? 'ml-auto' : 'p-2'
                )}
              >
                <ChatMessage
                  isMe={msg.id === channelInfoRef.current.myId}
                  size='md'
                  message={msg.content}
                  side={
                    msg.id === channelInfoRef.current.myId ? 'right' : 'left'
                  }
                  className='m-2 hover:scale-[1.02] duration-200 hover:-translate-y-1 bg-custom4'
                  ref={messageEndRef as any}
                  profileImage={msg.profileImage}
                  user_name={msg.name}
                  channelId={channelInfoState.channelId}
                  role={
                    channelInfoState.engagedChannels?.find(
                      (channel) => channel.id === channelInfoState.channelId
                    )?.role || 'user'
                  }
                  user_id={msg.id}
                />
              </div>
            )
          )}
        </div>
      </ScrollableContainer>
      {historyLoading && (
        <div className='absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2'>
          <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-custom1'></div>
        </div>
      )}
    </div>
  );
});
