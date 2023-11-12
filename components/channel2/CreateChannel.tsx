import {MessageSquarePlus} from 'lucide-react';

import {Button} from '@/components/shadcn/ui/button';
import FriendListSelector from '@/components/channel2/FriendListSelector';

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
import {useState} from 'react';
import {Input} from '@/components/shadcn/ui/input';
import {Label} from '@/components/shadcn/ui/label';

export default function CreateChannel() {
  const [channelName, setChannelName] = useState('');
  const [channelType, setChannelType] = useState('');
  const [password, setPassword] = useState('');
  const [inviteFriendList, setInviteFriendList] = useState([]);

  const DialogBtn = () => {
    return (
      <DialogTrigger asChild>
        <Button className='rounded-full bg-custom1 text-custom4'>
          <MessageSquarePlus className='h-6 w-6' />
          <p className='text-6'> 채널 생성</p>
          <span className='sr-only'>Public Room List</span>
        </Button>
      </DialogTrigger>
    );
  };
  const ChannelTypeSelector = () => {
    return (
      <div className='grid grid-cols-4 items-center gap-6'>
        <Label htmlFor='channel_type' className='text-right'>
          채널 유형
        </Label>
        <Select>
          <SelectTrigger className=' bg-custom2 w-[342px]'>
            <SelectValue placeholder='채널 유형 선택' id='channel_type' />
          </SelectTrigger>
          <SelectContent
          // onChange={() => {
          //   setChannelName(value);
          //   console.log(value);
          // }}
          >
            <SelectGroup>
              <SelectLabel>채널 유형 선택</SelectLabel>
              <SelectItem value='Public'>Public</SelectItem>
              <SelectItem value='Private'>Private</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  };
  return (
    <Dialog>
      <DialogBtn />
      <DialogContent className='bg-custom1'>
        <DialogHeader>
          <DialogTitle className='text-center'>채널 생성</DialogTitle>
          <DialogDescription className='text-center'>
            채널을 원하는대로 만들 수 있습니다.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-6 py-4'>
          <ChannelTypeSelector />
          <div className='grid grid-cols-4 items-center gap-6'>
            <Label htmlFor='name' className='text-right'>
              채널 명
            </Label>
            <Input id='name' className='col-span-3' />
          </div>
          <div className='grid grid-cols-4 items-center gap-6'>
            <Label htmlFor='description' className='text-right'>
              친구 초대
            </Label>
            <FriendListSelector>친구 초대</FriendListSelector>
          </div>
          <div className='grid grid-cols-4 items-center gap-6'>
            <Label htmlFor='password' className='text-right'>
              password
            </Label>
            <Input id='password' defaultValue='' className='col-span-3' />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit' className='w-full'>
            채널 생성하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
