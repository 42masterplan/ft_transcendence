import NavBar from './navbar/NavBar';
import React from 'react';
import {useRouter} from 'next/router';
import Header from './Header';
import {createContext} from 'react';
export const APIContext = createContext<GlobalVariable>();

// 이거 빨간줄 못  고쳐요~
interface FriendInfoType {
  id: string;
  name: string;
  profile_image: string;
  current_status: string;
  introduction: string;
}
interface GameInfoType {
  id: string;
  name: string;
  profile_image: string;
  current_status: string;
  game_mode: string;
}
interface GlobalVariable {
  friendInfos: Array<FriendInfoType>;
  gameRequests: Array<GameInfoType>;
}

const gameRequests = [
  {
    id: 'uuid',
    name: 'Seoyoo',
    profile_image: 'shark_health',
    current_status: 'ONLINE',
    introduction: 'I love Health',
    game_mode: 'health'
  },
  {
    id: 'uuid',
    name: 'hkong',
    profile_image: 'koala_health',
    current_status: 'OFFLINE',
    introduction: 'I love Swimming~',
    game_mode: 'swim'
  },
  {
    id: 'uuid',
    name: 'hkong',
    profile_image: 'koala_health',
    current_status: 'OFFLINE',
    introduction: 'I love Swimming~',
    game_mode: 'swim'
  }
];

const friendInfos = [
  {
    id: 'RandomUUid',
    name: 'jjin',
    profile_image: 'polarbear_ski',
    introduction: 'I love badminton',
    current_status: 'INGAME'
  },
  {
    id: 'RandomUUid',
    name: 'daejlee',
    profile_image: 'rhino_health',
    introduction: '난 대지리다!',
    current_status: 'OFFLINE'
  },
  {
    id: 'RandomUUid',
    name: 'joushin',
    profile_image: 'gorilla_baseBall',
    introduction: '난 조신이다!',
    current_status: 'OFFLINE'
  },
  {
    id: 'uuid',
    name: 'hkong',
    profile_image: 'koala_health',
    current_status: 'OFFLINE',
    introduction: 'I love Swimming~'
  },
  {
    id: 'uuid',
    name: 'Seoyoo',
    profile_image: 'shark_health',
    current_status: 'ONLINE',
    introduction: 'I love Health'
  }
];

export default function Layout({children}: {children: React.ReactNode}) {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <>
      <APIContext.Provider value={{gameRequests, friendInfos}}>
        <Header />
        <div>{children}</div>
      </APIContext.Provider>
      {router.pathname.match('/welcome') ? '' : <NavBar />}
    </>
  );
}
