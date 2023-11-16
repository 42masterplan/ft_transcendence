import {Button} from '@/components/shadcn/ui/button';
import {
  Gamepad2,
  Send,
  ShieldAlert,
  ShieldMinus,
  UserPlus,
  UserX
} from 'lucide-react';
import {ReactComponentElement} from 'react';

function blockButton(userId: string) {
  return (
    <Button variant='destructive' size='icon'>
      <ShieldAlert />
    </Button>
  );
}

function unblockButton(userId: string) {
  return (
    <Button size='icon' className='bg-custom1/40 hover:bg-custom1/60'>
      <ShieldMinus />
    </Button>
  );
}

function followButton(userId: string) {
  return (
    <Button size='icon' className='bg-custom3 hover:bg-custom3/70'>
      <UserPlus />
    </Button>
  );
}

function unfollowButton(userId: string) {
  return (
    <Button size='icon' className='bg-custom2/40 hover:bg-custom2/60'>
      <UserX />
    </Button>
  );
}

function matchRequestButton(userId: string) {
  return (
    <Button size='icon' variant='outline'>
      <Gamepad2 />
    </Button>
  );
}

function DMButton(userId: string) {
  return (
    <Button size='icon' className='bg-custom4 hover:bg-custom4/60'>
      <Send />
    </Button>
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
      {buttonGroup.map(
        (button: ReactComponentElement<typeof Button>, index: number) => (
          <div key={index}>{button}</div>
        )
      )}
    </div>
  );
}
