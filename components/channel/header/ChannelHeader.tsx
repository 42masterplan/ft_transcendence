import CreateChannel from './createChannel/CreateChannel';
import ManageChannel from '@/components/channel/header/ManageChannel';
import PublicRoomList from './publicRoom/PublicRoomList';
import {CiLogout} from 'react-icons/ci';
import {Button} from '@/components/shadcn/ui/button';
import {channelStateType} from '@/types/channel';
import useSocket from '@/hooks/useSocket';
export default function ChannelHeader({
  channelInfoState,
  infoDispatch
}: {
  channelInfoState: channelStateType;
  infoDispatch: any;
}) {
  const [socket] = useSocket('channel');
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
              socket.emit(
                'leaveChannel',
                {
                  channelId: channelInfoState.channelId
                },
                (res: string) => {
                  if (res === 'leaveChannel Success!') {
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
          <span className='w-3/5 text-center'>
            {channelInfoState.channelName}
          </span>
          {channelInfoState.engagedChannels.find(
            (channel) => channel.id === channelInfoState.channelId
          )?.role === 'owner' ? (
            <ManageChannel
              channel_name={channelInfoState.channelName}
              channelId={channelInfoState.channelId}
            />
          ) : (
            'role : ' +
            channelInfoState.engagedChannels.find(
              (channel) => channel.id === channelInfoState.channelId
            )?.role
          )}
        </div>
      )}
    </div>
  );
}
