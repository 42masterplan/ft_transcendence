import NavBar from './navbar/NavBar';
import React from 'react';
import {useRouter} from 'next/router';
import Header from './Header';
import {createContext} from 'react';
export const APIContext = createContext<GlobalVariable>();

// 이거 빨간줄 못  고쳐요~
export interface FriendInfoType {
  id: string;
  name: string;
  profile_image: string;
  current_status: string;
  introduction: string;
}
export interface GameInfoType {
  id: string;
  name: string;
  profile_image: string;
  current_status: string;
  game_mode: string;
}
export interface ChatInfoType {
  id: string;
  name: string;
  profile_image: string;
  current_status: string;
  contents: string;
  role: string;
}

export interface GlobalVariable {
  friendInfos: Array<FriendInfoType>;
  gameRequests: Array<GameInfoType>;
  chatInfos: Array<ChatInfoType>;
  chatMyInfo: ChatInfoType;
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
    id: 'MY_ID',
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

const chatInfos = [
  {
    id: 'RandomUUid',
    name: 'jjin',
    profile_image: 'polarbear_ski',
    current_status: 'INGAME',
    contents: 'Do you want build snow man?',
    role: 'admin'
  },
  {
    id: 'RandomUUid',
    name: 'daejlee',
    profile_image: 'rhino_health',
    current_status: 'OFFLINE',
    contents: '라이노는 코뿔소 들이 박아버려 다 겁을 줘~~',
    role: 'admin'
  },
  {
    id: 'MY_ID',
    name: 'joushin',
    profile_image: 'gorilla_baseBall',
    current_status: 'OFFLINE',
    contents: '고릴라를 무시하지 마라',
    role: 'manager'
  },
  {
    id: 'RandomUUid',
    name: 'joshin',
    profile_image: 'gorilla_baseBall',
    current_status: 'OFFLINE',
    contents: '고릴라를 무시하지 마라',
    role: 'admin'
  },
  {
    id: 'uuid',
    name: 'hkong',
    profile_image: 'koala_health',
    current_status: 'OFFLINE',
    contents: '수영 꿀잼~~',
    role: 'user'
  },
  {
    id: 'uuid',
    name: 'Seoyoo',
    profile_image: 'shark_health',
    current_status: 'ONLINE',
    contents: '무게가 가볍다?? 근손실 안돼!!',
    role: 'user'
  }
];
const chatMyInfo = {
  id: 'MY_ID',
  name: 'joushin',
  profile_image: 'gorilla_baseBall',
  current_status: 'Online',
  contents: '고릴라를 무시하지 마라',
  role: 'manager'
};
export default function Layout({children}: {children: React.ReactNode}) {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <>
      <APIContext.Provider
        value={{gameRequests, friendInfos, chatInfos, chatMyInfo}}
      >
        <Header />
        <div>{children}</div>
      </APIContext.Provider>
      {router.pathname.match('/welcome') ? '' : <NavBar />}
    </>
  );
}
