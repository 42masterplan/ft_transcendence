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

interface BallState {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: {x: number; y: number};
  lastCollision: number;
}

export default class Ball extends React.Component<BallProps, BallState> {
  private animationFrameId: number | null = null;
  constructor(props: BallProps) {
    super(props);
    this.state = {
      x: props.x,
      y: props.y,
      radius: props.radius || 5,
      color: props.color || 'white',
      velocity: props.velocity,
      lastCollision: props.lastCollision
    };
  }
  draw() {
    const {c} = this.props;
    const {x, y, radius, color} = this.state;
    c.beginPath();
    c.arc(x, y, radius, 0, Math.PI * 2, false);
    c.fillStyle = color;
    c.fill();
  }
  update() {
    const {x, y, velocity} = this.state;
    this.setState({
      x: x + velocity.x,
      y: y + velocity.y
    });
    this.draw();
  }
}
