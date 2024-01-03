import {Input} from '@/components/shadcn/ui/input';
import {Button} from '@/components/shadcn/ui/button';
import {Router, Send} from 'lucide-react';
import {useState} from 'react';
import useSocket from '@/hooks/useSocket';
import {useToast} from '@/components/shadcn/ui/use-toast';
import {dmInfoType, dmMessageType} from '@/types/dm';
import {useRouter} from 'next/router';
const DMInput = ({setDMData, dmInfo}: {setDMData: any; dmInfo: dmInfoType}) => {
  const [content, setContent] = useState('');
  const inputLength = content.trim().length;
  const [socket] = useSocket('alarm');
  const {toast} = useToast();
  const router = useRouter();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (content === '') return;
        socket.emit(
          'DmNewMessage',
          {
            dmId: dmInfo.dmId,
            participantId: dmInfo.myId,
            content: content
          },
          (ret: any) => {
            if (ret === 'DmNewMessage Success!') {
              setDMData((prev: dmMessageType[]) => {
                return [
                  ...prev,
                  {
                    _id: prev.length,
                    _content: content,
                    _name: dmInfo.myName,
                    _participantId: dmInfo.myId
                  }
                ];
              });
              setContent('');
            } else if (ret === 'Not Friend!') {
              toast({
                title: 'DM 전송 실패!',
                variant: 'destructive',
                description: '친구가 아닙니다'
              });
              router.push('/social');
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
