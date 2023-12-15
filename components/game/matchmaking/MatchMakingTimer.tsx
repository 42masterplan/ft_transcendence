import {clear} from 'console';
import {useEffect, useState} from 'react';

export default function MatchMakingTimer({
  isAscending
}: {
  isAscending: boolean;
}) {
  const [TimeNum, setTimeNum] = useState(10);
  useEffect(() => {
    setTimeNum(0);
    if (isAscending === true) {
      const id = setInterval(() => {
        setTimeNum((c) => c + 1);
      }, 1000);
      return () => clearInterval(id);
    } else {
      setTimeNum(10);
      const id = setInterval(() => {
        setTimeNum((c) => c - 1);
      }, 1000);
      return () => clearInterval(id);
    }
  }, []);
  useEffect(() => {
    if (!TimeNum && !isAscending) {
      console.log('매칭 취소');
    }
  }, [TimeNum, isAscending]);

  return (
    <span className='w-[480px] text-center text-[40px] font-bold font-[Roboto Mono]'>
      {TimeNum >= 60
        ? Math.floor(TimeNum / 60) + ':' + (TimeNum % 60)
        : '0:' + TimeNum}
    </span>
  );
}
