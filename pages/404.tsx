// pages/404.tsx
import React from 'react';
import LinkBtn from '@/components/button/LinkBtn';
const Custom404 = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-custom1 text-white'>
      <div className='text-center'>
        <h1 className='text-6xl font-bold mb-4'>404 - Not Found</h1>
        <p className='text-2xl'>
          Oops! The page you are looking for seems to have vanished into the
          void.
        </p>
        <p className='text-lg mt-4'>
          But dont worry, you can explore other interesting pages on our site!
        </p>
        <LinkBtn link='/'>홈으로 이동</LinkBtn>
      </div>
    </div>
  );
};

export default Custom404;
