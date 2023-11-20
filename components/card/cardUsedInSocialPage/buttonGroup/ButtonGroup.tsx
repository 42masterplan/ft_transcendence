import {Button} from '@/components/shadcn/ui/button';
import {ReactComponentElement} from 'react';
import BlockButton from './buttons/BlockButton';
import UnblockButton from './buttons/UnblockButton';
import FollowButton from './buttons/FollowButton';
import UnfollowButton from './buttons/UnfollowButton';
import MatchRequestButton from './buttons/MatchRequestButton';
import DMButton from './buttons/DMButton';

type buttonGroupProps = {
  userId: string;
  isFriend: boolean;
  isBlocked: boolean;
};

export default function ButtonGroup({
  userId,
  isFriend,
  isBlocked
}: buttonGroupProps) {
  if (isFriend && !isBlocked) {
    // friend: DM, unfollow, match request, block
    return (
      <>
        <DMButton userId={userId} />
        <UnfollowButton userId={userId} />
        <MatchRequestButton userId={userId} />
        <BlockButton userId={userId} />
      </>
    );
  } else if (!isFriend && !isBlocked) {
    // not friend and not blocked: follow, match request, block
    return (
      <>
        <FollowButton userId={userId} />
        <MatchRequestButton userId={userId} />
        <BlockButton userId={userId} />
      </>
    );
  } else if (isBlocked && !isFriend) {
    // blocked: unblock
    return <UnblockButton userId={userId} />;
  } else {
    // Error: invalid user status
    console.log('from ButtonGroup: invalid user status');
  }
}
