import {useEffect, useRef} from 'react';

interface BallProps {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: {x: number; y: number};
  c: CanvasRenderingContext2D;
}

export default function Ball({
  x,
  y,
  radius = 5,
  color = 'white',
  velocity,
  c
}: BallProps) {
  const x_ = useRef(x);
  const y_ = useRef(y);
  const radius_ = useRef(radius);
  const color_ = useRef(color);
  const velocity_ = useRef(velocity);

  const draw = () => {
    c.beginPath();
    c.arc(x_.current, y_.current, radius_.current, 0, Math.PI * 2, false);
    c.fillStyle = color_.current;
    c.fill();
  };

  const update = () => {
    x_.current += velocity_.current.x;
    y_.current += velocity_.current.y;
    draw();
  };

  useEffect(() => {
    draw(); // 초기 프레임을 그립니다.
  }, []);

  useEffect(() => {
    const animate = () => {
      update(); // 위치를 업데이트하고 새로운 프레임을 그립니다.
      requestAnimationFrame(animate); // 다음 프레임을 요청합니다.
    };
    requestAnimationFrame(animate); // 애니메이션을 시작합니다.
  }, []);

  return null; // 이 컴포넌트는 UI 요소를 렌더링하지 않습니다.
}
