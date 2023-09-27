import BtnLink from '../../../components/LinkBtn';

export default function Welcome() {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <h1
        className='bg-gradient-to-r from-purple-700 via-blue-500 
        to-cyan-300 text-transparent bg-clip-text
        text-center font-roboto-mono text-7xl leading-tight font-semibold'
      >
        Welcome to Amazing Pong
      </h1>
      <div
        className='w-480 h-110 p-10 px-30 rounded-lg bg-btn_container
      shadow-md flex justify-between items-center mt-12 space-x-12'
      >
        <BtnLink name='Register' link='/register' />
        <BtnLink name='Login' link='/login' />
      </div>
    </div>
  );
}
