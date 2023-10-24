import PlayerPortrait from '../../../components/game/PlayerPortrait';
import Divider from '../../../components/game/Divider';
import {Player} from '@/components/APIData';
import {Player_1} from '@/components/APIData';
import {Player_2} from '@/components/APIData';

interface GameInfo {
  map: string;
  player_1: Player;
  player_2: Player;
}

export default function Preinfo() {
  /* 프롭스로 Game Info가 들어가야 합니다 */
  return (
    <div className='py-14 flex items-center justify-center h-screen relative'>
      <div
        className='absolute left-1/2 top-1/2 transform translate-x-[-50%] translate-y-[-50%] w-[370px] h-[620px] py-[50px] bg-slate-800 rounded-[10px]
      shadow border border-black flex flex-col justify-between items-center'
      >
        <PlayerPortrait {...Player_1} />
        <Divider />
        <PlayerPortrait {...Player_2} />
      </div>
      <div
        className='absolute left-[calc(50%+185px)] top-1/2 transform translate-y-[-50%] w-[245px] h-[400px] bg-slate-300 rounded-tr-[10px] rounded-br-[10px]
        shadow border border-black flex justify-center items-center text-neutral-500
      text-[22px] font-bold font-roboto-mono'
      >
        맵정보
      </div>
    </div>
  );
}
