import Link from 'next/link';
import {Button} from '../shadcn/button';

interface LinkBtnProps {
  link: string;
  name: string;
}

export default function LinkBtn({link, name}: LinkBtnProps) {
  return (
    <Link href={link}>
      <Button variant='default' size='lg'>
        {name}
      </Button>
    </Link>
  );
}
