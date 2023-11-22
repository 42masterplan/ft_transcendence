import {LuGlobe2} from 'react-icons/lu';
import {Button} from '@/components/shadcn/ui/button';
import PublicRoomCard from './PublicRoomCard';
import useChatSocket from '@/hooks/useChatSocket';
// import io from 'socket.io-client';
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from '@/components/shadcn/ui/dialog';
import {Input} from '@/components/shadcn/ui/input';
import {Label} from '@/components/shadcn/ui/label';
import {useState} from 'react';
import {PublicRoomType} from '@/types/channel';

const DialogBtn = ({socket}: any) => {
  return (
    <DialogTrigger asChild>
      <Button
        className='rounded-full bg-custom4'
        onClick={() => socket.emit('getPublicChannels')}
      >
        <LuGlobe2 className='h-6 w-6' />
        <p className='text-6'>공개 채널</p>
        <span className='sr-only'>Public Room List</span>
      </Button>
    </DialogTrigger>
  );
};

export default function PublicRoomList() {
  const [socket] = useChatSocket('channel');
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [publicRooms, setPublicRooms] = useState([] as PublicRoomType[]);
  socket.on('getPublicChannels', (rooms) => {
    if (typeof rooms === 'undefined') rooms = [];
    console.log(rooms);
    setPublicRooms(rooms);
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogBtn socket={socket} />
      <DialogContent className='sm:max-w-[700px] h-5/6 bg-custom1 flex flex-col overflow-y-scroll'>
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
          {publicRooms.map((public_room) => {
            return public_room.name.includes(search) ? (
              <PublicRoomCard
                id={public_room.id}
                name={public_room.name}
                userCount={public_room.userCount}
                isLocked={public_room.isPassword}
                key={public_room.id}
                setOpen={setOpen}
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
