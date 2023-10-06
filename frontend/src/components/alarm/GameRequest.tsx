import AvatarIcon from '../avatar/AvatarIcon';
import {Button} from '../shadcn/button';
interface GameInfoType {
  id: string;
  name: string;
  profile_image: string;
  current_status: string;
  game_mode: string;
}

export default function GameRequest({
  id,
  name,
  profile_image,
  current_status,
  game_mode
}: GameInfoType) {
  return (
    <div
      className='flex w-full h-24 items-center gap-2.5 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] px-2.5 py-0 rounded-[10px]
			bg-color_3'
    >
      <AvatarIcon avatarName={profile_image} />
      <div className='flex flex-col h-18	 items-center gap-1'>
        <h2>{name}님의 게임 요청</h2>
        <span className='text-xs'>게임 모드 : {game_mode}</span>
        <div className='flex gap-5 max-h-2'>
          <Button size='mini'>수락</Button>
          <Button size='mini'>거절 </Button>
        </div>
      </div>
    </div>
  );
}
