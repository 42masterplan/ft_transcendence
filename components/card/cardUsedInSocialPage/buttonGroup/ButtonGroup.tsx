import {Button} from '@/components/shadcn/ui/button';
import {ReactComponentElement} from 'react';
import BlockButton from './buttons/BlockButton';
import UnblockButton from './buttons/UnblockButton';
import FollowButton from './buttons/FollowButton';
import UnfollowButton from './buttons/UnfollowButton';
import MatchRequestButton from './buttons/MatchRequestButton';
import DMButton from './buttons/DMButton';

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
      {buttonGroup.map(
        (button: ReactComponentElement<typeof Button>, index: number) => (
          <div key={index}>{button}</div>
        )
      )}
    </div>
  );
}
