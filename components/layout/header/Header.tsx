import {useRouter} from 'next/router';
import HeaderDropDownBtn from './dropDownButton/HeaderDropDownBtn';
import NotificationBtn from './notification-button/NotificationBtn';

interface HeaderProps {
  className?: string;
}

export default function Header({className = ''}: HeaderProps) {
  const router = useRouter();
  return (
    <header className={className}>
      <HeaderDropDownBtn />
      <h1
        className='font-mono text-custom3 font-extrabold tracking-[0.4rem] text-3xl sm:text-5xl text-center
        px-2 truncate cursor-pointer active:bg-gray-400 rounded-md animate-pulse'
        onClick={() => {
          router.push('/');
        }}
      >
        AMAZING PONG
      </h1>
      <NotificationBtn />
    </header>
  );
}
