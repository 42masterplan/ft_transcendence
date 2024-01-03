import React from 'react';
import {BALL_COLOR} from '../lib/game/macros';

interface ParticleProps {
  x: number;
  y: number;
  c: CanvasRenderingContext2D;
}

export default class Particle extends React.Component<ParticleProps> {
  x = this.props.x;
  y = this.props.y;
  radius = 3;
  color = BALL_COLOR;
  velocity = {x: Math.random() - 0.5, y: Math.random() - 0.5};
  alpha = 1;

  draw() {
    const {c} = this.props;
    c.save();
    c.globalAlpha = this.alpha;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = BALL_COLOR;
    c.fill();
    c.restore();
  }

  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    if (this.alpha <= 0.01) return;
    this.alpha -= 0.01;
  }
}
