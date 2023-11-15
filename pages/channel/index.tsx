import {ChannelBody} from '@/components/channel/body/ChannelBody';
import ChannelList from '@/components/channel/list/ChannelList';
import {useState} from 'react';
import ChannelHeader from '@/components/channel/header/ChannelHeader';
import Image from 'next/image';
import WaitImage from '@/public/postcss.config.png';
import {useEffect} from 'react';
import useChatSocket from '@/hooks/useChatSocket';
import {ChannelHistoryType} from '@/types/channel';
import ChannelInput from '@/components/channel/body/ChannelInput';
import ScrollableContainer from '@/components/container/ScrollableContainer';
// const socket = io('http://localhost:4001');

export default function ChannelPage() {
  const [currentChannel, setCurChannel] = useState('');
  const [channelId, setChannelId] = useState('');
  const [role, setRole] = useState('');

  //여기서는 채널 페이지를 들어올 때 처음 소켓 연결을 수립하지만, 실제로는 모든 페이지에서 socket을 연결한 채로 유지해야만 한다.
  const [socket] = useChatSocket('channel');
  const [messages, setMessages] = useState([] as ChannelHistoryType[]);
  useEffect(() => {
    socket.emit('myChannels', () => {
      console.log('참여중인 채널 리스트 요청');
    });
    socket.on('myRole', (data) => {
      console.log('권한 설정', data);
      setRole(data.role);
    });
    socket.once('setUserInfo', () => {
      socket.emit('setUserInfo', {
        username: 'joushin',
        userId: 'joushin',
        profileImage: process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI4
      }); //추후 recoil로 유저 정보 관리할 예정인데, 일단은 임시로 넣어둠
    });
  }, []);

  return (
    <div className='flex h-full'>
      <ChannelList
        currentChannel={currentChannel}
        setCurChannel={setCurChannel}
        setMessages={setMessages}
        setChannelId={setChannelId}
      />
      {currentChannel === '' ? (
        <div className='flex flex-col items-center h-full'>
          <ChannelHeader channel_name={currentChannel} />
          <Image
            src={WaitImage}
            alt='채널에 참여해주세요'
            className='bg-custom4 h-full w-full'
          ></Image>
        </div>
      ) : (
        <div className='flex flex-col w-full h-full'>
          <ChannelHeader channel_name={currentChannel} />
          <ScrollableContainer>
            <ChannelBody
              messages={messages}
              setMessages={setMessages}
              channelId={channelId}
              role={role}
            />
          </ScrollableContainer>
          <ChannelInput
            messages={messages}
            setMessages={setMessages}
            channelId={channelId}
          />
        </div>
      )}
    </div>
  );
}
