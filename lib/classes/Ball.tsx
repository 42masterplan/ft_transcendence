import React from 'react';
import Particle from './Particle';
import {BALL_RADIUS, BALL_COLOR, BALL_VELOCITY} from '../game/macros';

interface BallProps {
  x: number;
  y: number;
  radius?: number;
  color?: string;
  velocity?: {x: number; y: number};
  c: CanvasRenderingContext2D;
  lastCollision: number;
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
    c.save();
    c.shadowColor = this.color;
    c.shadowBlur = 20;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.restore(); //for glow
  }

  // create particles
  resetPosition(particles: Particle[]) {
    const nowX = this.x;
    const nowY = this.y;
    for (let i = 0; i < 16; i++)
      particles.push(new Particle({x: nowX, y: nowY, c: this.props.c}));
    this.velocity = {x: 0, y: 0};
    this.x = this.props.x;
    this.y = this.props.y;
  }
}
