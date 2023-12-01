import {Button} from '@/components/shadcn/ui/button';
import useChatSocket from '@/hooks/useChatSocket';
import {EngagedChannelType} from '@/types/channel';
import {cn} from '@/lib/utils';
import {ChannelHistoryType} from '@/types/channel';
import {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useCallback
} from 'react';

export default function ChannelList({
  channelState,
  dispatch
}: {
  channelState: any;
  dispatch: Dispatch<SetStateAction<any>>;
}) {
  const [engagedChannels, setEngagedChannels] = useState(
    [] as EngagedChannelType[]
  );
  const [socket] = useChatSocket('channel');
  const myChannelsListener = useCallback((data: EngagedChannelType[]) => {
    console.log('myChannelsListener', data);
    setEngagedChannels(data);
  }, []);
  const channelHistoryHandler = useCallback((data: ChannelHistoryType[]) => {
    console.log('channelHistoryListener', data);
    dispatch({
      type: 'MESSAGE_SET',
      payload: data
    });
  }, []);
  const handleChannelClick = (channel: any) => {
    //채널방 클릭시 채널방 정보를 받아옵니다.
    console.log(`채널방 클릭시 '${channel.id}'채널방 정보를 받아옵니다.`);
    dispatch({
      type: 'ID_SET',
      payload: channel.id
    });
    dispatch({
      type: 'NAME_SET',
      payload: channel.name
    });
    socket.emit('channelHistory', {roomid: channel.id}, channelHistoryHandler);
    console.log('너가 세팅한 channelId', channel.id);
  };
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
      {engagedChannels.map((channel) => (
        <Button
          className={cn(
            'bg-custom2 hover:bg-custom3 border-b',
            channel.id === channelState.channelId ? 'bg-custom3' : ''
          )}
          onClick={() => handleChannelClick(channel)}
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
}
