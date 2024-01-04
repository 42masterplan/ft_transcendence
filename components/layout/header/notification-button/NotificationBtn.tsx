/**
 * Notification Button
 * What does this button do?
 * - This button will show the numbers of notifications that the user has.
 * - When user clicks this button, it will show the list of notifications
 *
 * How does this button work?
 * - Before the button is clicked, it will show the number of notifications that the user has.
 * - When the button is clicked, it will show the list of notifications.
 *  - first it will show the list of friend requests
 *  - then it will show the list of match requests
 *
 * How it will be implemented?
 * - When this button starts to render, it will ask server for the notification count and pass it to the component.
 *  - Before the data is fetched, it will not show the notification count.
 *  - After the data is fetched, it will show the notification count.
 *   - If the notification count is 0, it will not show the notification count.
 *
 * - When the button is clicked, it will ask server for the list of notifications(friend request, match request)
 *  - Before the data is fetched, it will show the loading screen.
 *  - After the data is fetched, it will show the list of notifications.
 *   - If there is no notification, it will show the message that there is no notification.
 */

import {Bell} from 'lucide-react';
import {Button} from '@/components/shadcn/ui/button';
import {ResponsiveDesign} from '@/lib/ResponsiveDesign';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/shadcn/ui/sheet';
import {Separator} from '@/components/shadcn/ui/separator';
import FriendRequestCard from './request/FriendRequestCard';
import MatchRequestCard from './request/MatchRequestCard';
import ScrollableContainer from '@/components/container/ScrollableContainer';
import useSocket from '@/hooks/useSocket';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {gameRequest, friendRequest} from '@/types/notification';
import useAxios from '@/hooks/useAxios';
import {useToast} from '@/components/shadcn/ui/use-toast';

interface gameStartState {
  matchId: string;
  aName: string;
  aProfileImage: string;
  bName: string;
  bProfileImage: string;
  side: string;
  gameMode: string;
  theme: string;
}

export default function NotificationBtn() {
  const router = useRouter();
  const [socket, disconnect] = useSocket('alarm', {autoConnect: false});
  const [matchRequests, setMatchRequests] = useState<gameRequest[]>([]);
  const [friendRequests, setFriendRequests] = useState<friendRequest[]>([]);
  const [notificationCount, setNotificationCount] = useState(
    matchRequests.length + friendRequests.length
  );
  const {fetchData, response, isSuccess} = useAxios();
  const {toast} = useToast();
  useEffect(() => {
    fetchData({
      method: 'get',
      url: '/users/friends/request',
      disableSuccessToast: true
    });
    socket.on('gameRequest', (state: gameRequest) => {
      setMatchRequests((prev) => [...prev, state]);
      setNotificationCount((prev) => prev + 1);
    });
    socket.on('error', (error) => {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive'
      });
      disconnect();
      router.push('/welcome/double-tab');
    });
    socket.on('normalGameCancel', (matchId: string) => {
      setMatchRequests((prev) =>
        prev.filter((match) => {
          match.matchId != matchId;
        })
      );
      setNotificationCount((prev) => prev - 1);
    });
    socket.on(
      'gameStart',
      ({
        matchId,
        aName,
        aProfileImage,
        bName,
        bProfileImage,
        side,
        gameMode,
        theme
      }: gameStartState) => {
        router.push({
          pathname: '/game/in-game',
          query: {
            matchId,
            aName,
            aProfileImage,
            bName,
            bProfileImage,
            side,
            gameMode,
            theme
          }
        });
      }
    );
    socket.on('newFriendRequest', () => {
      console.log('new friend request');
      fetchData({
        method: 'get',
        url: '/users/friends/request',
        disableSuccessToast: true
      });
      setNotificationCount((prev) => prev + 1);
    });
    socket.emit('isDoubleLogin', (isDoubleLogin: boolean) => {
      if (isDoubleLogin) {
        toast({
          title: 'Error',
          description: 'You are logged in from another device.',
          variant: 'destructive'
        });
        disconnect();
        router.push('/welcome/double-tab');
      }
    });
    return () => {
      socket.off('gameRequest');
      socket.off('gameStart');
      socket.off('error');
      socket.off('normalGameCancel');
      socket.off('newFriendRequest');
    };
  }, [socket]);
  useEffect(() => {
    socket.emit('isDoubleLogin', (isDoubleLogin: boolean) => {
      if (isDoubleLogin) {
        toast({
          title: 'Error',
          description: 'You are logged in from another device.',
          variant: 'destructive'
        });
        disconnect();
        router.push('/welcome/double-tab');
      }
    });
  }, [router.pathname]);
  useEffect(() => {
    if (isSuccess) {
      setFriendRequests(response);
      setNotificationCount((prev) => prev + 1);
    }
  }, [isSuccess]);
  let buttonStyle = 'flex relative flex-row justify-center items-center';
  if (matchRequests.length !== 0 || friendRequests.length !== 0) {
    buttonStyle += ' animate-bounce';
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* Button for Notification with icon and count -------------------- */}
        <Button
          variant='iconBtn'
          size='headerBtn'
          className={buttonStyle}
          onClick={() =>
            fetchData({
              method: 'get',
              url: '/users/friends/request',
              disableSuccessToast: true
            })
          }
        >
          {/* This div is for match request -> if notification count is 0 -> do not display */}
          {matchRequests.length === 0 ? null : (
            <span
              className='absolute 
              top-1 right-1 sm:top-1 sm:right-1.5
              inline-flex items-center justify-center 
              px-1 py-1  sm:px-1.5 sm:py-0.5
              text-[0px] sm:text-xs 
              font-bold leading-none text-red-100 transform translate-x-1/2 
              -translate-y-1/2 bg-red-600 rounded-full animate-pulse'
            >
              {matchRequests.length}
            </span>
          )}
          {/* This div is for Notification Count -> if notification count is 0 -> do not display */}
          {friendRequests.length === 0 ? null : (
            <span
              className='absolute 
              top-1 left-1 sm:top-1 sm:left-1.5
              inline-flex items-center justify-center 
              px-1 py-1  sm:px-1.5 sm:py-0.5
              text-[0px] sm:text-xs 
              font-bold leading-none text-red-100 transform -translate-x-1/2 
              -translate-y-1/2 bg-indigo-600 rounded-full animate-pulse'
            >
              {friendRequests.length}
            </span>
          )}
          <Bell className={ResponsiveDesign.iconSize} />
        </Button>
        {/* Button for Notification with icon and count -------------------- */}
      </SheetTrigger>
      <SheetContent>
        <ScrollableContainer>
          <SheetHeader>
            <SheetTitle>Notifications</SheetTitle>
          </SheetHeader>
          <Separator className='my-2' />
          <SheetTitle className='text-sm my-2'>Friend Requests</SheetTitle>
          <div className='w-full space-y-2'>
            {/* friend request list */}
            {friendRequests.map((friendRequest) => (
              <FriendRequestCard
                key={friendRequest.id}
                request={friendRequest}
                fetchList={() => {
                  fetchData({
                    method: 'get',
                    url: '/users/friends/request',
                    disableSuccessToast: true
                  });
                }}
              />
            ))}
          </div>
          <Separator className='my-2' />
          <SheetTitle className='text-sm my-2'>Match Requests</SheetTitle>
          <div className='w-full space-y-2'>
            {/* match request list */}
            {matchRequests.map((matchRequest) => (
              <MatchRequestCard
                key={matchRequest.matchId}
                request={matchRequest}
                setMatchRequests={setMatchRequests}
                setNotificationCount={setNotificationCount}
              />
            ))}
          </div>
        </ScrollableContainer>
      </SheetContent>
    </Sheet>
  );
}
