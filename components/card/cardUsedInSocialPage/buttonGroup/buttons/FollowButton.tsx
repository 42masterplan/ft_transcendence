import {Button} from '@/components/shadcn/ui/button';
import {UserPlus} from 'lucide-react';
import useAxios from '@/hooks/useAxios';

type FollowButtonProps = {
  userId: string;
};

export default function FollowButton({userId}: FollowButtonProps) {
  const {fetchData} = useAxios();

  return (
    <Button
      size='icon'
      className='bg-custom3 hover:bg-custom3/70 hover:scale-[115%] duration-200'
      onClick={() => {
        fetchData({
          url: '/users/friends/request',
          method: 'post',
          body: {
            friendId: userId
          },
          successTitle: 'Friend request sent',
          successDescription: 'Wait for them to accept your friend request.',
          errorTitle: 'Friend request failed',
          errorDescription: 'Please try again later.'
        });
      }}
    >
      <UserPlus />
    </Button>
  );
}
