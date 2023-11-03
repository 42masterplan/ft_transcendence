import React from 'react';

interface BallProps {
  x: number;
  y: number;
  radius?: number;
  color?: string;
  velocity: {x: number; y: number};
  c: CanvasRenderingContext2D;
  lastCollision: number;
}

export default class Ball extends React.Component<BallProps> {
  x: number = this.props.x;
  y: number = this.props.y;
  radius: number = this.props.radius || 5;
  color: string = this.props.color || 'white';
  velocity: {x: number; y: number} = this.props.velocity;
  lastCollision: number = this.props.lastCollision;

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

  resetPosition() {
    this.x = this.props.x;
    this.y = this.props.y;
  }
}
