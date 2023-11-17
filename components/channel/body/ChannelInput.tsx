import {Input} from '@/components/shadcn/ui/input';
import {Button} from '@/components/shadcn/ui/button';
import {Send} from 'lucide-react';
import {Dispatch, SetStateAction, useState} from 'react';
import {ChannelHistoryType} from '@/types/channel';
import useChatSocket from '@/hooks/useChatSocket';
const ChannelInput = ({
  messages,
  setMessages,
  channelId
}: {
  messages: ChannelHistoryType[];
  setMessages: Dispatch<SetStateAction<ChannelHistoryType[]>>;
  channelId: string;
}) => {
  const [socket] = useChatSocket('channel');
  const [input, setInput] = useState('');
  const inputLength = input.trim().length;
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
              profileImage:
                process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI4 || '',
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
export default ChannelInput;
