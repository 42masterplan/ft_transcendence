import {Button} from '@/components/shadcn/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/shadcn/ui/tooltip';
import {
  Gamepad2,
  Send,
  ShieldAlert,
  ShieldMinus,
  UserPlus,
  UserX
} from 'lucide-react';
import {ReactComponentElement} from 'react';
import {useToast} from '@/components/shadcn/ui/use-toast';
import {ToastAction} from '@/components/shadcn/ui/toast';

function blockButton(userId: string) {
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

function unblockButton(userId: string) {
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
    <Tooltip>
      <TooltipTrigger>
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
      </TooltipTrigger>
      <TooltipContent>Unblock this user</TooltipContent>
    </Tooltip>
  );
}

function followButton(userId: string) {
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
    <Tooltip>
      <TooltipTrigger>
        <Button
          size='icon'
          className='bg-custom3 hover:bg-custom3/70'
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
      </TooltipTrigger>
      <TooltipContent>Send friend request</TooltipContent>
    </Tooltip>
  );
}

function unfollowButton(userId: string) {
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
    <Tooltip>
      <TooltipTrigger>
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
                    const sendUnfriendRequestResult =
                      await sendUnfriendRequest();
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
      </TooltipTrigger>
      <TooltipContent>Unfriend this user</TooltipContent>
    </Tooltip>
  );
}

function matchRequestButton(userId: string) {
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
    <Tooltip>
      <TooltipTrigger>
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
      </TooltipTrigger>
      <TooltipContent>Send match request</TooltipContent>
    </Tooltip>
  );
}

function DMButton(userId: string) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          size='icon'
          className='bg-custom4 hover:bg-custom4/60'
          onClick={async () => {
            // TODO: implement open DM
          }}
        >
          <Send />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Open DM</TooltipContent>
    </Tooltip>
  );
}

interface buttonGroupProps {
  userId: string;
  isFriend: boolean;
  isBlocked: boolean;
}

export default function ButtonGroup(props: buttonGroupProps) {
  const buttonGroup: ReactComponentElement<typeof Button>[] = [];
  if (props.isFriend && !props.isBlocked) {
    // friend
    buttonGroup.push(DMButton(props.userId));
    buttonGroup.push(matchRequestButton(props.userId));
    buttonGroup.push(unfollowButton(props.userId));
    buttonGroup.push(blockButton(props.userId));
  } else if (!props.isFriend && !props.isBlocked) {
    // not friend and not blocked
    buttonGroup.push(followButton(props.userId));
    buttonGroup.push(matchRequestButton(props.userId));
    buttonGroup.push(blockButton(props.userId));
  } else if (props.isBlocked && !props.isFriend) {
    // blocked
    buttonGroup.push(unblockButton(props.userId));
  } else {
    // Error: invalid user status
    console.log('from ButtonGroup: invalid user status');
  }
  return (
    <div className='flex flex-row gap-10'>
      <TooltipProvider>
        {buttonGroup.map(
          (button: ReactComponentElement<typeof Button>, index: number) => (
            <div key={index}>{button}</div>
          )
        )}
      </TooltipProvider>
    </div>
  );
}
