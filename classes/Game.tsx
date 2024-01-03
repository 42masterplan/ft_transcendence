import {gameStatus, gameType} from '@/types/game';

export class Game {
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
  constructor() {
    this.id = '';
    this.type = 'Ladder';
    this.status = 'Waiting';
    this.player1Id = '';
    this.player1Name = '';
    this.player1Score = 0;
    this.player2Id = '';
    this.player2Name = '';
    this.player2Score = 0;
    this.startTime = null;
    this.endTime = null;
    this.theme = '';
  }
}
