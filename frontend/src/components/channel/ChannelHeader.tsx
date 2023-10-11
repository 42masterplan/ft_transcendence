import CreateChannel from './CreateChannel';
import ManageChannel from './ManageChannel';
import PublicRoomList from './PublicRoomList';

export default function ChannelHeader() {
  return (
    <div className='flex h-[100px] bg-white items-baseline justify-between space-y-5 '>
      <PublicRoomList />
      <CreateChannel />
      <ManageChannel />
    </div>
  );
}
