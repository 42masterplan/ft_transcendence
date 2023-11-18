import {Button} from '@/components/shadcn/ui/button';
import {Gamepad2} from 'lucide-react';
import {useToast} from '@/components/shadcn/ui/use-toast';

export default function MatchRequestButton(userId: string) {
  // function to send match request: TODO: implement this
  const sendMatchRequest = async () => {
    console.log("sendMatchRequest's userId: ", userId);
    // dummy function to test
    const response = await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    ).then(() => false); // change to false to test match request failed
    if (response) {
      console.log('match request sent');
      return true;
    } else {
      console.log('match request failed');
      return false;
    }
  };

  const {toast} = useToast();
  return (
    <Button
      size='icon'
      variant='outline'
      onClick={async () => {
        const sendMatchRequestResult = await sendMatchRequest();
        if (sendMatchRequestResult) {
          toast({
            title: 'Match request sent'
          });
          // IMPORTANT: TODO: change page to waiting page to prevent multiple match request
        } else {
          // TODO: Add actions to manage error.
          toast({
            title: 'Match request failed',
            description: 'Please try again later.',
            variant: 'destructive'
          });
        }
      }}
    >
      <Gamepad2 />
    </Button>
  );
}
