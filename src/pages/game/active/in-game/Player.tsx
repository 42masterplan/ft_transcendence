import {useEffect, useRef} from 'react';

interface PlayerProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  dx: number;
  c: CanvasRenderingContext2D;
}

export default function Player({
  x,
  y,
  width = 150,
  height = 15,
  color = 'rgba(217, 217, 217, 1)',
  dx = 0,
  c
}: PlayerProps) {
  // 참조를 사용하여 값들을 저장합니다.
  const x_ = useRef(x);
  const y_ = useRef(y);
  const width_ = useRef(width);
  const height_ = useRef(height);
  const color_ = useRef(color);
  const dx_ = useRef(dx);

  // 이 함수는 캔버스에 플레이어를 그리는 역할을 합니다.
  const draw = () => {
    c.beginPath();
    c.rect(x_.current, y_.current, width_.current, height_.current);
    c.fillStyle = color_.current;
    c.fill();
  };

  useEffect(() => {
    draw(); // 컴포넌트가 마운트되면, 혹은 업데이트될 때마다 그리기 함수를 호출합니다.
  }, [draw]); // 의존성 배열에 draw를 넣음으로써 draw 함수 내부에서 참조하는 값이 변경될 때만 리렌더링이 발생하도록 합니다.

  return null; // 이 컴포넌트는 실제 DOM 요소를 렌더링하지 않습니다.
}
