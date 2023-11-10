import {MessageSquarePlus} from 'lucide-react';

import {Button} from '@/components/shadcn/ui/button';
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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/shadcn/ui/select';

import {Input} from '@/components/shadcn/ui/input';
import {Label} from '@/components/shadcn/ui/label';

function SelectRoom({id}: {id: string}) {
  return (
    <Select>
      <SelectTrigger className=' bg-custom2'>
        <SelectValue placeholder='채널 유형 선택' id={id} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>채널 유형 선택</SelectLabel>
          <SelectItem value='Public'>Public</SelectItem>
          <SelectItem value='Private'>Private</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default function CreateChannel() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='rounded-full bg-custom1 text-custom4'>
          <MessageSquarePlus className='h-6 w-6' />
          <p className='text-6'> 채널 생성</p>
          <span className='sr-only'>Public Room List</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[700px] h-5/6 bg-custom1'>
        <DialogHeader>
          <DialogTitle>채널 생성</DialogTitle>
          <DialogDescription>
            채널을 원하는대로 초대할 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='channel_type' className='text-right'>
              채널 유형
            </Label>
            <SelectRoom id='channel_type' />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              채널 명
            </Label>
            <Input id='name' className='col-span-3' />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='description' className='text-right'>
              친구 초대
            </Label>
            <FriendListSelector>
							친구 초대
						</FriendListSelector>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='password' className='text-right'>
              password
            </Label>
            <Input id='password' defaultValue='' className='col-span-3' />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'>채널 생성하기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
