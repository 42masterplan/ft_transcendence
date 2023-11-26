import * as Type from '@/lib/types';

const dummyUsers: user[] = [
  {
    id: '1',
    profileImage: 'http://localhost:8080/resources/cat_kickBoard.svg',
    name: 'OnlineUser1',
    currentStatus: 'Online',
    introduction: "Hello, I'm User1. Nice to meet you!"
  },
  {
    id: '2',
    profileImage: 'http://localhost:8080/resources/sloth_health.svg',
    name: 'OfflineUser1',
    currentStatus: 'Offline',
    introduction: "Hello, I'm User2. Nice to meet you!"
  },
  {
    id: '3',
    profileImage: 'http://localhost:8080/resources/crocodile_health.svg',
    name: 'InGameUser3',
    currentStatus: 'InGame',
    introduction: "Hello, I'm User3. Nice to meet you!"
  },
  {
    id: '4',
    profileImage: 'http://localhost:8080/resources/dog_body.svg',
    name: 'OnlineUser4',
    currentStatus: 'Online',
    introduction: "Hello, I'm User4. Nice to meet you!"
  },
  {
    id: '5',
    profileImage: 'http://localhost:8080/resources/dog_boxing.svg',
    name: 'User5',
    currentStatus: 'Offline',
    introduction: "Hello, I'm User5. Nice to meet you!"
  },
  {
    id: '6',
    profileImage: 'http://localhost:8080/resources/dog_stateBoard.svg',
    name: 'User6',
    currentStatus: 'Online',
    introduction: "Hello, I'm User6. Nice to meet you!"
  },
  {
    id: '7',
    profileImage: 'http://localhost:8080/resources/gorilla_baseBall.svg',
    name: 'User7',
    currentStatus: 'InGame',
    introduction: "Hello, I'm User7. Nice to meet you!"
  },
  {
    id: '8',
    profileImage: 'http://localhost:8080/resources/kangaroo_boxing.svg',
    name: 'User8',
    currentStatus: 'Online',
    introduction: "Hello, I'm User8. Nice to meet you!"
  },
  {
    id: '9',
    profileImage: 'http://localhost:8080/resources/koala_health.svg',
    name: 'User9',
    currentStatus: 'Offline',
    introduction: "Hello, I'm User9. Nice to meet you!"
  },
  {
    id: '10',
    profileImage: 'http://localhost:8080/resources/polarbear_ski.svg',
    name: 'User10',
    currentStatus: 'Online',
    introduction: "Hello, I'm User10. Nice to meet you!"
  },
  {
    id: '11',
    profileImage: 'http://localhost:8080/resources/rhino_health.svg',
    name: 'User11',
    currentStatus: 'Online',
    introduction: "Hello, I'm User11. Nice to meet you!"
  },
  {
    id: '12',
    profileImage: 'http://localhost:8080/resources/shark_health.svg',
    name: 'User12',
    currentStatus: 'Online',
    introduction: "Hello, I'm User12. Nice to meet you!"
  }
];

export interface user {
  id: string;
  profileImage: string;
  name: string;
  currentStatus: Type.userStatus | string;
  introduction: string;
}

export function social__getUsers(): user[] {
  return dummyUsers;
}

export async function social__getUsersAsync(): Promise<user[]> {
  // give delay for 1sec
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return dummyUsers;
}
