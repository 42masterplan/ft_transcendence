import {Button} from '@/components/shadcn/ui/button';
import useChatSocket from '@/hooks/useChatSocket';
import {EngagedChannelType} from '@/types/channel';
import {cn} from '@/lib/utils';
import {ChannelHistoryType} from '@/types/channel';
import React from 'react';
import {useEffect, Dispatch, SetStateAction, useCallback} from 'react';

export default React.forwardRef(function ChannelList(
  {
    channelInfoState,
    infoDispatch,
    messageDispatch
  }: {
    channelInfoState: any;
    messageDispatch: Dispatch<SetStateAction<any>>;
    infoDispatch: Dispatch<SetStateAction<any>>;
  },
  ref: any
) {
  const [socket] = useChatSocket('channel');
  const myChannelsListener = useCallback((data: EngagedChannelType[]) => {
    console.log('myChannelsListener', data);
    infoDispatch({
      type: 'ENGAGED_SET',
      payload: data
    });
  }, []);
  const channelHistoryHandler = useCallback((data: ChannelHistoryType[]) => {
    // console.log('channelHistoryListener', data);
    messageDispatch({
      type: 'MESSAGE_SET',
      payload: data
    });
  }, []);
  const handleChannelClick = useCallback((channel: any) => {
    //채널방 클릭시 채널방 정보를 받아옵니다.
    console.log(`채널방 클릭시 '${channel.id}'채널방 정보를 받아옵니다.`);
    infoDispatch({
      type: 'ID_SET',
      payload: channel.id
    });
    ref.current.channelID = channel.id;
    infoDispatch({
      type: 'NAME_SET',
      payload: channel.name
    });
    ref.current.channelName = channel.name;
    socket.emit('channelHistory', {roomid: channel.id}, channelHistoryHandler);
  }, []);
  useEffect(() => {
    socket.on('myChannels', myChannelsListener);
    return () => {
      socket.off('myChannels', myChannelsListener);
    };
  }, []);
  return (
    <div className='flex flex-col min-w-[100px] h-full border overflow-y-scroll rounded-l-xl bg-custom2 w-[20vw] max-w-[300px]'>
      <div className='min-h-[40px] text-l text-custom4 text-center sticky top-0 z-20 bg-custom2'>
        참여중인 채널 목록
      </div>
      {channelInfoState.engagedChannels.map((channel: EngagedChannelType) => (
        <Button
          className={cn(
            'bg-custom2 hover:bg-custom3 border-b',
            channel.id == channelInfoState.channelID ? 'bg-custom3' : ''
          )}
          onClick={() => {
            handleChannelClick(channel);
          }}
          key={channel.id}
        >
          <span className='text-base text-sky-300 '>{channel.name}</span>
          <span className='text-violet-400  text-xs font-bold'>
            {channel.userCount}
          </span>
        </Button>
      ))}
    </div>
  );
});
