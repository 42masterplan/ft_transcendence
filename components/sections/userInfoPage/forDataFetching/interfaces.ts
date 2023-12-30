// API: GET /user/rank
export interface rank {
  win: number;
  lose: number;
  tier: string;
}

// API: GET /user/challenges
export interface challenge {
  name: string;
  description: string;
  progressRate: number;
}

// API: GET /user/matches
export interface match {
  createdAt: string;
  playerAName: string;
  playerBName: string;
  playerAScore: number;
  playerBScore: number;
  gameId: string;
}
