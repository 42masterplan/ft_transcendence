import {Button} from '@/components/shadcn/ui/button';
import {User} from 'lucide-react';
import {useRouter} from 'next/router';

type ProfileButtonProps = {
  userName: string;
};

export default function ProfileButton({userName}: ProfileButtonProps) {
  const router = useRouter();
  return (
    <Button
      size='icon'
      className='bg-custom3 hover:bg-custom3/70 hover:scale-[115%] duration-200'
      onClick={() => {
        router.push(`/userInfo/${userName}`);
      }}
    >
      <User />
    </Button>
  );
}
