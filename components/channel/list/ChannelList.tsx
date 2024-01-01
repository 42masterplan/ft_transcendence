import {Button} from '@/components/shadcn/ui/button';
import useSocket from '@/hooks/useSocket';
import {EngagedChannelType} from '@/types/channel';
import {cn} from '@/lib/utils';
import {channelStateType, MsgHistoryType} from '@/types/channel';
import React from 'react';
import {useEffect, Dispatch, SetStateAction, useCallback} from 'react';
import {useRouter} from 'next/router';
import {useToast} from '@/components/shadcn/ui/use-toast';

export default React.forwardRef(function ChannelList(
  {
    channelInfoState,
    infoDispatch,
    messageDispatch
  }: {
    channelInfoState: channelStateType;
    messageDispatch: Dispatch<SetStateAction<any>>;
    infoDispatch: Dispatch<SetStateAction<any>>;
  },
  ref: any
) {
  const [socket] = useSocket('channel');
  const router = useRouter();
  const {toast} = useToast();
  const myChannelsListener = useCallback((data: EngagedChannelType[]) => {
    infoDispatch({
      type: 'ENGAGED_SET',
      payload: data
    });
    console.log('마이채널 핸들러');
    if (data.length > 0) {
      //current.channelId is not in data?
      for (const befChannel of ref.current.engagedChannels) {
        let isExist = false;
        for (const channel of data) {
          if (channel.id === befChannel.id) {
            isExist = true;
            break;
          }
        }
        if (isExist === false) {
          toast({
            title: '채널에서 나감',
            description: `${befChannel.name} 채널에서 추방 또는 나왔습니다.`,
            variant: 'destructive'
          });
          infoDispatch({
            type: 'CHANNEL_LEAVE'
          });
          ref.current.channelId = '';
          ref.current.engagedChannels = data;
          break;
        }
      }
      ref.current.engagedChannels = data;
    }
  }, []);
  const channelHistoryHandler = useCallback((data: MsgHistoryType[]) => {
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
    ref.current.channelId = channel.id;
    infoDispatch({
      type: 'NAME_SET',
      payload: channel.name
    });
    ref.current.channelName = channel.name;
    console.log('channelHistoryHandler', channel.id);
    socket.emit(
      'channelHistory',
      {channelId: ref.current.channelId},
      channelHistoryHandler
    );
  }, []);
  useEffect(() => {
    socket.on('myChannels', myChannelsListener);

    return () => {
      socket.off('myChannels', myChannelsListener);
    };
  }, []);
  useEffect(() => {
    socket.emit('myChannels');
  }, [router.pathname, socket]);
  return (
    <div className='flex flex-col min-w-[100px] h-full border overflow-y-scroll rounded-l-xl bg-custom2 w-[20vw] max-w-[300px]'>
      <div className='min-h-[50px] text-l text-center sticky top-0 z-20 bg-custom2 flex justify-center items-center'>
        참여중인 채널 목록
      </div>
      {channelInfoState.engagedChannels.map((channel: EngagedChannelType) => (
        <Button
          className={cn(
            'bg-custom2 hover:bg-custom3 border justify-between',
            channel.id == channelInfoState.channelId ? 'bg-custom3' : ''
          )}
          onClick={() => {
            handleChannelClick(channel);
          }}
          variant='ghost'
          key={channel.id}
        >
          <span className='truncate ...'>{channel.name}</span>
          <span className='text-xs font-bold'>
            {'(' + channel.userCount + ')'}
          </span>
        </Button>
      ))}
    </div>
  );
});
