import React from 'react';
import Ball from './Ball';
import io, {Socket} from 'socket.io-client';
import {BALL_SPEED} from '../game/macros';

interface PlayerProps {
  id: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  color?: string;
  dx?: number;
  c: CanvasRenderingContext2D;
  socket: Socket;
}

class Player extends React.Component<PlayerProps> {
  id: string = this.props.id;
  x: number = this.props.x;
  y: number = this.props.y;
  width: number = this.props.width || 100;
  height: number = this.props.height || 15;
  color: string = this.props.color || 'rgba(217, 217, 217, 1)';
  dx: number = this.props.dx || 0;
  c = this.props.c;
  socket = this.props.socket;

  isACollided(ball: Ball) {
    const offsetX = ball.x - this.x + ball.radius;
    const offsetY = ball.y - this.y + ball.radius;
    return (
      offsetX < this.width + 4 && offsetX > 0 && offsetY <= 10 && offsetY >= -10
    );
  }

  isBCollided(ball: Ball) {
    const offsetX = ball.x - this.x + ball.radius;
    const offsetY = this.y - ball.y + this.height + ball.radius;
    return (
      offsetX < this.width + 4 && offsetX > 0 && offsetY >= -10 && offsetY <= 10
    );
  }

  applySpin(ball: Ball) {
    const spinFactor = 0.4;
    ball.velocity.x += this.dx * spinFactor;
    const speed = Math.sqrt(
      ball.velocity.x * ball.velocity.x + ball.velocity.y * ball.velocity.y
    );
    ball.velocity.x = BALL_SPEED * (ball.velocity.x / speed);
    ball.velocity.y = BALL_SPEED * (ball.velocity.y / speed);
  }

  handleCollision(ball: Ball, now: number) {
    this.socket.emit('ballBounce', this.id);
    // ball.lastCollision = now;
    // const reflectedAngle = -Math.atan2(ball.velocity.y, ball.velocity.x);
    // ball.velocity.x = Math.cos(reflectedAngle) * BALL_SPEED;
    // ball.velocity.y = Math.sin(reflectedAngle) * BALL_SPEED;
    // this.applySpin(ball);
  }

  draw() {
    this.c.beginPath();
    this.c.rect(this.x, this.y, this.width, this.height);
    this.c.fillStyle = this.color;
    this.c.fill();
  }
}

export default Player;
