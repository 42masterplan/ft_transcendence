import React from 'react';
import Ball from './Ball';

interface PlayerProps {
  x: number;
  y: number;
  width?: number;
  height?: number;
  color?: string;
  dx?: number;
  c: CanvasRenderingContext2D;
}

class Player extends React.Component<PlayerProps> {
  x: number = this.props.x;
  y: number = this.props.y;
  width: number = this.props.width || 150;
  height: number = this.props.height || 15;
  color: string = this.props.color || 'rgba(217, 217, 217, 1)';
  dx: number = this.props.dx || 0;

  isACollided(ball: Ball) {
    const offsetX = ball.x - this.x + ball.radius;
    const offsetY = ball.y - this.y + ball.radius;
    return (
      offsetX < this.width + 4 && offsetX > 0 && offsetY <= 10 && offsetY >= -10
    );
  }

  isBVollided(ball: Ball) {
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
    ball.velocity.x = 5 * (ball.velocity.x / speed);
    ball.velocity.y = 5 * (ball.velocity.y / speed);
  }

  handleCollision(ball: Ball, now: number) {
    ball.lastCollision = now;
    const reflectedAngle = Math.atan2(ball.velocity.y, ball.velocity.x);
    ball.velocity.x = Math.cos(reflectedAngle) * 5;
    ball.velocity.y = Math.sin(reflectedAngle) * 5;
    this.applySpin(ball);
  }

  draw() {
    const {c} = this.props;

    c.beginPath();
    c.rect(this.x, this.y, this.width, this.height);
    c.fillStyle = this.color;
    c.fill();
  }
}

export default Player;
