export type userStatus = 'Online' | 'Offline' | 'InGame' | 'AFK';

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

export type socialPageTargetUser = 'friend' | 'all users';
export type socialPageUserStatus = 'Online' | 'Offline' | 'InGame' | 'All';
