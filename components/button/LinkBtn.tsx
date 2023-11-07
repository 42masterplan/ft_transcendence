import Link from 'next/link';
import {Button} from '@/components/shadcn/ui/button';

interface LinkBtnProps {
  link: string;
  children: React.ReactNode;
  className?: string;
  disabled: boolean;
}

export default function LinkBtn({
  link,
  className = '',
  children,
  disabled = false
}: LinkBtnProps) {
  if (disabled == true) return <></>;
  return (
    <Link href={link}>
      <Button
        variant='default'
        size='lg'
        className={className}
        disabled={disabled}
      >
        {children}
      </Button>
    </Link>
  );
}
