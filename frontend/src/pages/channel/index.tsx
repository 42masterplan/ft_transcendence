import {CardsChat} from '@/components/channel/ChatRoom';
import ChannelList from '@/components/channel/ChannelList';
import {Button} from '@/components/shadcn/button';
import {useState, useContext, useRef, useEffect} from 'react';
import {APIContext} from '@/components/Layout';

export default function Channel() {
  // const {channelInfo} = useContext(APIContext);
  // const [channelInfos, setChannelInfos] = useState(channelInfo);
  const [currentChannel, setCurChannel] = useState('채널이름');
  return (
    <>
      <div className='bg-red-500 h-2'></div>
      <div className='flex flex-row min-w-[640px] max-h-[950px]'>
        <ChannelList
          currentChannel={currentChannel}
          setCurChannel={setCurChannel}
        />
        <CardsChat currentChannel={currentChannel} />
      </div>
    </>
  );
}
