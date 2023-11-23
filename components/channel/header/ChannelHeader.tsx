import CreateChannel from './createChannel/CreateChannel';
import ManageChannel from './ManageChannel';
import PublicRoomList from './publicRoom/PublicRoomList';

export default function ChannelHeader({
  channel_name,
  channelId,
  role
}: {
  channel_name: string;
  channelId: string;
  role: string;
}) {
  return (
    <div className='bg-custom2 w-full'>
      <div className='bg-custom2 w-full flex justify-between font-bold text-3xl'>
        <PublicRoomList />
        {channel_name}
        <CreateChannel />
      </div>
      <div className='flex justify-end py-1'>
        {role === 'owner' ? <ManageChannel channel_name={channelId} /> : role}
      </div>
    </div>
  );
}
