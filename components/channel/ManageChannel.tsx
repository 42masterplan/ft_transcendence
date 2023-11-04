import {RiChatSettingsLine} from 'react-icons/ri';
import {Button} from '@/components/shadcn/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from '@/components/shadcn/ui/dialog';

import {Input} from '@/components/shadcn/ui/input';
import {Label} from '@/components/shadcn/ui/label';

export default function ManageChannel({channel_name}: {channel_name: string}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='ml-auto rounded-full h-12 w-36'>
          <RiChatSettingsLine className='h-6 w-6' />
          <p className='text-6'>채널 관리</p>
          <span className='sr-only'>Public Room List</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] bg-color_3'>
        <DialogHeader>
          <DialogTitle>방장 전용 페이지</DialogTitle>
          <DialogDescription>
            이곳에서 채널을 관리할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              채널명 변경
            </Label>
            <Input
              id='name'
              defaultValue={channel_name}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='channel_password' className='text-right'>
              비밀번호
            </Label>
            <Input
              id='channel_password'
              defaultValue={channel_name}
              className='col-span-3'
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
