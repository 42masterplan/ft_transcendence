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

interface PlayerState {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  dx: number;
}

export default class Player extends React.Component<PlayerProps, PlayerState> {
  constructor(props: PlayerProps) {
    super(props);
    this.state = {
      x: props.x,
      y: props.y,
      width: props.width || 150,
      height: props.height || 15,
      color: props.color || 'rgba(217, 217, 217, 1)',
      dx: props.dx || 0
    };
  }
  isACollided(ball: Ball) {
    const offsetX = ball.state.x - this.state.x + ball.state.radius;
    const offsetY = ball.state.y - this.state.y + ball.state.radius;
    if (
      offsetX < this.state.width + 4 &&
      offsetX > 0 &&
      offsetY <= 10 &&
      offsetY >= -10
    )
      return true;
    return false;
  }
  isBVollided(ball: Ball) {
    const offsetX = ball.state.x - this.state.x + ball.state.radius;
    const offsetY =
      this.state.y - ball.state.y + this.state.height + ball.state.radius;
    if (
      offsetX < this.state.width + 4 &&
      offsetX > 0 &&
      offsetY >= -10 &&
      offsetY <= 10
    )
      return true;
    return false;
  }
  applySpin(ball: Ball) {
    const spinFactor = 0.4;
    ball.state.velocity.x += this.state.dx * spinFactor;
    const speed = Math.sqrt(
      ball.state.velocity.x * ball.state.velocity.x +
        ball.state.velocity.y * ball.state.velocity.y
    );
    // 5 is the speed of the ball
    ball.state.velocity.x = 5 * (ball.state.velocity.x / speed);
    ball.state.velocity.y = 5 * (ball.state.velocity.y / speed);
  }
  handleCollision(ball: Ball, now: number) {
    ball.setState({lastCollision: now});
    const reflectedAngle = Math.atan2(
      ball.state.velocity.y,
      ball.state.velocity.x
    );
    ball.setState({
      x: Math.cos(reflectedAngle) * 5,
      y: Math.sin(reflectedAngle) * 5
    });
    this.applySpin(ball);
  }
  draw() {
    const {c} = this.props;
    const {x, y, width, height, color} = this.state;

    c.beginPath();
    c.rect(x, y, width, height);
    c.fillStyle = color;
    c.fill();
  }
}
