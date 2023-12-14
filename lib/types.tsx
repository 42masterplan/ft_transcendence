export type userStatus = 'on-line' | 'off-line' | 'in-Game' | 'AFK';

export type UserInfo = {
  id: string; // UUID
  name: string; // max 10 characters
  profileImage: string;
  currentStatus: userStatus;
  introduction: string; // max 50 characters
  friendList: string[]; // userId[]
  blockList: string[]; // userId[]
};

export type gameType = 'Ladder' | 'NonLadder';

export type gameStatus = 'Waiting' | 'Playing' | 'Finished' | 'Cancelled';

export type GameInfo = {
  id: string; // UUID
  type: gameType;
  status: gameStatus;
  player1Id: string;
  player1Name: string;
  player1Score: number;
  player2Id: string;
  player2Name: string;
  player2Score: number;
  startTime: Date | null;
  endTime: Date | null;
  // title: string; // TODO: Decide: Do we really need this?
  // mode: "mode1" | "mode2" | "mode3" // TODO: Decide: Do we really need this?
};

export type MatchRequest = {
  id: string;
  challengerId: string;
  challengedId: string;
  requestTime: Date;
};

export type MatchRequestStatus = 'Pending' | 'Accepted' | 'Rejected';

export type FriendRequest = {
  id: string; // UUID
  from: string; // userId
  to: string; // userId
  requestTime: Date;
  status: MatchRequestStatus;
};

export type DMType = {
  id: string; // UUID
  senderName: string;
  senderProfileImage: string;
  receiverName: string;
  receiverProfileImage: string;
  content: string;
  sendTime: Date;
};

// 원래 enum으로 하려고 했지만 TS에서 as const 형태를 지향하기에..
export const Theme = {
  Theme1: 'Theme1',
  Theme2: 'Theme2',
  Theme3: 'Theme3',
  Theme4: 'Theme4'
} as const;
