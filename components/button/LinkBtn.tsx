import Link from 'next/link';
import {Button, ButtonProps} from '@/components/shadcn/ui/button';

interface LinkBtnProps {
  link: string;
  children: React.ReactNode;
  className?: string;
  props: ButtonProps;
}

export default function LinkBtn({
  link,
  className = '',
  children,
  props
}: LinkBtnProps) {
  return (
    <Link href={link}>
      <Button variant='default' size='lg' className={className} {...props}>
        {children}
      </Button>
    </Link>
  );
}
