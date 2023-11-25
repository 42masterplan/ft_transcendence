import React from 'react';
import {Socket} from 'socket.io-client';

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

  draw() {
    this.c.beginPath();
    this.c.rect(this.x, this.y, this.width, this.height);
    this.c.fillStyle = this.color;
    this.c.fill();
  }
}

export default Player;
