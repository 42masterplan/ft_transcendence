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
  achieveRatio: number;
}

// API: GET /user/matches
export interface match {
  createdAt: string;
  player1Name: string;
  player2Name: string;
  player1Score: number;
  player2Score: number;
}
