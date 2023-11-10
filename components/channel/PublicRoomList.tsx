import {LuGlobe2} from 'react-icons/lu';
import {Button} from '@/components/shadcn/ui/button';
import PublicRoomCard from './PublicRoomCard';
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from '@/components/shadcn/ui/dialog';
import {Input} from '@/components/shadcn/ui/input';
import {Label} from '@/components/shadcn/ui/label';
import {useContext, useState} from 'react';
import {APIContext} from '@/DummyBackend/APIData';
export default function PublicRoomList() {
  const {PublicRoomList} = useContext(APIContext);
  const [search, setSearch] = useState('');
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='rounded-full bg-custom1 text-custom4'>
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className='grid grid-col-4 items-center gap-4'>
          {PublicRoomList.map((public_room) => {
            return public_room.channelName.includes(search) ? (
              <PublicRoomCard
                channelName={public_room.channelName}
                userCount={public_room.userCount}
                isLocked={public_room.isLocked}
                key={public_room.channelName}
              />
            ) : (
              ''
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
