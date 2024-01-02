import {match} from 'assert';
import {useEffect, useState} from 'react';

export default function MatchMakingTimer(props: {
  isAscending: boolean;
  matchId?: string;
  stopNormalMatchMaking?: any;
  setIsWaiting?: any;
}) {
  const [TimeNum, setTimeNum] = useState(10);
  const {isAscending, stopNormalMatchMaking, setIsWaiting, matchId} = props;
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
      stopNormalMatchMaking({matchId});
      setIsWaiting(false);
    }
  }, [TimeNum, isAscending]);

  return (
    <span className='w-[480px] text-center text-[40px] font-bold font-[Roboto Mono]'>
      {isAscending ? '0:' : ''}
      {TimeNum}
    </span>
  );
}
