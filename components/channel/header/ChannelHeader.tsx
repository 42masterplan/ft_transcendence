import CreateChannel from './createChannel/CreateChannel';
import ManageChannel from './ManageChannel';
import PublicRoomList from './publicRoom/PublicRoomList';
import {CiLogout} from 'react-icons/ci';
import {Button} from '@/components/shadcn/ui/button';
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
      <div className='flex justify-between  py-1'>
        <ManageChannel channel_name={channelInfoState.channelID} />
        {channelInfoState.role === 'owner' ? (
          <>
            <Button variant='iconBtn' className='bg-custom4'>
              <CiLogout className='h-6 w-6' />
              채널 나가기
            </Button>
          </>
        ) : (
          channelInfoState.role
        )}
      </div>
    </div>
  );
}
