import Link from 'next/link';
import {Button} from '../shadcn/button';
import Image from 'next/image';

interface NavBtnProps {
  path: string;
  file: string;
  width: number;
  height: number;
}

export default function NavBtn({path, file, width, height}: NavBtnProps) {
  return (
    <Button asChild variant='navBtn' size='navBtn'>
      <Link href={path}>
        <Image
          src={`/icon/${file}.svg`}
          alt={file}
          width={width}
          height={height}
        />
      </Link>
    </Button>
  );
}
