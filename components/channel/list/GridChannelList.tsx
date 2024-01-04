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
import BigPublicRoomList from '../header/publicRoom/BigPublicRoomList';
import BigCreateChannel from '../header/createChannel/BigCreateChannel';

export default React.forwardRef(function GridChannelList(
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

  if (channelInfoState.engagedChannels.length === 0) {
    return (
      <div className='flex flex-col justify-center items-center min-w-fit h-full rounded-xl bg-custom2 p-2 mr-2 gap-20'>
        <div className='flex flex-col justify-center items-center gap-5'>
          <div className='flex flex-row gap-3 text-5xl'>
            <div>참여중인 채널이 없네요</div>
            <div className=' animate-spin'>😢</div>
          </div>
          <div className=' text-3xl'>
            새로운 채널을 만들거나 존재하는 채널에 참가해 보세요!
          </div>
        </div>
        <div className='flex flex-row gap-10 items-center justify-center'>
          <BigPublicRoomList />
          <BigCreateChannel />
        </div>
      </div>
    );
  } else {
    return (
      <div className='flex flex-col min-w-fit h-full rounded-xl bg-custom2 p-2 mr-2'>
        <div className='flex w-full h-20 justify-between items-center p-5'>
          <PublicRoomList />
          <div className='text-center text-xl font-bold p-4'>
            참여중인 채널 목록
          </div>
          <CreateChannel />
        </div>
        <ScrollableContainer className=''>
          <div className='grid grid-cols-3 gap-10 py-8'>
            {channelInfoState.engagedChannels.map(
              (channel: EngagedChannelType) => (
                <Button
                  className={
                    'mx-1 pl-6 h-36 bg-custom1 rounded-3xl hover:bg-custom1-500 justify-between hover:scale-[1.05] hover:-translate-y-1 transition duration-300 '
                  }
                  onClick={() => {
                    handleChannelClick(channel);
                  }}
                  key={channel.id}
                >
                  <div className=' text-gray-300 text-2xl truncate ...'>
                    {channel.name}
                  </div>
                  <div className='flex justify-center items-center text-custom4 rounded-lg text-center bg-custom3 w-10 h-10'>
                    {channel.userCount}
                  </div>
                </Button>
              )
            )}
          </div>
        </ScrollableContainer>
      </div>
    );
  }
});
