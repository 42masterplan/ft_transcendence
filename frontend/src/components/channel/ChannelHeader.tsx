import CreateChannel from './CreateChannel';
import ManageChannel from './ManageChannel';
import PublicRoomList from './PublicRoomList';

export default function ChannelHeader() {
  return (
    <div className='flex h-[100px] bg-white items-baseline space-y-5 space-x-12 pl-6 z-10'>
      <PublicRoomList />
      <CreateChannel />
      <ManageChannel />
    </div>
  );
}
