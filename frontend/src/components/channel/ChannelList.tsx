import {APIContext, type FriendInfoType} from '../Layout';
import {useContext, useRef, useEffect} from 'react';
import {Button} from '../shadcn/button';

function channelListRender(currentChannel, setCurChannel) {
  const {channelList} = useContext(APIContext);
  const handleChannelClick = (idx: number) => {
    //채널방 클릭시 채널방 정보를 받아옵니다.
    console.log(`채널방 클릭시 ${idx}채널방 정보를 받아옵니다.`);
    setCurChannel(channelList[idx].channelName);
  };
  return (
    <div className='flex flex-col justify-start max-h-[550px]  border bg-primary overflow-y-scroll overflow-x-hidden rounded-l-xl h-screen min-w-[300px]'>
      <div className='flex flex-col text-3xl text-white text-center h-20 justify-center  content-center'>
        채널 목록
      </div>
      {channelList.map((channel, idx) => (
        <Button
          variant='ghost'
          size='channel'
          onClick={() => handleChannelClick(idx)}
          key={idx}
        >
          <div className='font-bold text-2xl text-sky-300 '>
            {channel.channelName}
          </div>
          <div className='text-violet-400  text-2xl font-bold'>
            {channel.userSize}
          </div>
        </Button>
      ))}
    </div>
  );
}

export default function ChannelList({
  currentChannel,
  setCurChannel
}: {
  currentChannel: string;
  setCurChannel: (idx: string) => void;
}) {
  return channelListRender(currentChannel, setCurChannel);
}
