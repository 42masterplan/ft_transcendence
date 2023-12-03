import {RiChatSettingsLine} from 'react-icons/ri';
import {Button} from '@/components/shadcn/ui/button';
import {Input} from '@/components/shadcn/ui/input';
import {Label} from '@/components/shadcn/ui/label';
import FriendListSelector from '@/components/channel/FriendListSelector';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from '@/components/shadcn/ui/dialog';

export default function ManageChannel({channel_name}: {channel_name: string}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-custom4 justify-self-end'>
          <RiChatSettingsLine className='h-6 w-6' />
          <p className='text-6'>채널 관리</p>
        </Button>
      </DialogTrigger>
      <DialogContent className=' bg-custom1'>
        <DialogHeader>
          <DialogTitle className='text-center'>방장 전용 페이지</DialogTitle>
          <DialogDescription className='text-center'>
            이곳에서 채널을 관리할 수 있습니다.
            <br />
            오직 방장만이 이 버튼을 누를 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-6 py-6 '>
          <div className='grid grid-cols-4 items-center gap-6'>
            <Label htmlFor='description' className='text-right'>
              BAN 유저 목록
            </Label>
            <FriendListSelector>밴(금지)유저 목록</FriendListSelector>
            <Label htmlFor='description' className='text-right'>
              관리자 수정
            </Label>
            <FriendListSelector>현재 채널 유저 목록</FriendListSelector>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='channel_password' className='text-right'>
              비밀번호 변경
            </Label>
            <Input
              id='channel_password'
              defaultValue={channel_name}
              className='col-span-3'
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit' className='w-full'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
