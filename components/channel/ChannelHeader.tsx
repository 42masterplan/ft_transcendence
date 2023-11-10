import CreateChannel from './CreateChannel';
import ManageChannel from './ManageChannel';
import PublicRoomList from './PublicRoomList';

export default function ChannelHeader({channel_name}: {channel_name: string}) {
  return (
    <div className='flex bg-custom2 items-baseline justify-between'>
      <div>
        <PublicRoomList />
      </div>
      <div>
        <CreateChannel />
      </div>
      <div>
        <ManageChannel channel_name={channel_name} />
      </div>
    </div>
  );
}
