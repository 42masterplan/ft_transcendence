import PlayerPortrait from '../../../components/game/PlayerPortrait';
import Divider from '../../../components/game/ingame/Divider';
import {Player} from '@/DummyBackend/APIData';
import {PLAYER_DUMMY_1} from '@/DummyBackend/APIData';
import {PLAYER_DUMMY_2} from '@/DummyBackend/APIData';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {PRE_GAME_TIME} from '@/lib/game/macros';
import useAxios from '@/hooks/useAxios';

interface GameInfo {
  map: string;
  player_1: Player;
  player_2: Player;
}

export default function PreGame() {
  const router = useRouter();
  const {id, theme, gameMode} = router.query;
  const [backgroundImage, setBackgroundImage] = useState(''); // 상태로 배경 이미지 URL을 관리
  const [time, setTime] = useState(PRE_GAME_TIME);
  const {fetchData, response, isSuccess} = useAxios(); // TODO: 게임 플레이어 2명의 정보를 위한 axios

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timer); // 타이머를 여기서 정지
          router.replace({
            pathname: '/game/in-game',
            query: {id, theme, gameMode}
          });
          return 0; // 시간이 0이 되었으므로 0을 반환
        }
        return prevTime - 1; // 시간을 감소시킴
      });
    }, 1000);
    if (theme && theme !== 'Default') {
      const imageSrc = `/gameThemes/${theme}.png`;
      const img = new Image();
      img.onload = () => {
        setBackgroundImage(imageSrc);
      };
      img.src = imageSrc;
    }
    return () => clearInterval(timer);
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
    <div className='flex flex-col items-center justify-center pt-8 gap-10 h-full'>
      <h1 className='text-4xl text-white font-bold'>게임 시작까지: {time}</h1>
      <div
        className='w-[400px] h-[600px] py-[50px] bg-slate-800 rounded-[10px] shadow border border-black flex flex-col justify-between items-center'
        style={style}
      >
        <PlayerPortrait {...PLAYER_DUMMY_1} />
        <Divider />
        <PlayerPortrait {...PLAYER_DUMMY_2} />
      </div>
    </div>
  );
}
