import * as Type from "@/lib/type"

const dummyUserData = {
  id: "1",
  name: "Seoyoo",
  profileImage: "https://www.w3schools.com/howto/img_avatar.png",
  currentStatus: "Online",
  introduction:
    "Hello, I am User1 and this is a very very very very long long long long long long introduction. ",
  rank: {
    win: 10,
    lose: 5,
    tier: "Gold",
  },
  challenges: [
    {
      name: "Challenge1",
      description: "This is challenge1",
      progressRate: 25,
      achieveRatio: 0.5,
    },
    {
      name: "Challenge2",
      description: "This is challenge2",
      progressRate: 0,
      achieveRatio: 0.5,
    },
    {
      name: "Challenge3",
      description: "This is challenge3",
      progressRate: 14,
      achieveRatio: 1,
    },
    {
      name: "Challenge4",
      description: "This is challenge4",
      progressRate: 23,
      achieveRatio: 1,
    },
    {
      name: "Challenge5",
      description: "This is challenge5",
      progressRate: 33,
      achieveRatio: 1,
    },
    {
      name: "Challenge6",
      description: "This is challenge6",
      progressRate: 44,
      achieveRatio: 1,
    },
    {
      name: "Challenge7",
      description: "This is challenge7",
      progressRate: 55,
      achieveRatio: 1,
    },
    {
      name: "Challenge8",
      description: "This is challenge8",
      progressRate: 66,
      achieveRatio: 1,
    },
    {
      name: "Challenge9",
      description: "This is challenge9",
      progressRate: 77,
      achieveRatio: 1,
    },
    {
      name: "Challenge10",
      description: "This is challenge10",
      progressRate: 100,
      achieveRatio: 1,
    },
    {
      name: "Challenge11",
      description: "This is challenge11",
      progressRate: 100,
      achieveRatio: 1,
    },
    {
      name: "Challenge12",
      description: "This is challenge12",
      progressRate: 100,
      achieveRatio: 1,
    },
    {
      name: "Challenge13",
      description: "This is challenge13",
      progressRate: 100,
      achieveRatio: 1,
    },
    {
      name: "Challenge14",
      description: "This is challenge14",
      progressRate: 100,
      achieveRatio: 1,
    },
    {
      name: "Challenge15",
      description: "This is challenge15",
      progressRate: 100,
      achieveRatio: 1,
    },
    {
      name: "Challenge16",
      description: "This is challenge16",
      progressRate: 100,
      achieveRatio: 1,
    },
    {
      name: "Challenge17",
      description: "This is challenge17",
      progressRate: 100,
      achieveRatio: 1,
    },
    {
      name: "Challenge18",
      description: "This is challenge18",
      progressRate: 100,
      achieveRatio: 1,
    },
    {
      name: "Challenge19",
      description: "This is challenge19",
      progressRate: 100,
      achieveRatio: 1,  
    }
  ],
};

const dummyGameHistory = [
  // {
  //   createdAt: string
  // 	player1Name: string// my id
  // 	player2Name: string// opponent id
  // 	player1Score: number
  // 	player2Score: number
  // },
  // {
  // 	createdAt: string
  // 	player1Name: string// my id
  // 	player2Name: string// opponent id
  // 	player1Score: number
  // 	player2Score: number
  // }
  {
    createdAt: "2021-05-01",
    player1Name: "User1",
    player2Name: "User2",
    player1Score: 0,
    player2Score: 0,
  },
  {
    createdAt: "2021-05-02",
    player1Name: "User1",
    player2Name: "User3",
    player1Score: 5,
    player2Score: 10,
  },
  {
    createdAt: "2021-05-03",
    player1Name: "User1",
    player2Name: "User4",
    player1Score: 10,
    player2Score: 5,
  },
  {
    createdAt: "2021-05-04",
    player1Name: "User1",
    player2Name: "User5",
    player1Score: 5,
    player2Score: 10,
  },
  {
    createdAt: "2021-05-05",
    player1Name: "User1",
    player2Name: "User6",
    player1Score: 10,
    player2Score: 5,
  },
  {
    createdAt: "2021-05-06",
    player1Name: "User1",
    player2Name: "User7",
    player1Score: 5,
    player2Score: 10,
  },
  {
    createdAt: "2021-05-07",
    player1Name: "User1",
    player2Name: "User8",
    player1Score: 10,
    player2Score: 5,
  },
  {
    createdAt: "2021-05-08",
    player1Name: "User1",
    player2Name: "User9",
    player1Score: 5,
    player2Score: 10,
  },
  {
    createdAt: "2021-05-09",
    player1Name: "User1",
    player2Name: "User10",
    player1Score: 10,
    player2Score: 5,
  },
  {
    createdAt: "2021-05-10",
    player1Name: "User1",
    player2Name: "User11",
    player1Score: 5,
    player2Score: 10,
  },
  {
    createdAt: "2021-05-11",
    player1Name: "User1",
    player2Name: "User12",
    player1Score: 10,
    player2Score: 5,
  },
  {
    createdAt: "2021-05-12",
    player1Name: "User1",
    player2Name: "User13",
    player1Score: 5,
    player2Score: 10,
  },
  {
    createdAt: "2021-05-13",
    player1Name: "User1",
    player2Name: "User14",
    player1Score: 10,
    player2Score: 5,
  },
  {
    createdAt: "2021-05-14",
    player1Name: "User1",
    player2Name: "User15",
    player1Score: 5,
    player2Score: 10,
  },
  {
    createdAt: "2021-05-15",
    player1Name: "User1",
    player2Name: "User16",
    player1Score: 10,
    player2Score: 5,
  },
  {
    createdAt: "2021-05-16",
    player1Name: "User1",
    player2Name: "User17",
    player1Score: 5,
    player2Score: 10,
  },
  {
    createdAt: "2021-05-17",
    player1Name: "User1",
    player2Name: "User18",
    player1Score: 10,
    player2Score: 5,
  },
  {
    createdAt: "2021-05-18",
    player1Name: "User1",
    player2Name: "User19",
    player1Score: 5,
    player2Score: 10,
  },
  {
    createdAt: "2021-05-19",
    player1Name: "User1",
    player2Name: "User20",
    player1Score: 10,
    player2Score: 5,
  },
];


export interface rank {
  win: number;
  lose: number;
  tier: string;
}

export interface challenge {
  name: string;
  description: string;
  progressRate: number;
  achieveRatio: number;
}

export interface currentUserData {
  id: string;
  name: string;
  profileImage: string;
  currentStatus: Type.userStatus | string;
  introduction: string;
  rank: rank;
  challenges: challenge[];
}

export interface match {
  createdAt: string;
  player1Name: string;
  player2Name: string;
  player1Score: number;
  player2Score: number;
}

export function main__getUserInfo(): currentUserData {
  return dummyUserData;
}

export async function main__getUserInfoAsync(): Promise<currentUserData> {
  // delay 1 sec
  setTimeout(() => {}, 1000);
  return dummyUserData;
}

export function main__getGameHistory(): match[] {
  return dummyGameHistory;
}

export async function main__getGameHistoryAsync(): Promise<match[]> {
  // delay 1 sec
  setTimeout(() => {}, 1000);
  return dummyGameHistory;
}