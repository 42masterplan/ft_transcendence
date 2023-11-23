import {Button} from '@/components/shadcn/ui/button';
import {UserPlus} from 'lucide-react';
import {useToast} from '@/components/shadcn/ui/use-toast';

type FollowButtonProps = {
  userId: string;
};

export default function FollowButton({userId}: FollowButtonProps) {
  // function to send friend request: TODO: implement this
  const sendFriendRequest = async () => {
    console.log("sendFriendRequest's userId: ", userId);
    // dummy function to test
    const response = await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    ).then(() => false); // change to false to test friend request failed
    if (response) {
      console.log('friend request sent');
      return true;
    } else {
      console.log('friend request failed');
      return false;
    }
  };
  const {toast} = useToast();
  return (
    <Button
      size='icon'
      className='bg-custom3 hover:bg-custom3/70 hover:scale-[115%] duration-200'
      onClick={async () => {
        const sendFriendRequestResult = await sendFriendRequest();
        if (sendFriendRequestResult) {
          toast({
            title: 'Friend request sent',
            description: 'You can unfriend this user.'
          });
        } else {
          // TODO: Add actions to manage error.
          toast({
            title: 'Friend request failed',
            description: 'Please try again later.',
            variant: 'destructive'
          });
        }
      }}
    >
      <UserPlus />
    </Button>
  );
}
