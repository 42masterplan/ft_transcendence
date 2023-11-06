import * as Type from '@/lib/types';

// [
// 	{
// 		id: string,
// 		profileImage: string,
// 		name: string,
// 		currentState: string,
// 		introduction: string,
//     isFriend: boolean,
//     isBlocked: boolean,
// 	},
// 	{
// 		id: string,
// 		profileImage: string,
// 		name: string,
// 		currentState: string,
// 		introduction: string,
//     isFriend: boolean,
//     isBlocked: boolean,
// 	},
// 	...
// ]

const dummyUsers: user[] = [
  {
    id: '1',
    profileImage: 'https://www.w3schools.com/howto/img_avatar.png',
    name: 'User1',
    currentStatus: 'Online',
    introduction: "Hello, I'm User1. Nice to meet you!",
    isFriend: true,
    isBlocked: false
  },
  {
    id: '2',
    profileImage: 'https://www.w3schools.com/howto/img_avatar.png',
    name: 'User2',
    currentStatus: 'Offline',
    introduction: "Hello, I'm User2. Nice to meet you!",
    isFriend: false,
    isBlocked: false
  },
  {
    id: '3',
    profileImage: 'https://www.w3schools.com/howto/img_avatar.png',
    name: 'User3',
    currentStatus: 'InGame',
    introduction: "Hello, I'm User3. Nice to meet you!",
    isFriend: false,
    isBlocked: true
  },
  {
    id: '4',
    profileImage: 'https://www.w3schools.com/howto/img_avatar.png',
    name: 'User4',
    currentStatus: 'Online',
    introduction: "Hello, I'm User4. Nice to meet you!",
    isFriend: true,
    isBlocked: true // is this error?
  },
  {
    id: '5',
    profileImage: 'https://www.w3schools.com/howto/img_avatar.png',
    name: 'User5',
    currentStatus: 'Offline',
    introduction: "Hello, I'm User5. Nice to meet you!",
    isFriend: false,
    isBlocked: true
  },
  {
    id: '6',
    profileImage: 'https://www.w3schools.com/howto/img_avatar.png',
    name: 'User6',
    currentStatus: 'Online',
    introduction: "Hello, I'm User6. Nice to meet you!",
    isFriend: true,
    isBlocked: false
  },
  {
    id: '7',
    profileImage: 'https://www.w3schools.com/howto/img_avatar.png',
    name: 'User7',
    currentStatus: 'InGame',
    introduction: "Hello, I'm User7. Nice to meet you!",
    isFriend: false,
    isBlocked: true
  },
  {
    id: '8',
    profileImage: 'https://www.w3schools.com/howto/img_avatar.png',
    name: 'User8',
    currentStatus: 'Online',
    introduction: "Hello, I'm User8. Nice to meet you!",
    isFriend: true,
    isBlocked: false
  },
  {
    id: '9',
    profileImage: 'https://www.w3schools.com/howto/img_avatar.png',
    name: 'User9',
    currentStatus: 'Offline',
    introduction: "Hello, I'm User9. Nice to meet you!",
    isFriend: false,
    isBlocked: true
  },
  {
    id: '10',
    profileImage: 'https://www.w3schools.com/howto/img_avatar.png',
    name: 'User10',
    currentStatus: 'Online',
    introduction: "Hello, I'm User10. Nice to meet you!",
    isFriend: true,
    isBlocked: false
  },
  {
    id: '11',
    profileImage: 'https://www.w3schools.com/howto/img_avatar.png',
    name: 'User11',
    currentStatus: 'Online',
    introduction: "Hello, I'm User11. Nice to meet you!",
    isFriend: false,
    isBlocked: true
  },
  {
    id: '12',
    profileImage: 'https://www.w3schools.com/howto/img_avatar.png',
    name: 'User12',
    currentStatus: 'Online',
    introduction: "Hello, I'm User12. Nice to meet you!",
    isFriend: true,
    isBlocked: false
  },
  {
    id: '13',
    profileImage: 'https://www.w3schools.com/howto/img_avatar.png',
    name: 'User13',
    currentStatus: 'Online',
    introduction: "Hello, I'm User13. Nice to meet you!",
    isFriend: false,
    isBlocked: true
  },
  {
    id: '14',
    profileImage: 'https://www.w3schools.com/howto/img_avatar.png',
    name: 'User14',
    currentStatus: 'Online',
    introduction: "Hello, I'm User14. Nice to meet you!",
    isFriend: true,
    isBlocked: false
  },
  {
    id: '15',
    profileImage: 'https://www.w3schools.com/howto/img_avatar.png',
    name: 'User15',
    currentStatus: 'Online',
    introduction: "Hello, I'm User15. Nice to meet you!",
    isFriend: false,
    isBlocked: true
  },
  {
    id: '16',
    profileImage: 'https://www.w3schools.com/howto/img_avatar.png',
    name: 'User16',
    currentStatus: 'Online',
    introduction: "Hello, I'm User16. Nice to meet you!",
    isFriend: true,
    isBlocked: false
  },
  {
    id: '17',
    profileImage: 'https://www.w3schools.com/howto/img_avatar.png',
    name: 'User17',
    currentStatus: 'Online',
    introduction: "Hello, I'm User17. Nice to meet you!",
    isFriend: false,
    isBlocked: true
  },
  {
    id: '18',
    profileImage: 'https://www.w3schools.com/howto/img_avatar.png',
    name: 'User18',
    currentStatus: 'Online',
    introduction: "Hello, I'm User18. Nice to meet you!",
    isFriend: true,
    isBlocked: false
  },
  {
    id: '19',
    profileImage: 'https://www.w3schools.com/howto/img_avatar.png',
    name: 'User19',
    currentStatus: 'Online',
    introduction: "Hello, I'm User19. Nice to meet you!",
    isFriend: false,
    isBlocked: true
  }
];

export interface user {
  id: string;
  profileImage: string;
  name: string;
  currentStatus: Type.userStatus | string;
  introduction: string;
  isFriend: boolean;
  isBlocked: boolean;
}

export function social__getUsers(): user[] {
  return dummyUsers;
}

export async function social__getUsersAsync(): Promise<user[]> {
  setTimeout(() => {}, 1000);
  return dummyUsers;
}
