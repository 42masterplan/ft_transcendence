import PlayerPortrait from '../../../components/game/PlayerPortrait';
import Divider from '../../../components/game/ingame/Divider';
import {Player} from '@/DummyBackend/APIData';
import {PLAYER_DUMMY_1} from '@/DummyBackend/APIData';
import {PLAYER_DUMMY_2} from '@/DummyBackend/APIData';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {PRE_GAME_TIME} from '@/lib/game/macros';

interface GameInfo {
  map: string;
  player_1: Player;
  player_2: Player;
}

export default function PreGame() {
  const router = useRouter();
  const {id, theme} = router.query;
  const [backgroundImage, setBackgroundImage] = useState(''); // 상태로 배경 이미지 URL을 관리

  useEffect(() => {
    setTimeout(() => {
      router.push({
        pathname: '/game/in-game',
        query: {id, theme}
      });
    }, PRE_GAME_TIME * 1000);
    if (theme && theme !== 'Default') {
      const imageSrc = `/gameThemes/${theme}.png`;
      const img = new Image();
      img.onload = () => {
        setBackgroundImage(imageSrc); // 이미지가 로드되면 상태를 업데이트
      };
      img.src = imageSrc;
    }
  }, []);
  const style =
    backgroundImage != ''
      ? {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover', // 배경 이미지가 컨테이너를 꽉 채우도록 설정
          backgroundPosition: 'center center' // 이미지를 중앙에 위치시킴
        }
      : {};
  return (
    <div
      className='absolute left-1/2 top-1/2 transform translate-x-[-50%] translate-y-[-50%] w-[400px] h-[800px] py-[50px] bg-slate-800 rounded-[10px]
      shadow border border-black flex flex-col justify-between items-center'
      style={style}
    >
      <PlayerPortrait {...PLAYER_DUMMY_1} />
      <Divider />
      <PlayerPortrait {...PLAYER_DUMMY_2} />
    </div>
  );
}
