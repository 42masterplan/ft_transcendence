import {Button} from '@/components/shadcn/ui/button';
import useSocket from '@/hooks/useSocket';
import {EngagedChannelType} from '@/types/channel';
import {cn} from '@/lib/utils';
import {channelStateType, MsgHistoryType} from '@/types/channel';
import React from 'react';
import {useEffect, Dispatch, SetStateAction, useCallback} from 'react';
import {useRouter} from 'next/router';
import {useToast} from '@/components/shadcn/ui/use-toast';
import ScrollableContainer from '@/components/container/ScrollableContainer';
import PublicRoomList from '../header/publicRoom/PublicRoomList';
import CreateChannel from '../header/createChannel/CreateChannel';

export default React.forwardRef(function ChannelList(
  {
    channelInfoState,
    infoDispatch,
    messageDispatch,
    setHistoryLoading
  }: {
    channelInfoState: channelStateType;
    messageDispatch: Dispatch<SetStateAction<any>>;
    infoDispatch: Dispatch<SetStateAction<any>>;
    setHistoryLoading: any;
  },
  ref: any
) {
  const [socket] = useSocket('channel');
  const router = useRouter();
  const {toast} = useToast();
  const myChannelsListener = useCallback(
    (data: EngagedChannelType[]) => {
      //current.channelId is not in data?
      for (const befChannel of ref.current.engagedChannels) {
        let isExist = false;
        for (const channel of data) {
          if (channel.id === befChannel.id) {
            isExist = true;
            continue;
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
          ref.current.channelName = '';

          break;
        }
      }
      infoDispatch({
        type: 'ENGAGED_SET',
        payload: data
      });
      ref.current.engagedChannels = data;
    },
    [socket, channelInfoState]
  );
  const channelHistoryHandler = useCallback((data: MsgHistoryType[]) => {
    messageDispatch({
      type: 'MESSAGE_SET',
      payload: data
    });
    ref.current.message = data;
    setHistoryLoading(false);
  }, []);
  const handleChannelClick = useCallback((channel: any) => {
    //채널방 클릭시 채널방 정보를 받아옵니다.
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
    setHistoryLoading(true);
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
    <div className='flex flex-col min-w-fit h-full rounded-xl bg-custom2 p-2 mr-2'>
      <div className='flex w-full justify-between gap-2'>
        <PublicRoomList />
        <CreateChannel />
      </div>
      <div className='text-center text-xl font-bold p-4'>
        참여중인 채널 목록
      </div>
      <ScrollableContainer className=''>
        {channelInfoState.engagedChannels.map((channel: EngagedChannelType) => (
          <Button
            className={cn(
              ' mx-1 bg-custom3 hover:bg-custom3-500 justify-between hover:scale-[1.02] hover:-translate-y-1 transition duration-300 ',
              channel.id == channelInfoState.channelId ? 'bg-custom4 h-16' : ''
            )}
            onClick={() => {
              handleChannelClick(channel);
            }}
            key={channel.id}
          >
            <div className='truncate ...'>{channel.name}</div>
            <div className=' rounded-xl text-center bg-gray-400 w-5'>
              {channel.userCount}
            </div>
          </Button>
        ))}
      </ScrollableContainer>
    </div>
  );
});
