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
import Image from 'next/image';
import WaitImage from '@/public/postcss.config.png';
export default function ChannelPage() {
  // const {channelInfo} = useContext(APIContext);
  // const [channelInfos, setChannelInfos] = useState(channelInfo);
  const [currentChannel, setCurChannel] = useState('');
  return (
    <div className='flex h-fit'>
      <ChannelList
        currentChannel={currentChannel}
        setCurChannel={setCurChannel}
      />
      {currentChannel === '' ? (
        <div className='flex flex-col items-center '>
          <ChannelHeader channel_name={currentChannel} />
          <Image
            src={WaitImage}
            alt='채널에 참여해주세요'
            className='bg-custom4'
          ></Image>
        </div>
      ) : (
        <div className='flex flex-col'>
          <ChannelHeader channel_name={currentChannel} />
          <CardsChat currentChannel={currentChannel} />
        </div>
      )}
    </div>
  );
}
