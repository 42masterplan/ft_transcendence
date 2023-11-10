// export default function ChannelPage() {
//   return (
//     <div className="w-full flex flex-col items-center justify-center">
//       <h1 className="text-5xl font-bold">Channel</h1>
//     </div>
//   )
// }
import {CardsChat} from '@/components/channel/ChatRoom';
import ChannelList from '@/components/channel/ChannelList';
import {useState, useContext, useRef, useEffect} from 'react';
import ChannelHeader from '@/components/channel/ChannelHeader';

export default function ChannelPage() {
  // const {channelInfo} = useContext(APIContext);
  // const [channelInfos, setChannelInfos] = useState(channelInfo);
  const [currentChannel, setCurChannel] = useState('채널이름');
  return (
    <div className='flex w-full'>
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
