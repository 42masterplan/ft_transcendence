import NavBar from './navbar/NavBar';
import React from 'react';
import {useRouter} from 'next/router';
import Header from './Header';
export default function Layout({children}: {children: React.ReactNode}) {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <>
      <Header />
      <div>{children}</div>
      {router.pathname.match('/welcome') ? '' : <NavBar />}
    </>
  );
}
