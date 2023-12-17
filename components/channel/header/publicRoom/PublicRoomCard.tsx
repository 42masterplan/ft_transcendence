import {Input} from '@/components/shadcn/ui/input';
import {Button} from '@/components/shadcn/ui/button';
import {useState} from 'react';
import useSocket from '@/hooks/useSocket';
import {useToast} from '@/components/shadcn/ui/use-toast';
export default function PublicRoomCard({
  name,
  id,
  userCount,
  isLocked,
  setOpen
}: {
  name: string;
  id: string;
  userCount: number;
  isLocked: boolean;
  setOpen: any;
}) {
  const [socket] = useSocket('channel');
  const [password, SetPassword] = useState('');
  const {toast} = useToast();
  function handleSubmit(id: string, password: string) {
    password = password.replace(/\s/g, '');
    socket.emit('joinChannel', {id, password}, (ret: string) => {
      if (ret === 'joinChannel Success!') {
        toast({
          title: '채널 참가',
          description: ret
        });
        setOpen(false);
      } else {
        toast({
          title: '채널 참가 실패',
          description: ret,
          variant: 'destructive'
        });
      }
    });
  }
  return (
    <div className='flex justify-around bg-custom2 rounded-full items-center h-12'>
      <span className='w-[200px]'>{name}</span>
      <span className='w-10'>({userCount})</span>
      <Input
        className='w-[200px]'
        placeholder='비밀번호'
        disabled={!isLocked}
        value={password}
        onChange={(e) => SetPassword(e.target.value)}
      />
      <Button
        onClick={() => {
          handleSubmit(id, password);
          SetPassword('');
        }}
      >
        참가하기
      </Button>
    </div>
  );
}
