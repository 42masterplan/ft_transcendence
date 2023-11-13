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

export function ChannelBody({
  currentChannel,
  messages,
  setMessages
}: {
  currentChannel: string;
  messages: ChannelHistoryType[];
  setMessages: Dispatch<SetStateAction<ChannelHistoryType[]>>;
}) {
  const [input, setInput] = useState('');
  const inputLength = input.trim().length;
  const messageEndRef = useRef<HTMLDivElement>();

  const ShowHistory = () => {
    return (
      <div className='flex flex-col overflow-y-auto  bg-custom3'>
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={cn(
              'flex w-max max-w-[90%] rounded-lg px-3  text-sm ',
              'p-2 border-cyan-300 border-2 '
            )}
          >
            {/* className={cn(
              'flex w-max max-w-[90%] rounded-lg px-3  text-sm ',
              message.id === myInfo.id
                ? 'ml-auto bg-primary text-primary-foreground p-2'
                : 'p-2 border-cyan-300 border-2 '
            )} */}
            <div className='flex flex-col text-center h-min-[500px]'>
              <DropDownAvatarBtn
                profile_image={message.profileImage}
                user_name={message.name}
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
          setMessages([
            ...messages,
            {
              ...myInfo,
              contents: input
            }
          ]);
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
          onChange={(event) => setInput(event.target.value)}
        />
        <Button type='submit' size='icon' disabled={inputLength === 0}>
          <Send className='h-4 w-4' />
          <span className='sr-only'>Send</span>
        </Button>
      </form>
    );
  };

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
        {/* <CardFooter>{ChannelInput()}</CardFooter> */}
      </Card>
    </div>
  );
}
