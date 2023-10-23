import AvatarIcon from '@/components/avatar/AvatarIcon';
import {Player} from '@/components/APIData';

export default function PlayerPortrait(Player: Player) {
  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <AvatarIcon avatarName={Player.profile_image} size='w-20 h-20' />
      <h3 className='text-zinc-300 text-[22.06px] font-bold font-roboto-mono'>
        {Player.name}
      </h3>
    </div>
  );
}
