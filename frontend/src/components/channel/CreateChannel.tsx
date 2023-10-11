import {RiChatNewLine} from 'react-icons/ri';
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

export default function CreateChannel() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='rounded-full h-12 w-36'>
          <RiChatNewLine className='h-6 w-6' />
          <p className='text-6'> 채널 생성</p>
          <span className='sr-only'>Public Room List</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] bg-color_4'>
        <DialogHeader>
          <DialogTitle>채널 생성</DialogTitle>
          <DialogDescription>
            채널을 원하는대로 초대할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              채널 명
            </Label>
            <Input
              id='name'
              defaultValue='원하는 이름으로 입력해주세요'
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='passward' className='text-right'>
              passward
            </Label>
            <Input id='passward' defaultValue='' className='col-span-3' />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
