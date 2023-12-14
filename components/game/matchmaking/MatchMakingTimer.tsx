import {useEffect, useState} from 'react';

export default function MatchMakingTimer() {
  const [TimeNum, setTimeNum] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTimeNum((c) => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className='w-[480px] text-center text-[40px] font-bold font-[Roboto Mono]'>
      {TimeNum >= 60
        ? Math.floor(TimeNum / 60) + ':' + (TimeNum % 60)
        : '0:' + TimeNum}
    </span>
  );
}
