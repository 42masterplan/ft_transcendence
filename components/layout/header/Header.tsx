import {useRouter} from 'next/router';
import HeaderDropDownBtn from './dropDownButton/HeaderDropDownBtn';
import NotificationBtn from './notification-button/NotificationBtn';

interface HeaderProps {
  className?: string;
}

export default function Header({className = ''}: HeaderProps) {
  return (
    <header className={className}>
      <HeaderDropDownBtn />
      <h1 className='font-mono text-custom3 font-bold tracking-[0.4rem] text-2xl sm:text-5xl text-center px-2 truncate'>
        AMAZING PONG
      </h1>
      <NotificationBtn />
    </header>
  );
}
