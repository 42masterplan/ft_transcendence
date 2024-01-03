export interface Player {
  name: any;
  profileImage: any;
}

export interface rank {
  win: number;
  lose: number;
  tier: string;
}
export const Theme = {
  Badminton: 'Badminton',
  Basketball: 'Basketball',
  Soccer: 'Soccer',
  Swimming: 'Swimming',
  Climbing: 'Climbing',
  Default: 'Default'
} as const;

export type GameInfoType = {
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
  theme: string;
  // title: string; // TODO: Decide: Do we really need this?
  // mode: "mode1" | "mode2" | "mode3" // TODO: Decide: Do we really need this?
};

export type gameType = 'Ladder' | 'NonLadder';

export type gameStatus = 'Waiting' | 'Playing' | 'Finished' | 'Cancelled';
