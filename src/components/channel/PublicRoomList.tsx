import {LuGlobe2} from 'react-icons/lu';
import {Button} from '@/components/shadcn/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from '@/components/shadcn/dialog';

import {Input} from '@/components/shadcn/input';
import {Label} from '@/components/shadcn/label';

export default function PublicRoomList() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='rounded-full h-12 w-36 '>
          <LuGlobe2 className='h-6 w-6' />
          <p className='text-6'>공개 채널</p>
          <span className='sr-only'>Public Room List</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] bg-color_3'>
        <DialogHeader>
          <DialogTitle>공개 채널 목록</DialogTitle>
          <DialogDescription>
            공개 된 채널들의 목록입니다.
            <br /> Private Room은 나오지 않습니다.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              WHat
            </Label>
            <Input
              id='name'
              defaultValue='Pedro Duarte'
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              Username
            </Label>
            <Input
              id='username'
              defaultValue='@peduarte'
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
