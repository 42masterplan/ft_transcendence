import Link from 'next/link';
import {Button} from '../shadcn/button';
import Image from 'next/image';
import {useRouter} from 'next/router';

interface NavBtnProps {
  path: string;
  file: string;
  width: number;
  height: number;
}

export default function NavBtn({path, file, width, height}: NavBtnProps) {
  const router = useRouter();
  const currentPath = router.pathname;
  if (currentPath === path) {
    return (
      <Button asChild variant='navBtnClicked' size='navBtn'>
        <div>
          <Image
            src={`/icon/${file}.svg`}
            alt={file}
            width={width}
            height={height}
          />
        </div>
      </Button>
    );
  } else {
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
}
