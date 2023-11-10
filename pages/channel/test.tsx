import {CardsChat} from '@/components/channel2/ChatRoom';
import ChannelList from '@/components/channel2/ChannelList';
import {useState} from 'react';
import ChannelHeader from '@/components/channel2/ChannelHeader';
import Image from 'next/image';
import WaitImage from '@/public/postcss.config.png';
export default function ChannelPage() {
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
          {/* <CardsChat currentChannel={currentChannel} /> */}
        </div>
      )}

      <div className='flex flex-col'>
        {/* <ChannelHeader channel_name={currentChannel} /> */}
        {/* <CardsChat currentChannel={currentChannel} /> */}
      </div>
    </div>
  );
}
