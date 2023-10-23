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
export interface channelType {
  id: string; //random uuid
  channelName: string; //채널방 이름
  userSize: number; //현재 참여중인 유저 수
}

//1. 채널 방을 클릭하면 받아와야 하는 정보
export interface channelInfoType {
  chatList: Array<chatInfoType>; // 저장되어있는 대화의 내용들입니다.
  participants: Array<chatUserInfo>; // 현재 참여중인 유저들의 목록입니다.
  myInfo: chatMyInfoType; // 현재 채팅방에서 제 정보입니다.
}

//1-1채팅방에서 메세지가 오는 정보 하나씩..! (이걸 배열로 받아요!)
// 이전 배열 정보도 이 배열로 받아옵니다.
export interface chatInfoType {
  id: string; //random uuid
  name: string; //채팅을 보낸 사람의 이름
  profile_image: string; //채팅을 보낸 사람의 프로필 사진
  contents: string; //채팅 내용
}
// 1-2 현재 채팅방에서 참여중인 유저의 정보입니다.
export interface chatUserInfo {
  id: string;
  name: string;
  profile_image: string;
  current_status: string;
  introduction: string;
  role: string;
}

//1-3.현재 채널에서 나의 정보 (chatMyInfo)
export interface chatMyInfoType {
  id: string;
  name: string;
  profile_image: string;
  role: string; // manager, admin, user
}

//2. 채널 방에서 금지된 유저의 정보
export interface banUserType {
  id: string; //Random uuid
  name: string; //userNickName
  profile_image: string;
}

//3. 유저의 차단된 유저의 정보
export interface blockUserType {
  id: string; //Random uuid
  name: string; //userNickName
  profile_image: string;
}

export interface Player {
  id: number;
  name: string;
  profile_image: string;
}

export const Player_1 = {
  id: 0,
  name: 'daejlee',
  profile_image: 'rhino_health'
};

export const Player_2 = {
  id: 0,
  name: 'joushin',
  profile_image: 'gorilla_baseBall'
};

//a. 게임 요청이 올 때 정보
export const gameRequests: Array<GameInfoType> = [
  {
    id: 'Seoyoo',
    name: 'Seoyoo',
    profile_image: 'shark_health',
    current_status: 'ONLINE',
    game_mode: 'health'
  },
  {
    id: 'hkong',
    name: 'hkong',
    profile_image: 'koala_health',
    current_status: 'OFFLINE',
    game_mode: 'swim'
  },
  {
    id: 'hkong',
    name: 'hkong',
    profile_image: 'koala_health',
    current_status: 'OFFLINE',
    game_mode: 'swim'
  }
];

//b.친구 목록입니다.
export const friendInfos: Array<FriendInfoType> = [
  {
    id: 'jjin',
    name: 'jjin',
    profile_image: 'polarbear_ski',
    introduction: 'I love badminton',
    current_status: 'INGAME'
  },
  {
    id: 'daejlee',
    name: 'daejlee',
    profile_image: 'rhino_health',
    introduction: '난 대지리다!',
    current_status: 'OFFLINE'
  },
  {
    id: 'joushin',
    name: 'joushin',
    profile_image: 'gorilla_baseBall',
    introduction: '난 조신이다!',
    current_status: 'OFFLINE'
  },
  {
    id: 'hkong',
    name: 'hkong',
    profile_image: 'koala_health',
    current_status: 'OFFLINE',
    introduction: 'I love Swimming~'
  },
  {
    id: 'Seoyoo',
    name: 'Seoyoo',
    profile_image: 'shark_health',
    current_status: 'ONLINE',
    introduction: 'I love Health'
  }
];

//c.채팅방 목록 정보 입니다.
export const channelList: Array<channelType> = [
  {
    id: '아비꼬',
    channelName: '아비꼬',
    userSize: 11
  },
  {
    id: '압둘알리',
    channelName: '압둘알리',
    userSize: 15
  },
  {
    id: '헬스는 사랑이다.',
    channelName: '헬스는 사랑이다.',
    userSize: 13
  },
  {
    id: '배드민턴',
    channelName: '배드민턴',
    userSize: 12
  },
  {
    id: '42정병',
    channelName: '42정병',
    userSize: 15
  },
  {
    id: '코딩.',
    channelName: '코딩.',
    userSize: 2
  },
  {
    id: '축구선수',
    channelName: '축구선수',
    userSize: 3
  },
  {
    id: '방 제목 제한은 8',
    channelName: '방 제목 제한은 8',
    userSize: 5
  },
  {
    id: '서준님의 헬스사랑',
    channelName: '서준님의 헬스사랑',
    userSize: 2
  },
  {
    id: '찐의 배드민턴 사랑',
    channelName: '찐의 배드민턴 사랑',
    userSize: 50
  }
];

//d-1. 채팅 할 때 메세지가 오는 정보를 나타냅니다.
const chatInfos: Array<chatInfoType> = [
  {
    id: 'jjin',
    name: 'jjin',
    profile_image: 'polarbear_ski',
    contents: 'Do you want build snow man?'
  },
  {
    id: 'daejlee',
    name: 'daejlee',
    profile_image: 'rhino_health',
    contents: '라이노는 코뿔소 들이 박아버려 다 겁을 줘~~'
  },
  {
    id: 'MY_ID',
    name: 'joushin',
    profile_image: 'gorilla_baseBall',
    contents: '고릴라를 무시하지 마라'
  },
  {
    id: 'joshin',
    name: 'joshin',
    profile_image: 'gorilla_baseBall',
    contents: '고릴라를 무시하지 마라'
  },
  {
    id: 'hkong',
    name: 'hkong',
    profile_image: 'koala_health',
    contents: '수영 꿀잼~~'
  },
  {
    id: 'Seoyoo',
    name: 'Seoyoo',
    profile_image: 'shark_health',
    contents: '무게가 가볍다?? 근손실 안돼!!'
  },
  {
    id: 'Seoyoo',
    name: 'Seoyoo',
    profile_image: 'shark_health',
    contents:
      '아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트아주긴거 테테스스트'
  }
];

//d-2. 현재 채팅방에 참여중인 유저에 대한 정보입니다.
export const channelUserList = [
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

//d-3. 현재 채팅방에서 제 정보입니다.
export const chatMyInfo: chatMyInfoType = {
  id: 'MY_ID',
  name: 'joushin',
  profile_image: 'gorilla_baseBall',
  role: 'manager'
};

//[d]채팅 방을 클릭하면 받아와야 하는 정보입니다.
export const channelInfo: channelInfoType = {
  chatList: chatInfos, // 저장되어있는 대화의 내용들입니다.
  participants: channelUserList, // 현재 참여중인 유저들의 목록입니다.
  myInfo: chatMyInfo // 현재 채팅방에서 제 정보입니다.
};

//e. 현재 채팅방에서 금지된 유저의 목록입니다.
export const banUserList: Array<banUserType> = [
  {
    id: 'RandomUUid',
    name: 'Naki',
    profile_image: 'dog_stateBoard'
  },
  {
    id: 'RandomUUid',
    name: 'sohlee',
    profile_image: 'dog_stateBoard'
  }
];

//f. 내가 차단한 유저의 목록입니다.
export const blockUserInfos: Array<blockUserType> = [
  {
    id: 'RandomUUid',
    name: 'Naki',
    profile_image: 'dog_stateBoard'
  }
];

export interface GlobalVariable {
  gameRequests: Array<GameInfoType>; //게임 요청이 올 때 정보
  friendInfos: Array<FriendInfoType>; //친구 목록
  channelList: Array<channelType>; //채널방 목록
  channelInfo: channelInfoType; //채널 방을 클릭하면 받아와야 하는 정보
  banUserList: Array<banUserType>; //현재 채팅방에서 금지된 유저의 정보
  blockUserInfos: Array<blockUserType>; //내가 차단한 유저의 목록입니다.
}
