import CreateChannel from './createChannel/CreateChannel';
import ManageChannel from './ManageChannel';
import PublicRoomList from './publicRoom/PublicRoomList';

export default function ChannelHeader({
  channelInfoState
}: {
  channelInfoState: any;
}) {
  console.log('channelState.channelName', channelInfoState.channelName);
  return (
    <div className='bg-custom2 w-full'>
      <div className='bg-custom2 w-full flex justify-between font-bold text-3xl'>
        <PublicRoomList />
        {channelInfoState.channelName}
        <CreateChannel />
      </div>
      <div className='flex justify-end py-1'>
        {channelInfoState.role === 'owner' ? (
          <ManageChannel channel_name={channelInfoState.channelID} />
        ) : (
          channelInfoState.role
        )}
      </div>
    </div>
  );
}
