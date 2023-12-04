import CreateChannel from './createChannel/CreateChannel';
import ManageChannel from './ManageChannel';
import PublicRoomList from './publicRoom/PublicRoomList';
import {CiLogout} from 'react-icons/ci';
import {Button} from '@/components/shadcn/ui/button';
import {channelStateType} from '@/types/channel';
import useChatSocket from '@/hooks/useChatSocket';
export default function ChannelHeader({
  channelInfoState,
  infoDispatch
}: {
  channelInfoState: channelStateType;
  infoDispatch: any;
}) {
  console.log('channelState.channelName', channelInfoState.channelName);
  const [socket] = useChatSocket('channel');
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
          <Button
            variant='iconBtn'
            className='bg-custom4'
            onClick={() => {
              console.log(
                '채널 나가기 버튼 클릭 채널명:',
                channelInfoState.channelName,
                channelInfoState.channelID
              );
              socket.emit(
                'leaveChannel',
                {
                  channelID: channelInfoState.channelID
                },
                (res: string) => {
                  if (res === 'leave Success!') {
                    infoDispatch({
                      type: 'CHANNEL_LEAVE'
                    });
                  }
                }
              );
            }}
          >
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
