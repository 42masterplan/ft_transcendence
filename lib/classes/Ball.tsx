import React from 'react';
import Player from './Player';
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_A_COLOR,
  PLAYER_B_COLOR,
  BACKGROUND_COLOR,
  BALL_RADIUS,
  BALL_COLOR,
  BALL_VELOCITY,
  BALL_SPEED,
  PADDLE_OFFSET,
  SCORE_LIMIT,
  GAME_TIME_LIMIT
} from '../../pages/game/active/in-game/macros';

interface BallProps {
  x: number;
  y: number;
  radius?: number;
  color?: string;
  velocity?: {x: number; y: number};
  c: CanvasRenderingContext2D;
  lastCollision: number;
}

function calcBallVelocity(x: number, y: number) {
  let dx = x - SCREEN_WIDTH / 2;
  let dy = y - SCREEN_HEIGHT / 2;

  const speed = Math.sqrt(dx * dx + dy * dy);
  let ret_x = (dx / speed) * BALL_SPEED;
  let ret_y = (dy / speed) * BALL_SPEED;
  return {x: ret_x, y: ret_y};
}
export default class Ball extends React.Component<BallProps> {
  x = this.props.x;
  y = this.props.y;
  radius = this.props.radius || BALL_RADIUS;
  color = this.props.color || BALL_COLOR;
  velocity = this.props.velocity || BALL_VELOCITY;
  lastCollision = this.props.lastCollision;

  draw() {
    const {c} = this.props;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
  }

  resetPosition(player: Player) {
    this.velocity = {x: 0, y: 0};
    this.x = this.props.x;
    this.y = this.props.y;
    console.log(player.x, player.y);
    setTimeout(() => {
      this.velocity = calcBallVelocity(player.x + PLAYER_WIDTH / 2, player.y);
    }, 3000);
  }
}
