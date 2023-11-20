/**
 * how to use
 * params:
 * const [msg, setMsg] = useState('');
 * const [isSending, setIsSending] = useState(false);
 * const handleSendMsg = async () => {...}
 *
 * feature
 * - send message when user press enter
 * - send message when user click the send button
 * - clear input when message is sent
 * - show loading icon when sending message
 */

import {Button} from '@/components/shadcn/ui/button';
import {Input} from '@/components/shadcn/ui/input';
import {ArrowUp, Loader} from 'lucide-react';

interface MessageInputBarProps {
  className?: string;
  isSending: boolean;
  setIsSending: (isSending: boolean) => void;
  msg: string;
  setMsg: (msg: string) => void;
  handleSendMsg: () => Promise<void>;
}

export default function MessageInputBar({
  className = '',
  isSending,
  setIsSending,
  msg,
  setMsg,
  handleSendMsg
}: MessageInputBarProps) {
  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && msg.trim().length > 0) {
      e.preventDefault(); // Prevents the default action of the enter key
      setIsSending(true);
      await handleSendMsg().then(() => {
        setIsSending(false);
        setMsg('');
      });
    }
  };

  return (
    <div className={`w-full p-3 ${className}`}>
      <div className='flex flex-row gap-3 justify-between items-center w-full h-20 p-2 sm:h-24 bg-custom2 overflow-hidden rounded-3xl'>
        <Input
          id='DMMessage'
          type='text'
          value={msg}
          placeholder='Type a message...'
          className='w-full h-full text-2xl bg-transparent border-none rounded-3xl'
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        {msg.length > 0 ? (
          <div className='flex fle-row justify-center items-center w-16 h-full'>
            <Button
              variant='default'
              className='w-14 h-14 rounded-full'
              onClick={async () => {
                setIsSending(true);
                await handleSendMsg().then(() => {
                  setIsSending(false);
                  setMsg('');
                });
              }}
            >
              {isSending ? <Loader /> : <ArrowUp />}
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}