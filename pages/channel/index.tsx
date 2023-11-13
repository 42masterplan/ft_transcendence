import {ChannelBody} from '@/components/channel/ChatRoom';
import ChannelList from '@/components/channel/ChannelList';
import {useState} from 'react';
import ChannelHeader from '@/components/channel/ChannelHeader';
import Image from 'next/image';
import WaitImage from '@/public/postcss.config.png';
import io from 'socket.io-client';
import {useEffect} from 'react';
import useChatSocket from '@/hooks/useChatSocket';
import {ChannelHistoryType} from '@/types/channel';
// const socket = io('http://localhost:4001');
export default function ChannelPage() {
  const [currentChannel, setCurChannel] = useState('');
  //여기서는 채널 페이지를 들어올 때 처음 소켓 연결을 수립하지만, 실제로는 모든 페이지에서 socket을 연결한 채로 유지해야만 한다.
  const [socket] = useChatSocket('channel');
  const [messages, setMessages] = useState([] as ChannelHistoryType[]);
  useEffect(() => {
    socket.emit('myChannels', () => {
      console.log('참여중인 채널 리스트 요청');
    });
  }, []);
  return (
    <div className='flex h-[60vh]'>
      <ChannelList
        currentChannel={currentChannel}
        setCurChannel={setCurChannel}
        setMessages={setMessages}
      />
      {currentChannel === '' ? (
        <div className='flex flex-col items-center h-[60vh] '>
          <ChannelHeader channel_name={currentChannel} />
          <Image
            src={WaitImage}
            alt='채널에 참여해주세요'
            className='bg-custom4'
          ></Image>
        </div>
      ) : (
        <div className='flex flex-col '>
          <ChannelHeader channel_name={currentChannel} />
          <ChannelBody
            currentChannel={currentChannel}
            messages={messages}
            setMessages={setMessages}
          />
        </div>
      )}
    </div>
  );
}
