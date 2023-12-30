export interface GameInfoType {
  id: string;
  name: string;
  profileImage: string;
  current_status: string;
  game_mode: string;
}

export interface FriendInfoType {
  id: string;
  name: string;
  profileImage: string;
  current_status: string;
  introduction: string;
}

//2. 채널 방에서 금지된 유저의 정보
export interface banUserType {
  id: string; //Random uuid
  name: string; //userNickName
  profileImage: string;
}

//3. 유저의 차단된 유저의 정보
export interface blockUserType {
  id: string; //Random uuid
  name: string; //userNickName
  profileImage: string;
}

export interface Player {
  name: any;
  profileImage: any;
}

export const PLAYER_DUMMY_1 = {
  id: 0,
  name: 'daejlee',
  profileImage: process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI4 || ''
};

export const PLAYER_DUMMY_2 = {
  id: 0,
  name: 'joushin',
  profileImage: process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI5 || ''
};

//a. 게임 요청이 올 때 정보
export const gameRequests: Array<GameInfoType> = [
  {
    id: 'Seoyoo',
    name: 'Seoyoo',
    profileImage: process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI6 || '',
    current_status: 'on-line',
    game_mode: 'health'
  },
  {
    id: 'hkong',
    name: 'hkong',
    profileImage: process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI11 || '',
    current_status: 'off-line',
    game_mode: 'swim'
  },
  {
    id: 'hkong',
    name: 'hkong',
    profileImage: process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI11 || '',
    current_status: 'off-line',
    game_mode: 'swim'
  }
];

//b.친구 목록입니다.
export const friendInfos: Array<FriendInfoType> = [
  {
    id: 'yejinam',
    name: 'yejinam',
    profileImage: process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI3 || '',
    introduction: 'I love badminton',
    current_status: 'in-game'
  },
  {
    id: 'daejlee',
    name: 'daejlee',
    profileImage: process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI4 || '',
    introduction: '난 대지리다!',
    current_status: 'off-line'
  },
  {
    id: 'joushin',
    name: 'joushin',
    profileImage: process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI5 || '',
    introduction: '난 조신이다!',
    current_status: 'off-line'
  },
  {
    id: 'hkong',
    name: 'hkong',
    profileImage: process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI11 || '',
    current_status: 'off-line',
    introduction: 'I love Swimming~'
  },
  {
    id: 'Seoyoo',
    name: 'Seoyoo',
    profileImage: process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI6 || '',
    current_status: 'on-line',
    introduction: 'I love Health'
  }
];

//e. 현재 채팅방에서 금지된 유저의 목록입니다.
export const banUserList: Array<banUserType> = [
  {
    id: 'RandomUUid',
    name: 'Naki',
    profileImage: process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI10 || ''
  },
  {
    id: 'RandomUUid',
    name: 'sohlee',
    profileImage: process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI10 || ''
  }
];

//f. 내가 차단한 유저의 목록입니다.
export const blockUserInfos: Array<blockUserType> = [
  {
    id: 'RandomUUid',
    name: 'Naki',
    profileImage: process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI10 || ''
  }
];

export interface GlobalVariable {
  gameRequests: Array<GameInfoType>; //게임 요청이 올 때 정보
  friendInfos: Array<FriendInfoType>; //친구 목록
  banUserList: Array<banUserType>; //현재 채팅방에서 금지된 유저의 정보
  blockUserInfos: Array<blockUserType>; //내가 차단한 유저의 목록입니다.
}
import {createContext} from 'react';

export const APIContext = createContext<GlobalVariable>({
  gameRequests,
  friendInfos,
  banUserList,
  blockUserInfos
});
