import Link from 'next/link';
import {Button} from '@/components/shadcn/ui/button';

interface LinkBtnProps {
  link: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function LinkBtn({
  link,
  className = '',
  children,
  disabled = false,
  onClick = () => {}
}: LinkBtnProps) {
  if (disabled == true) return <></>;
  return (
    <Link href={link}>
      <Button
        variant='default'
        size='lg'
        className={className}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </Button>
    </Link>
  );
}
