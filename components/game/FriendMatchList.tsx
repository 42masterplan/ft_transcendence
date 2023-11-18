import ResponsiveContainer from '@/components/container/ResponsiveContainer';
import ScrollableContainer from '@/components/container/ScrollableContainer';
import {Button} from '@/components/shadcn/ui/button';
import {Input} from '@/components/shadcn/ui/input';
import {Switch} from '@/components/shadcn/ui/switch';
import {Search} from 'lucide-react';
import * as API from '@/DummyBackend/socialAPI';
import SocialCard from '@/components/card/cardUsedInSocialPage/SocialCard';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/shadcn/ui/accordion';
interface SocialPageNavBarProps {
  className?: string;
}

function SocialPageNavBar({className}: SocialPageNavBarProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row justify-between sm:items-center gap-5 py-3 ${className}`}
    >
      <div className='flex flex-row gap-3'>
        <Switch className='' />
        <p>Friend / All users</p>
      </div>
      <div className='flex items-center w-full max-w-sm gap-3'>
        <Input type='text' placeholder='user name' className='h-11' />
        <Button variant='iconBtn' size='icon' className='p-2'>
          <Search />
        </Button>
      </div>
    </div>
  );
}

interface ButtonGroupProps {
  userId: string;
  isFriend: boolean;
  isBlocked: boolean;
}

// BlockedUserCard has unblock-button
// FriendCard has match-request-button, unfollow-button and block-button
// StrangerCard has follow-button and block-button

function ButtonGroup({userId, isFriend, isBlocked}: ButtonGroupProps) {
  if (isFriend && !isBlocked) {
    // FriendCard
    return (
      <div className='flex flex-row gap-4 justify-center items-center'>
        <Button variant='default' size='sm'>
          Match request
        </Button>
        <Button variant='secondary' size='sm'>
          Unfollow
        </Button>
        <Button variant='destructive' size='sm'>
          Block
        </Button>
      </div>
    );
  } else if (isBlocked && !isFriend) {
    // BlockedUserCard
    return (
      <div className='flex flex-row gap-4 justify-center items-center'>
        <Button variant='secondary' size='sm'>
          Unblock
        </Button>
      </div>
    );
  } else if (!isFriend && !isBlocked) {
    // StrangerCard
    return (
      <div className='flex flex-row gap-4 justify-center items-center'>
        <Button variant='default' size='sm'>
          Follow
        </Button>
        <Button variant='destructive' size='sm'>
          Block
        </Button>
      </div>
    );
  } else {
    // throw new Error("invalid user status");
    return (
      <>
        <p>
          {' '}
          😱 This should not happen - ERROR: Followed and Blocked at the same
          time{' '}
        </p>
      </>
    );
  }
}

export default function FriendMatchList() {
  const users = API.social__getUsers();
  // TODO: modify user list depends on the switch
  return (
    <ResponsiveContainer className='flex-col w-full h-[430px]'>
      <SocialPageNavBar className=' px-5' />
      <ScrollableContainer>
        <div className='flex flex-col px-5 py-2'>
          <Accordion
            type='single'
            collapsible
            className='flex flex-col w-full gap-3'
          >
            {users.map((user) => (
              <ResponsiveContainer className='w-fit hover:scale-[1.05] transition ease-in-out border-custom2 border-2 rounded-3xl pr-5 pl-3'>
                <AccordionItem value={user.id}>
                  <AccordionTrigger>
                    <SocialCard
                      key={user.id}
                      id={user.id}
                      profileImage={user.profileImage}
                      name={user.name}
                      currentStatus={user.currentStatus}
                      introduction={user.introduction}
                      isFriend={user.isFriend}
                      isBlocked={user.isBlocked}
                    />
                  </AccordionTrigger>
                  <AccordionContent>
                    <ButtonGroup
                      userId={user.id}
                      isFriend={user.isFriend}
                      isBlocked={user.isBlocked}
                    />
                  </AccordionContent>
                </AccordionItem>
              </ResponsiveContainer>
            ))}
          </Accordion>
        </div>
      </ScrollableContainer>
    </ResponsiveContainer>
  );
}
