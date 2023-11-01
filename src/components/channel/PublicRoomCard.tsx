import {Input} from '@/components/shadcn/input';
import {Button} from '@/components/shadcn/button';
export default function PublicRoomCard({
  channelName,
  userCount,
  isLocked
}: {
  channelName: string;
  userCount: number;
  isLocked: boolean;
}) {
  return (
    <div className='flex justify-around bg-cyan-100 rounded-full items-center h-12'>
      <span>{channelName}</span>
      <span>({userCount})</span>
      <Input className='w-[200px]' placeholder='비밀번호' disabled={isLocked} />
      <Button>참가하기</Button>
    </div>
  );
}
