import {Button} from '@/components/shadcn/ui/button';
import useChatSocket from '@/hooks/useChatSocket';
import {EngagedChannelType} from '@/types/channel';
import {cn} from '@/lib/utils';
import {ChannelHistoryType} from '@/types/channel';
import {useEffect, useState, Dispatch, SetStateAction} from 'react';

export default function ChannelList({
  currentChannel,
  setCurChannel,
  setMessages
}: {
  currentChannel: string;
  setCurChannel: (id: string) => void;
  setMessages: Dispatch<SetStateAction<ChannelHistoryType[]>>;
}) {
  const [engagedChannels, setEngagedChannels] = useState(
    [] as EngagedChannelType[]
  );
  const [socket] = useChatSocket('channel');
  useEffect(() => {
    socket.on('myChannels', (data) => {
      setEngagedChannels(data);
    });
  }, []);
  const handleChannelClick = (id: string) => {
    //채널방 클릭시 채널방 정보를 받아옵니다.
    console.log(`채널방 클릭시 '${id}'채널방 정보를 받아옵니다.`);
    socket.emit('channelHistory', {roomid: id});
    socket.once('channelHistory', (data) => {
      console.log(data);
      setMessages(data);
    });
    setCurChannel(id);
  };
  return (
    <div className='flex flex-col min-w-[100px] h-full border overflow-y-scroll rounded-l-xl bg-custom2 w-[20vw] max-w-[300px]'>
      <div className='min-h-[40px] text-l text-custom4 text-center sticky top-0 z-20 bg-custom2'>
        참여중인 채널 목록
      </div>
      {engagedChannels.map((channel) => (
        <Button
          className={cn(
            'bg-custom2 hover:bg-custom3 border-b',
            channel.id === currentChannel ? 'bg-custom3' : ''
          )}
          onClick={() => handleChannelClick(channel.id)}
          key={channel.id}
        >
          <span className='text-base text-sky-300 '>{channel.channelName}</span>
          <span className='text-violet-400  text-xs font-bold'>
            {channel.userCount}
          </span>
        </Button>
      ))}
    </div>
  );
}
