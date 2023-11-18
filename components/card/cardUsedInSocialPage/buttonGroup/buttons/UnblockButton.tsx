import {Button} from '@/components/shadcn/ui/button';
import {ShieldMinus} from 'lucide-react';
import {useToast} from '@/components/shadcn/ui/use-toast';

export default function UnblockButton(userId: string) {
  // function to send unblock request: TODO: implement this
  const sendUnblockRequest = async () => {
    console.log("sendUnblockRequest's userId: ", userId);
    // dummy function to test
    const response = await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    ).then(() => false); // change to false to test unblock request failed
    if (response) {
      console.log('unblock request sent');
      return true;
    } else {
      // TODO: Add actions to manage error.
      console.log('unblock request failed');
    }
  };

  const {toast} = useToast();
  return (
    <Button
      size='icon'
      className='bg-custom1/40 hover:bg-custom1/60'
      onClick={async () => {
        const sendUnblockRequestResult = await sendUnblockRequest();
        if (sendUnblockRequestResult) {
          toast({
            title: 'User unblocked',
            description: 'You can block this user.'
          });
        } else {
          toast({
            title: 'Unblock user failed',
            description: 'Please try again later.',
            variant: 'destructive'
          });
        }
      }}
    >
      <ShieldMinus />
    </Button>
  );
}
