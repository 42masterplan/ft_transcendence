import {useEffect, useState} from 'react';
import {Button} from '@/components/shadcn/ui/button';
import useChatSocket from '@/hooks/useChatSocket';
import {EngagedChannelType} from '@/types/channel';
function channelListRender(setCurChannel: (idx: string) => void) {
  const [engagedChannels, setEngagedChannels] = useState(
    [] as EngagedChannelType[]
  );
  // const {channelList} = useContext(APIContext);
  //이거 socket.io에서 정보 알 수 있음.
  const [socket] = useChatSocket('channel');
  useEffect(() => {
    socket.on('myChannels', (data) => {
      console.log('채널리스트 변경');
      console.log(data);
      setEngagedChannels(data);
    });
  }, [engagedChannels]);
  const handleChannelClick = (idx: number) => {
    //채널방 클릭시 채널방 정보를 받아옵니다.
    console.log(`채널방 클릭시 ${idx}채널방 정보를 받아옵니다.`);
    // setCurChannel(channelList[idx].channelName);
  };
  return (
    <div className='flex flex-col min-w-[100px] h-full border overflow-y-scroll rounded-l-xl bg-custom2'>
      <div className='min-h-[40px] text-l text-custom4 text-center sticky top-0 z-20 bg-custom2'>
        참여중인 채널 목록
      </div>
      {engagedChannels.map((channel, idx) => (
        <Button
          className='bg-custom2 hover:bg-custom3 border-b'
          onClick={() => handleChannelClick(idx)}
          key={idx}
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

export default function ChannelList({
  setCurChannel
}: {
  currentChannel: string;
  setCurChannel: (idx: string) => void;
}) {
  return channelListRender(setCurChannel);
}
