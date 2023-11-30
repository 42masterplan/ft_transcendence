import {useCallback, useState, useEffect} from 'react';
import Image from 'next/image';
import WaitImage from '@/public/postcss.config.png';
import {ChannelHistoryType} from '@/types/channel';
import useChatSocket from '@/hooks/useChatSocket';
import {ChannelBody} from '@/components/channel/body/ChannelBody';
import ChannelList from '@/components/channel/list/ChannelList';
import ChannelHeader from '@/components/channel/header/ChannelHeader';
import ScrollableContainer from '@/components/container/ScrollableContainer';
import ChannelInput from '@/components/channel/body/ChannelInput';
import {toast} from '@/components/shadcn/ui/use-toast';

export default function ChannelPage() {
  const [currentChannel, setCurChannel] = useState('');
  const [nowChannelId, setNowChannelId] = useState('');
  const [role, setRole] = useState('');
  const [messages, setMessages] = useState([] as ChannelHistoryType[]);
  const [socket] = useChatSocket('channel');

  const myRoleHandler = useCallback(({role}: any) => {
    console.log('myRole', role);
    setRole(role);
  }, []);

  const errorHandler = useCallback(({error}: any) => {
    console.log('error', error);
    toast(error);
  }, []);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('---------connected----------');
      socket.on('myRole', myRoleHandler);
      socket.on('error_exist', errorHandler);
    });
    socket.on('disconnect', () => {
      console.log('---------disconnected----------');
    });
    return () => {
      console.log('---------off----------');
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
          <ChannelInput channelId={nowChannelId} />
        </div>
      )}
    </div>
  );
}
