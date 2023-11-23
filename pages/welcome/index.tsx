import LoginBtn from '@/components/button/LogInBtn';
import Image from 'next/image';
export default function Welcome() {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1 className='font-mono font-bold text-2xl sm:text-5xl text-center px-2 py-10 bg-gradient-to-r from-custom2 to-custom3 text-transparent bg-clip-text'>
        <span className='block'>Welcome</span>
        <span className='block text-4xl sm:text-6xl'>Amazing Pong</span>
      </h1>
      <Image src='/cute_dog_rocket.png' width={200} height={200} alt='' />
      <div
        className='rounded-lg bg-custom2/30
      shadow-md flex justify-center items-center mt-12 space-x-12'
      >
        <LoginBtn />
      </div>
    </div>
  );
}
