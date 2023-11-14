import {Send} from 'lucide-react';
import {cn} from '@/lib/utils';
import {Button} from '@/components/shadcn/ui/button';
import {useState, useRef, useEffect, Dispatch, SetStateAction} from 'react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/shadcn/ui/card';
import {Input} from '@/components/shadcn/ui/input';
import {ChannelHistoryType} from '@/types/channel';
import DropDownAvatarBtn from '../avatar/DropDownAvatarBtn';
import useChatSocket from '@/hooks/useChatSocket';
export function ChannelBody({
  currentChannel,
  messages,
  setMessages,
  channelId,
  role
}: {
  currentChannel: string;
  messages: ChannelHistoryType[];
  setMessages: Dispatch<SetStateAction<ChannelHistoryType[]>>;
  channelId: string;
  role: string;
}) {
  const [input, setInput] = useState('');
  const inputLength = input.trim().length;
  const messageEndRef = useRef<HTMLDivElement>();
  const [socket] = useChatSocket('channel');
  const ShowHistory = () => {
    return (
      <div className='flex flex-col overflow-y-auto  bg-custom3'>
        {messages.map((message, idx) => (
          <div
            key={idx}
            //이 부분도 추후 리코일로 관리 하는 유저 정보로 확인 예정
            className={cn(
              'flex w-max max-w-[90%] rounded-lg px-3  text-sm ',
              message.id === 'joushin'
                ? 'ml-auto bg-primary text-primary-foreground p-2'
                : 'p-2 border-cyan-300 border-2 '
            )}
          >
            <div className='flex flex-col text-center h-min-[500px]'>
              <DropDownAvatarBtn
                profileImage={message.profileImage}
                user_name={message.name}
                channel_id={channelId}
                role={role}
              />
              {message.name}
            </div>
            <div className='grid place-items-center' ref={messageEndRef as any}>
              {message.content}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const ChannelInput = () => {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (inputLength === 0) return;
          socket.emit('newMessage', input, channelId, () => {
            setMessages([
              ...messages,
              {
                id: 'joushin',
                name: 'joushin',
                profileImage: process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI4,
                content: input
              }
            ]);
          });

          setInput('');
        }}
        className='flex w-full items-center space-x-2'
      >
        <Input
          id='message'
          placeholder='Type your message...'
          className='flex-1'
          autoComplete='off'
          value={input}
          onChange={(event) => {
            if (input.length > 500) return;
            setInput(event.target.value);
          }}
        />
        <Button type='submit' size='icon' disabled={inputLength === 0}>
          <Send className='h-4 w-4' />
          <span className='sr-only'>Send</span>
        </Button>
      </form>
    );
  };
  socket.on('newMessage', (id, name, profileImage, content) => {
    console.log('새로운 메시지', id, name, profileImage, content);
  });
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);
  return (
    <div className=' w-[70vw] max-w-[600px] min-w-[230px]'>
      <Card className='rounded-none bg-custom2 h-[57vh] '>
        <CardHeader className='flex flex-row '>
          <div className='flex items-center space-x-4'>
            <div className='font-bold text-2xl'>{currentChannel}</div>
          </div>
        </CardHeader>
        <CardContent>{ShowHistory()}</CardContent>
        <CardFooter>{ChannelInput()}</CardFooter>
      </Card>
    </div>
  );
}
