import {Player} from '@/types/game';
import AvatarWithStatus from '../card/userInfoCard/AvatarWithStatus';

export default function PlayerPortrait(Player: Player) {
  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <AvatarWithStatus
        image={Player.profileImage}
        showStatus={false}
        size='md'
      />
      <h3 className='text-zinc-300 text-[22.06px] font-bold font-roboto-mono text-stroke'>
        {Player.name}
      </h3>
      <style jsx>{`
        .text-stroke {
          text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
            1px 1px 0 #000; /* 검정색 테두리를 위한 그림자 설정 */
        }
      `}</style>
    </div>
  );
}
