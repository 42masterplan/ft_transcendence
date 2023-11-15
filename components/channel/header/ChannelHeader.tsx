import CreateChannel from '../CreateChannel';
import ManageChannel from '../ManageChannel';
import PublicRoomList from './publicRoom/PublicRoomList';

export default function ChannelHeader({channel_name}: {channel_name: string}) {
  return (
    <div bg-custom2 className='bg-custom2 '>
      <div className='flex items-baseline justify-between w-full'>
        <div>
          <PublicRoomList />
        </div>

        <div>
          <CreateChannel />
        </div>

        {/* <div>
        <ManageChannel channel_name={channel_name} />
      </div> */}
      </div>
      <div className='font-bold text-3xl text-center'>{channel_name}</div>
    </div>
  );
}
