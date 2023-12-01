import CreateChannel from './createChannel/CreateChannel';
import ManageChannel from './ManageChannel';
import PublicRoomList from './publicRoom/PublicRoomList';

export default function ChannelHeader({channelState}: {channelState: any}) {
  console.log('channelState.channelName', channelState.channelName);
  return (
    <div className='bg-custom2 w-full'>
      <div className='bg-custom2 w-full flex justify-between font-bold text-3xl'>
        <PublicRoomList />
        {channelState.channelName}
        <CreateChannel />
      </div>
      <div className='flex justify-end py-1'>
        {channelState.role === 'owner' ? (
          <ManageChannel channel_name={channelState.channelID} />
        ) : (
          channelState.role
        )}
      </div>
    </div>
  );
}
