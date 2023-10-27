import CreateChannel from './CreateChannel';
import ManageChannel from './ManageChannel';
import PublicRoomList from './PublicRoomList';

export default function ChannelHeader({channel_name}: {channel_name: string}) {
  return (
    <div className='flex h-[70px] bg-white items-baseline space-y-2 space-x-4 pl-6 z-10'>
      <PublicRoomList />
      <CreateChannel />
      <ManageChannel channel_name={channel_name} />
    </div>
  );
}
