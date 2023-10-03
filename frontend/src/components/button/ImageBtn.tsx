import {Button} from '../shadcn/button';
import Image from 'next/image';

interface ImageBtnProps {
  btn_type: 'HeaderBtn';
  file: string;
  width: number;
  height: number;
}
export default function ImageBtn({
  btn_type,
  file,
  width,
  height
}: ImageBtnProps) {
  return (
    <Button variant={btn_type} size={btn_type}>
      <Image
        src={`/icon/${file}.svg`}
        alt={file}
        width={width}
        height={height}
      />
    </Button>
  );
}
