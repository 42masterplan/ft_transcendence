import Link from 'next/link';
import {Button} from '@/components/shadcn/ui/button';

interface LinkBtnProps {
  link: string;
  children: React.ReactNode;
  className?: string;
}

export default function LinkBtn({
  link,
  className = '',
  children
}: LinkBtnProps) {
  return (
    <Link href={link}>
      <Button variant='default' size='lg' className={className}>
        {children}
      </Button>
    </Link>
  );
}
