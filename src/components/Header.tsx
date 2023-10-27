import SettingBtn from './button/SettingBtn';
import AlarmBtn from './button/AlarmBtn';
import Title from './Title';
export default function Header() {
  return (
    <header>
      <Title />
      <SettingBtn />
      <AlarmBtn />
    </header>
  );
}
