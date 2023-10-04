import NavBtn from './NavBtn';

export default function NavBar() {
  return (
    <nav className='flex flex-row fixed bottom-0 items-stretch flex-wrap justify-center w-screen gap-1 '>
      <NavBtn file='game' path='/game' width={70} height={50} />
      <NavBtn file='channel' path='/channel' width={62.69} height={50} />
      <NavBtn file='home' path='/' width={60} height={60} />
      <NavBtn file='social' path='/social' width={60} height={60} />
      <NavBtn file='rank' path='/rank' width={60} height={60} />
    </nav>
  );
}
