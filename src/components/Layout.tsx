import NavBar from './navbar/NavBar';
import React from 'react';
import {useRouter} from 'next/router';
import Header from './Header';
import {createContext} from 'react';
import {Toaster} from '@/components/shadcn/toaster';
import {SessionProvider} from 'next-auth/react';
import {
  gameRequests,
  friendInfos,
  channelList,
  channelInfo,
  banUserList,
  blockUserInfos,
  type GlobalVariable
} from './APIData';

export const APIContext = createContext<GlobalVariable>();

export default function Layout({children}: {children: React.ReactNode}) {
  const router = useRouter();

  // styles for layout
  const style = {
    motherContainer: 'flex flex-row self-stretch',
    centerContainer: 'flex justify-center min-w-[640px]',
    sideContainer: 'w-full ',
    toaster: 'bg-color_1'
  };

  return (
    <>
      <APIContext.Provider
        value={{
          gameRequests,
          friendInfos,
          channelList,
          channelInfo,
          banUserList,
          blockUserInfos
        }}
      >
        {router.pathname.match('/welcome') ||
        router.pathname.match('/active') ? (
          ''
        ) : (
          <Header />
        )}
        <main className={style.motherContainer}>
          {/* main-left */}
          <section className={style.sideContainer}></section>
          {/* main-center -> width will be fixed to 640px */}
          <section className={style.centerContainer}>{children}</section>
          {/* main-right */}
          <section className={style.sideContainer}></section>
        </main>
      </APIContext.Provider>
      {router.pathname.match('/welcome') || router.pathname.match('/active') ? (
        ''
      ) : (
        <NavBar />
      )}
      <Toaster />
    </>
  );
}
