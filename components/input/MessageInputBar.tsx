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
import {ArrowUp} from 'lucide-react';
import SpinningLoader2 from '../loader/SpinningLoader2';

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
    if (e.key === 'Enter' && !e.shiftKey) {
      if (msg.trim().length > 0) {
        e.preventDefault(); // Prevent the default action of the enter key
        setIsSending(true);
        await handleSendMsg().then(() => {
          setIsSending(false);
          setMsg('');
        });
      }
    }
  };

  return (
    <div className={`w-full p-3 ${className}`}>
      <div className='flex flex-row gap-3 justify-between items-center w-full h-20 p-2 sm:h-24 bg-custom2 overflow-hidden rounded-3xl'>
        <textarea
          id='DMMessage'
          value={msg}
          placeholder='Type a message...'
          className='w-full h-full text-xl bg-transparent border-none rounded-3xl resize-none p-3' // resize-none to prevent resizing
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        {msg.length > 0 ? (
          <div className='flex flex-row justify-center items-center w-16 h-full'>
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
              {isSending ? <SpinningLoader2 /> : <ArrowUp />}
            </Button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
