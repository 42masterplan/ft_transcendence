import {Button} from '@/components/shadcn/ui/button';
import {TooltipProvider} from '@/components/shadcn/ui/tooltip';
import {ReactComponentElement} from 'react';
import BlockButton from './BlockButton';
import UnblockButton from './UnblockButton';
import FollowButton from './FollowButton';
import UnfollowButton from './UnfollowButton';
import MatchRequestButton from './MatchRequestButton';
import DMButton from './DMButton';

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
    buttonGroup.push(MatchRequestButton(props.userId));
    buttonGroup.push(UnfollowButton(props.userId));
    buttonGroup.push(BlockButton(props.userId));
  } else if (!props.isFriend && !props.isBlocked) {
    // not friend and not blocked
    buttonGroup.push(FollowButton(props.userId));
    buttonGroup.push(MatchRequestButton(props.userId));
    buttonGroup.push(BlockButton(props.userId));
  } else if (props.isBlocked && !props.isFriend) {
    // blocked
    buttonGroup.push(UnblockButton(props.userId));
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
