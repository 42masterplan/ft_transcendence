import {Button} from '@/components/shadcn/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/shadcn/ui/tooltip';
import {ShieldAlert} from 'lucide-react';
import {useToast} from '@/components/shadcn/ui/use-toast';
import {ToastAction} from '@/components/shadcn/ui/toast';

export default function BlockButton(userId: string) {
  // function to send block request: TODO: implement this
  const sendBlockRequest = async () => {
    console.log("sendBlockRequest's userId: ", userId);
    // dummy function to test
    const response = await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    ).then(() => false); // change to false to test block request failed
    if (response) {
      console.log('block request sent');
      return true;
    } else {
      console.log('block request failed');
      // TODO: Add actions to manage error.
      return false;
    }
  };

  const {toast} = useToast();
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          variant='destructive'
          size='icon'
          onClick={() => {
            toast({
              title: 'Are you sure you want to block this user?',
              description: 'Unfriend action will be followed.',
              action: (
                <ToastAction
                  altText='Block User'
                  onClick={async () => {
                    const sendBlockRequestResult = await sendBlockRequest();
                    if (sendBlockRequestResult) {
                      toast({
                        title: 'User blocked',
                        description: 'You can unblock this user.'
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
                  Block User
                </ToastAction>
              )
            });
          }}
        >
          <ShieldAlert />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Block this user</TooltipContent>
    </Tooltip>
  );
}
