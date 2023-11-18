import {Button} from '@/components/shadcn/ui/button';
import {UserX} from 'lucide-react';
import {useToast} from '@/components/shadcn/ui/use-toast';
import {ToastAction} from '@/components/shadcn/ui/toast';

export default function UnfollowButton(userId: string) {
  // function to send unfriend request: TODO: implement this
  const sendUnfriendRequest = async () => {
    console.log("sendUnfriendRequest's userId: ", userId);
    // dummy function to test
    const response = await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    ).then(() => false); // change to false to test unfriend request failed
    if (response) {
      console.log('unfriend request sent');
      return true;
    } else {
      console.log('unfriend request failed');
      return false;
    }
  };
  const {toast} = useToast();
  return (
    <Button
      size='icon'
      className='bg-custom2/40 hover:bg-custom2/60'
      onClick={() => {
        toast({
          title: 'Are you sure you want to unfriend this user?',
          action: (
            <ToastAction
              altText='Unfriend User'
              onClick={async () => {
                const sendUnfriendRequestResult = await sendUnfriendRequest();
                if (sendUnfriendRequestResult) {
                  toast({
                    title: 'User unfriended'
                  });
                } else {
                  toast({
                    title: 'Block user failed',
                    description: 'Please try again later.',
                    variant: 'destructive'
                  });
                }
              }}
            >
              Unfriend User
            </ToastAction>
          )
        });
      }}
    >
      <UserX />
    </Button>
  );
}
