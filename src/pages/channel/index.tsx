import {CardsChat} from '@/components/channel/ChatRoom';
import ChannelList from '@/components/channel/ChannelList';
import {Button} from '@/components/shadcn/button';
import {useState, useContext, useRef, useEffect} from 'react';
import {APIContext} from '@/components/Layout';
import ChannelHeader from '@/components/channel/ChannelHeader';
export default function Channel() {
  // const {channelInfo} = useContext(APIContext);
  // const [channelInfos, setChannelInfos] = useState(channelInfo);
  const [currentChannel, setCurChannel] = useState('채널이름');
  return (
    <div className='flex max-h-[950px] '>
      <ChannelList
        currentChannel={currentChannel}
        setCurChannel={setCurChannel}
      />
      <div className='flex flex-col'>
        <ChannelHeader channel_name={currentChannel} />
        <CardsChat currentChannel={currentChannel} />
      </div>
    </div>
  );
}
