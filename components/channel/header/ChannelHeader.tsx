import CreateChannel from './createChannel/CreateChannel';
import ManageChannel from './ManageChannel';
import PublicRoomList from './publicRoom/PublicRoomList';
import {CiLogout} from 'react-icons/ci';
import {Button} from '@/components/shadcn/ui/button';
import {channelStateType} from '@/types/channel';
export default function ChannelHeader({
  channelInfoState
}: {
  channelInfoState: channelStateType;
}) {
  console.log('channelState.channelName', channelInfoState.channelName);
  return (
    <div className='bg-custom2 w-full'>
      <div className='bg-custom2 w-full flex justify-between font-bold text-3xl'>
        <PublicRoomList />
        {channelInfoState.channelName === '' ? '채널에 참여해주세요' : '채널명'}
        <CreateChannel />
      </div>
      {channelInfoState.channelName === '' ? (
        ''
      ) : (
        <div className='flex justify-between  py-1 font-bold text-2xl'>
          <Button variant='iconBtn' className='bg-custom4'>
            <CiLogout className='h-6 w-6' />
            채널 나가기
          </Button>
          {channelInfoState.channelName}
          {channelInfoState.role === 'owner' ? (
            <ManageChannel channel_name={channelInfoState.channelID} />
          ) : (
            channelInfoState.role
          )}
        </div>
      )}
    </div>
  );
}
