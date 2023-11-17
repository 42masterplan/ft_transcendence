import {Input} from '@/components/shadcn/ui/input';
import {Button} from '@/components/shadcn/ui/button';
import {useState} from 'react';
import useChatSocket from '@/hooks/useChatSocket';

export default function PublicRoomCard({
  channelName,
  userCount,
  isLocked
}: {
  channelName: string;
  userCount: number;
  isLocked: boolean;
}) {
  const [socket] = useChatSocket('channel');
  const [password, SetPassword] = useState('');
  function handleSubmit(channelName: string, password: string) {
    socket.emit('joinChannel', channelName, password, () => {
      alert('channel join success');
    });
    // 비밀번호가 맞는지 확인
    // 맞으면 참가
    // 아니면 알림
  }
  return (
    <div className='flex justify-around bg-custom2 rounded-full items-center h-12'>
      <span className='w-[200px]'>{channelName}</span>
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
          handleSubmit(channelName, password);
          SetPassword('');
        }}
      >
        참가하기
      </Button>
    </div>
  );
}