import {Button} from '@/components/shadcn/ui/button';
import {Send} from 'lucide-react';
import {useRouter} from 'next/router';

type DMButtonProps = {
  userName: string;
};

export default function DMButton({userName}: DMButtonProps) {
  const router = useRouter();
  return (
    <Button
      size='icon'
      className='bg-custom4 hover:bg-custom4/60 hover:scale-[115%] duration-200'
      onClick={() => {
        router.push(`/dm/${userName}`);
      }}
    >
      <Send />
    </Button>
  );
}
