import {Input} from '@/components/shadcn/ui/input';
import {Button} from '@/components/shadcn/ui/button';
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
    <div className='flex justify-around bg-custom2 rounded-full items-center h-12'>
      <span className='w-[200px]'>{channelName}</span>
      <span className='w-10'>({userCount})</span>
      <Input
        className='w-[200px]'
        placeholder='비밀번호'
        disabled={!isLocked}
      />
      <Button>참가하기</Button>
    </div>
  );
}
