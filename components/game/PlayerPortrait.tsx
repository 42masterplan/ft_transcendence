import {Player} from '@/DummyBackend/APIData';
import AvatarWithStatus from '../card/userInfoCard/AvatarWithStatus';

export default function PlayerPortrait(Player: Player) {
  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <AvatarWithStatus
        image={Player.profileImage}
        showStatus={false}
        size='md'
      />
      <h3 className='text-zinc-300 text-[22.06px] font-bold font-roboto-mono'>
        {Player.name}
      </h3>
    </div>
  );
}
