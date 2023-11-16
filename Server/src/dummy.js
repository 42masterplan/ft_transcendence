import dotenv from 'dotenv';
dotenv.config();

export const PublicRoomList = [
  {
    channelName: '개굴개굴 개구리',
    userCount: 10,
    isPassword: false,
    id: '1'
  },
  {
    channelName: '굴개 굴개 개구리',
    userCount: 20,
    isPassword: false,
    id: '굴개 굴개 개구리'
  },
  {
    channelName: '뭘봐 이놈아',
    userCount: 21,
    isPassword: false,
    id: '뭘봐 이놈아'
  },
  {
    channelName: '내일 코테인데',
    userCount: 22,
    isPassword: true,
    id: '내일 코테인데'
  },
  {
    channelName: '잘 볼 수 있을까?',
    userCount: 23,
    isPassword: false,
    id: '잘 볼 수 있을까?'
  },
  {
    channelName: '기적 같이 맥북 따고 싶다.',
    userCount: 24,
    isPassword: true,
    id: '기적 같이 맥북 따고 싶다.'
  }
];

export const EngagedChannels = [
  {
    id: '아비꼬',
    channelName: '아비꼬',
    userCount: 11,
    isUnread: true
  },
  {
    id: '압둘알리',
    channelName: '압둘알리',
    userCount: 15,
    isUnread: false
  },
  {
    id: '헬스는 사랑이다.',
    channelName: '헬스는 사랑이다.',
    userCount: 13,
    isUnread: true
  },
  {
    id: '42정병',
    channelName: '42정병',
    userCount: 12,
    isUnread: false
  }
];

export const channelHistory = {
  아비꼬: [
    {
      id: 'yejinam',
      name: 'yejinam',
      //채팅을 보낸 사람의 이름
      profileImage: process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI3 || '', //채팅을 보낸 사람의 프로필 사진
      content: '나는 남예지다.?', //채팅 내용
      createdAt: '2021-06-01T14:48:00.000Z',
      isBlocked: false //차단 여부
    },
    {
      id: 'daejlee',
      name: 'daejlee',
      profileImage: process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI4 || '',
      content: '라이노는 코뿔소 들이 박아버려 다 겁을 줘~~',
      createdAt: '2021-06-01T14:48:00.000Z',
      isBlocked: false //차단 여부
    },
    {
      id: 'hkong',
      name: 'hkong',
      profileImage: process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI11 || '',
      content: '수영 꿀잼~~',
      isBlocked: true //차단 여부
    }
  ],
  압둘알리: [
    {
      id: 'yejinam2',
      name: 'yejinam2',
      //채팅을 보낸 사람의 이름
      profileImage: process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI4 || '', //채팅을 보낸 사람의 프로필 사진
      content: '나는 남예지다. ? ㄴ미ㅏㅇ;', //채팅 내용
      createdAt: '2021-06-01T14:48:00.000Z',
      isBlocked: false //차단 여부
    },
    {
      id: 'daejlee2',
      createdAt: '2021-06-01T14:48:00.000Z',
      name: 'daejlee2',
      profileImage: process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI4 || '',
      content: 'ㅇ,익스프레스',
      isBlocked: true //차단 여부
    },
    {
      id: 'hkong2',
      name: 'hkong2',
      profileImage: process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI11 || '',
      content: '수영 꿀잼~~ㅁㄴㅇㅁㄴㅇ',
      isBlocked: false //차단 여부
    }
  ],
  '42정병': [],
  '헬스는 사랑이다.': []
};

export const myRoles = {
  아비꼬: {
    role: 'user'
  },
  압둘알리: {
    role: 'owner'
  },
  '42정병': {
    role: 'admin'
  },
  '헬스는 사랑이다.': {
    role: 'user'
  }
};
