import NavBar from './navbar/NavBar';
import React from 'react';
import {useRouter} from 'next/router';
import Header from './Header';
import {createContext} from 'react';
import {Toaster} from '@/components/shadcn/toaster';

export const APIContext = createContext<GlobalVariable>();

export interface GameInfoType {
  id: string;
  name: string;
  profile_image: string;
  current_status: string;
  game_mode: string;
}

export interface FriendInfoType {
  id: string;
  name: string;
  profile_image: string;
  current_status: string;
  introduction: string;
}
//0.채널방 목록
interface channelType {
  id: string; //random uuid
  roomName: string; //채널방 이름
  userSize: number; //현재 참여중인 유저 수
}

//1. 채널 방을 클릭하면 받아와야 하는 정보
interface channelInfoType {
  chatList: Array<chatInfoType>; // 저장되어있는 대화의 내용들입니다.
  participants: Array<chatUserInfo>; // 현재 참여중인 유저들의 목록입니다.
  myInfo: chatUserInfo; // 현재 채팅방에서 제 정보입니다.
}

//1-1채팅방에서 메세지가 오는 정보 하나씩..! (이걸 배열로 받아요!)
// 이전 배열 정보도 이 배열로 받아옵니다.
export interface chatInfoType {
  id: string; //random uuid
  name: string; //채팅을 보낸 사람의 이름
  profile_image: string; //채팅을 보낸 사람의 프로필 사진
  current_status: string; //채팅을 보낸 사람의 현재 상태
  contents: string; //채팅 내용
}
// 1-2 현재 채팅방에서 참여중인 유저의 정보입니다.
interface chatUserInfo {
  id: string;
  name: string;
  profile_image: string;
  current_status: string;
  introduction: string;
  role: string;
}

//1-3.현재 채널에서 나의 정보 (chatMyInfo)
interface chatMyInfoType {
  id: string;
  name: string;
  profile_image: string;
  role: string; // manager, admin, user
}

//2. 채널 방에서 금지된 유저의 정보
interface banUserType {
  id: string; //Random uuid
  name: string; //userNickName
  profile_image: string;
}

//3. 유저의 차단된 유저의 정보
interface blockUserType {
  id: string; //Random uuid
  name: string; //userNickName
  profile_image: string;
}

export interface GlobalVariable {
  gameRequests: Array<GameInfoType>; //게임 요청이 올 때 정보
  friendInfos: Array<FriendInfoType>; //친구 목록
  channelList: Array<channelType>; //채널방 목록
  channelInfo: channelInfoType; //채널 방을 클릭하면 받아와야 하는 정보
  banUserList: Array<banUserType>; //현재 채팅방에서 금지된 유저의 정보
  blockUserInfos: Array<blockUserType>; //내가 차단한 유저의 목록입니다.
}

//게임 요청이 올 때 정보
const gameRequests: Array<GameInfoType> = [
  {
    id: 'uuid',
    name: 'Seoyoo',
    profile_image: 'shark_health',
    current_status: 'ONLINE',
    game_mode: 'health'
  },
  {
    id: 'uuid',
    name: 'hkong',
    profile_image: 'koala_health',
    current_status: 'OFFLINE',
    game_mode: 'swim'
  },
  {
    id: 'uuid',
    name: 'hkong',
    profile_image: 'koala_health',
    current_status: 'OFFLINE',
    game_mode: 'swim'
  }
];

//친구 목록입니다. (여러군데애서 같은 형식을 쓰고 있음)
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

//채팅 할 때 메세지가 오는 정보를 나타냅니다.
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
  },
  {
    id: 'uuid',
    name: 'Seoyoo',
    profile_image: 'shark_health',
    current_status: 'ONLINE',
    contents:
      '아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트',
    role: 'user'
  }
];

//현재 채팅방에 참여중인 유저에 대한 정보입니다.
const chatUserInfos = [
  {
    id: 'RandomUUid',
    name: 'jjin',
    profile_image: 'polarbear_ski',
    current_status: 'INGAME',
    introduction: 'Do you want build snow man?',
    role: 'admin'
  },
  {
    id: 'RandomUUid',
    name: 'daejlee',
    profile_image: 'rhino_health',
    current_status: 'OFFLINE',
    introduction: '라이노는 코뿔소 들이 박아버려 다 겁을 줘~~',
    role: 'admin'
  },
  {
    id: 'MY_ID',
    name: 'joushin',
    profile_image: 'gorilla_baseBall',
    current_status: 'OFFLINE',
    introduction: '고릴라를 무시하지 마라',
    role: 'manager'
  },
  {
    id: 'RandomUUid',
    name: 'joshin',
    profile_image: 'gorilla_baseBall',
    current_status: 'OFFLINE',
    introduction: '고릴라를 무시하지 마라',
    role: 'admin'
  },
  {
    id: 'uuid',
    name: 'hkong',
    profile_image: 'koala_health',
    current_status: 'OFFLINE',
    introduction: '수영 꿀잼~~',
    role: 'user'
  },
  {
    id: 'uuid',
    name: 'Seoyoo',
    profile_image: 'shark_health',
    current_status: 'ONLINE',
    introduction: 'I love Health',
    role: 'user'
  }
];

// 현재 채팅방에서 금지된 유저의 목록입니다.
const banUserList = [
  {
    id: 'RandomUUid',
    name: 'Naki',
    profile_image: 'dog_stateBoard',
    introduction: 'I Am Crazy',
    current_status: 'INGAME'
  }
];

//내가 차단한 유저의 목록입니다.
const blockUserInfos = [
  {
    id: 'RandomUUid',
    name: 'Naki',
    profile_image: 'dog_stateBoard',
    introduction: 'I Am Crazy',
    current_status: 'INGAME'
  }
];

//현재 채팅방에서 제 정보입니다.
const chatMyInfo = {
  id: 'MY_ID',
  name: 'joushin',
  profile_image: 'gorilla_baseBall',
  current_status: 'Online',
  contents: '고릴라를 무시하지 마라',
  role: 'manager'
};

//채팅방 목록 정보 입니다.
//여기에 friendInfos를 그대로 사용했는데 이러면 채널에서 어떤 역활을 맡았는지를 알 수가 없습니다.
const chatRoomInfos = [
  {
    id: 'RandomUUid',
    RoomName: '아비꼬',
    chatList: chatInfos,
    participants: chatUserInfos,
    banList: banUserList
  },
  {
    id: 'RandomUUid',
    RoomName: '압둘알리',
    chatList: chatInfos,
    participants: friendInfos,
    banList: banUserList
  },
  {
    id: 'RandomUUid',
    RoomName: '헬스는 사랑이다.',
    chatList: chatInfos,
    participants: friendInfos,
    banList: banUserList
  },
  {
    id: 'RandomUUid',
    RoomName: '배드민턴',
    chatList: chatInfos,
    participants: friendInfos,
    banList: banUserList
  },
  {
    id: 'RandomUUid',
    RoomName: '42정병',
    chatList: chatInfos,
    participants: friendInfos,
    banList: banUserList
  },
  {
    id: 'RandomUUid',
    RoomName: '코딩.',
    chatList: chatInfos,
    participants: friendInfos,
    banList: banUserList
  },
  {
    id: 'RandomUUid',
    RoomName: '축구선수',
    chatList: chatInfos,
    participants: friendInfos,
    banList: banUserList
  },
  {
    id: 'RandomUUid',
    RoomName: '방 제목 제한은 8',
    chatList: chatInfos,
    participants: friendInfos,
    banList: banUserList
  },
  {
    id: 'RandomUUid',
    RoomName: '서준님의 헬스사랑',
    chatList: chatInfos,
    participants: friendInfos,
    banList: banUserList
  },
  {
    id: 'RandomUUid',
    RoomName: '찐의 배드민턴 사랑',
    chatList: chatInfos,
    participants: friendInfos,
    banList: banUserList
  }
];

export default function Layout({children}: {children: React.ReactNode}) {
  const router = useRouter();
  console.log(router.pathname);

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
          chatInfos,
          chatMyInfo,
          chatRoomInfos,
          blockUserInfos
        }}
      >
        <Header />
        <main className={style.motherContainer}>
          {/* main-left */}
          <section className={style.sideContainer}></section>
          {/* main-center -> width will be fixed to 640px */}
          <section className={style.centerContainer}>{children}</section>
          {/* main-right */}
          <section className={style.sideContainer}></section>
        </main>
      </APIContext.Provider>
      {router.pathname.match('/welcome') ? '' : <NavBar />}
      <Toaster />
    </>
  );
}
