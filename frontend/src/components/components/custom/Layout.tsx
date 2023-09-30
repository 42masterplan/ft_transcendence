import NavBar from './NavBar';
import React from 'react';
import {useRouter} from 'next/router';
export default function Layout({children}: {children: React.ReactNode}) {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <>
      <div>{children}</div>
      {router.pathname.match('/welcome') ? '' : <NavBar />}
    </>
  );
}
