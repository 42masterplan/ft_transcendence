import LinkBtn from '@/components/button/LinkBtn';
import LoginBtn from '@/components/button/LogInBtn';

export default function Welcome() {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1
        className='bg-gradient-to-r from-purple-700 via-blue-500
        to-cyan-300 text-transparent bg-clip-text
        text-center font-roboto-mono text-7xl leading-normal font-semibold'
      >
        Welcome to Amazing Pong
      </h1>
      <div
        className='w-1/3 h-1/5 p-10 px-30 rounded-lg bg-custom2/30
      shadow-md flex justify-center items-center mt-12 space-x-12'
      >
        <LoginBtn />
      </div>
    </div>
  );
}
