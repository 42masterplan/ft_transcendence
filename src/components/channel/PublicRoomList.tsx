import {LuGlobe2} from 'react-icons/lu';
import {Button} from '@/components/shadcn/button';
import PublicRoomCard from './PublicRoomCard';
import {Dialog, DialogContent, DialogTrigger} from '@/components/shadcn/dialog';
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
      <DialogContent className='sm:max-w-[700px] h-5/6 bg-color_3 flex flex-col'>
        <div className='text-center text-xl font-semibold'>
          Public Room List
        </div>
        <div>
          <Label htmlFor='search bar' className='text-right'>
            search
          </Label>
          <Input
            id='name'
            placeholder='공개 방을 검색하세요.'
            className='col-span-3'
          />
        </div>
        <div className='grid grid-col-4 items-center gap-4'>
          <PublicRoomCard
            channelName='개굴개굴 개구리'
            userCount={100}
            isLocked={false}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
