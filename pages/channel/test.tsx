import {CardsChat} from '@/components/channel2/ChatRoom';
import ChannelList from '@/components/channel2/ChannelList';
import {use, useState} from 'react';
import ChannelHeader from '@/components/channel2/ChannelHeader';
import Image from 'next/image';
import WaitImage from '@/public/postcss.config.png';
import io from 'socket.io-client';
import {useEffect} from 'react';
// const socket = io('http://localhost:4001');
export default function ChannelPage() {
  const [currentChannel, setCurChannel] = useState('');
  //여기서는 채널 페이지를 들어올 때 처음 소켓 연결을 수립하지만, 실제로는 모든 페이지에서 socket을 연결한 채로 유지해야만 한다.
  // socket.emit('enter_room', 'RoomNameTest', () => {
  //   console.log('socket connected');
  // });
  // useEffect(() => {
  //   // socket.on('disconnect', () => {
  //   //   console.log('socket disconnected');
  //   // });
  // }, []);
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
