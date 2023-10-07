import {CardsChat} from '@/components/channel/ChatRoom';
import ChannelList from '@/components/channel/ChannelList';
export default function Channel() {
  return (
    <>
      <div className='bg-red-500 h-2'></div>

      <ChannelList />
      <CardsChat />
    </>
  );
}
