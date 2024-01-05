import {Input} from '@/components/shadcn/ui/input';
import {Button} from '@/components/shadcn/ui/button';
import {Send} from 'lucide-react';
import {useState} from 'react';
import {useToast} from '@/components/shadcn/ui/use-toast';
import useSocket from '@/hooks/useSocket';
const ChannelInput = ({
  channelId,
  historyLoading
}: {
  channelId: string;
  historyLoading: boolean;
}) => {
  const [socket] = useSocket('channel');
  const [content, setContent] = useState('');
  const inputLength = content.trim().length;
  const {toast} = useToast();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (inputLength === 0) return;
        socket.emit('newMessage', {content, channelId}, (msg: string) => {
          if (msg !== 'success') {
            toast({
              title: '채팅을 보내는데 실패했습니다.',
              description: msg
            });
          }
          setContent('');
        });
      }}
      className='flex w-full items-center space-x-2'
    >
      <Input
        id='message'
        placeholder='Type your message...'
        className='flex-1'
        autoComplete='off'
        value={content}
        onChange={(event) => {
          if (historyLoading || content.length > 500) return;
          setContent(event.target.value);
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
