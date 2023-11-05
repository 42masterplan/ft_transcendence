import {APIContext} from '@/DummyBackend/APIData';
import {useContext, useRef, useEffect} from 'react';
import {Button} from '@/components/shadcn/ui/button';

function channelListRender(setCurChannel: (idx: string) => void) {
  const {channelList} = useContext(APIContext);
  const handleChannelClick = (idx: number) => {
    //채널방 클릭시 채널방 정보를 받아옵니다.
    console.log(`채널방 클릭시 ${idx}채널방 정보를 받아옵니다.`);
    setCurChannel(channelList[idx].channelName);
  };
  return (
    <div className='flex flex-col max-h-[550px] border bg-primary overflow-y-scroll overflow-x-hidden rounded-l-xl h-screen'>
      <div className='min-h-[40px] text-xl text-white text-center sticky top-0 z-20 bg-black'>
        채널 목록
      </div>
      {channelList.map((channel, idx) => (
        <Button
          variant='ghost'
          onClick={() => handleChannelClick(idx)}
          key={idx}
        >
          <span className='text-base text-sky-300 '>{channel.channelName}</span>
          <span className='text-violet-400  text-xs font-bold'>
            {channel.userSize}
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
