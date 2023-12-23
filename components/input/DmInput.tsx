import {Input} from '@/components/shadcn/ui/input';
import {Button} from '@/components/shadcn/ui/button';
import {Send} from 'lucide-react';
import {useState} from 'react';
import useSocket from '@/hooks/useSocket';
const DMInput = ({
  msg,
  chatUser,
  setMsg,
  setDMData
}: {
  msg: string;
  chatUser: any;
  setMsg: any;
  setDMData: any;
}) => {
  const [content, setContent] = useState('');
  const inputLength = content.trim().length;
  const [socket] = useSocket('alarm');
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (msg === '') return;
        socket.emit(
          'sendDm',
          {
            sendTo: chatUser,
            content: msg
          },
          ({msg}: {msg: string}) => {
            if (msg === 'sendDm Success!') {
              setMsg('');
              setDMData((prev) => {
                if (prev === null) return null;
                return [
                  ...prev,
                  {
                    content: msg,
                    name: 'hkong',
                    id: '123',
                    profileImage:
                      'https://avatars.githubusercontent.com/u/76761029?v=4'
                  }
                ];
              });
            } else {
              toast({
                title: 'DM 전송 실패!',
                variant: 'destructive',
                description: 'DM 전송에 실패했습니다.'
              });
            }
          }
        );
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
          if (content.length > 500) return;
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
export default DMInput;
