import {ChannelBody} from '@/components/channel/body/ChannelBody';
import ChannelList from '@/components/channel/list/ChannelList';
import {useCallback, useState} from 'react';
import ChannelHeader from '@/components/channel/header/ChannelHeader';
import Image from 'next/image';
import WaitImage from '@/public/postcss.config.png';
import {useEffect} from 'react';
import useChatSocket from '@/hooks/useChatSocket';
import {ChannelHistoryType} from '@/types/channel';
import ChannelInput from '@/components/channel/body/ChannelInput';
import ScrollableContainer from '@/components/container/ScrollableContainer';
import {toast} from '@/components/shadcn/ui/use-toast';
// const socket = io('http://localhost:4001');

export default function ChannelPage() {
  const [currentChannel, setCurChannel] = useState('');
  const [nowChannelId, setNowChannelId] = useState('');
  const [role, setRole] = useState('');

  //여기서는 채널 페이지를 들어올 때 처음 소켓 연결을 수립하지만, 실제로는 모든 페이지에서 socket을 연결한 채로 유지해야만 한다.
  const [socket] = useChatSocket('channel');

  const [messages, setMessages] = useState([] as ChannelHistoryType[]);

  const myRoleHandler = useCallback(({role}: any) => {
    console.log('myRole', role);
    setRole(role);
  }, []);

  const errorHandler = useCallback(({error}: any) => {
    console.log('error', error);
    toast(error);
  }, []);
  const channelHistoryHandler = useCallback(({channelHistory}: any) => {
    console.log('channelHistory', channelHistory);
    if (channelHistory !== undefined) setMessages(channelHistory);
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('---------connected----------');
      socket.on('myRole', myRoleHandler);
      socket.on('error_exist', errorHandler);
      // socket.on('channelHistory', channelHistoryHandler);
    });
    socket.on('disconnect', () => {
      console.log('---------disconnected----------');
    });
    return () => {
      console.log('---------off----------');
      // socket.off('channelHistory', channelHistoryHandler);
      socket.off('myRole', myRoleHandler);
      socket.off('error_exist', errorHandler);
    };
  }, []);

  return (
    <div className='flex h-full'>
      <ChannelList
        currentChannel={currentChannel}
        setCurChannel={setCurChannel}
        setMessages={setMessages}
        setChannelId={setNowChannelId}
      />
      {currentChannel === '' ? (
        <div className='flex flex-col items-center h-full'>
          <ChannelHeader
            channelId={nowChannelId}
            role={role}
            channel_name={currentChannel}
          />
          <Image
            src={WaitImage}
            alt='채널에 참여해주세요'
            className='bg-custom4 h-full w-full'
          ></Image>
        </div>
      ) : (
        <div className='flex flex-col w-full h-full'>
          <ChannelHeader
            channel_name={currentChannel}
            role={role}
            channelId={nowChannelId}
          />
          <ScrollableContainer className=' bg-custom2 rounded-none'>
            <ChannelBody
              channel_name={currentChannel}
              messages={messages}
              setMessages={setMessages}
              nowChannelId={nowChannelId}
              role={role}
            />
          </ScrollableContainer>
          <ChannelInput
            messages={messages}
            setMessages={setMessages}
            channelId={nowChannelId}
          />
        </div>
      )}
    </div>
  );
}
