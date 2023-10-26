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

import { MatchRequest, FriendRequest } from "@/api/type";
import { Bell } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import { LayoutResponsiveDesign } from "../../LayoutResponsiveDesign";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcn/ui/sheet";
import { Separator } from "@/components/shadcn/ui/separator";
import FriendRequestCard from "./FriendRequestCard";
import MatchRequestCard from "./MatchRequestCard";
import { useEffect, useState } from "react";
import {
  getDummyCurrentUserId,
  getDummyFriendRequestList,
  getDummyMatchRequestList,
} from "@/api/DummyData";

type NotificationBtnProps = {
  notificationCount: number;
};

export default function NotificationBtn({
  notificationCount,
}: NotificationBtnProps) {
  const [friendRequestList, setFriendRequestList] = useState<FriendRequest[]>(
    []
  );
  const [matchRequestList, setMatchRequestList] = useState<MatchRequest[]>([]);
  const [isFriedRequestListLoading, setIsFriendRequestListLoading] =
    useState(true);
  const [isMatchRequestListLoading, setIsMatchRequestListLoading] =
    useState(true);

  async function getFriendRequestList() {
    const currentUserId = await getDummyCurrentUserId();
    const friendRequestList = await getDummyFriendRequestList(currentUserId);
    setFriendRequestList(friendRequestList);
  }

  async function getMatchRequestList() {
    const currentUserId = await getDummyCurrentUserId();
    const matchRequestList = await getDummyMatchRequestList(currentUserId);
    setMatchRequestList(matchRequestList);
  }

  useEffect(() => {
    getFriendRequestList();
    setIsFriendRequestListLoading(false);
  }, [isFriedRequestListLoading]);

  useEffect(() => {
    getMatchRequestList();
    setIsMatchRequestListLoading(false);
  }, [isMatchRequestListLoading]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* Button for Notification with icon and count -------------------- */}
        <Button
          variant="iconBtn"
          size="headerBtn"
          className="flex relative flex-row justify-center items-center"
        >
          {/* This div is for Notification Count -> if notification count is 0 -> do not display */}
          {notificationCount === 0 ? null : (
            <span
              className="absolute 
              top-1 right-1 sm:top-1 sm:right-1.5
              inline-flex items-center justify-center 
              px-1 py-1  sm:px-1.5 sm:py-0.5
              text-[0px] sm:text-xs 
              font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full "
            >
              {notificationCount}
            </span>
          )}
          <Bell className={LayoutResponsiveDesign.iconSize} />
        </Button>
        {/* Button for Notification with icon and count -------------------- */}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <Separator className="my-4" />
        <SheetTitle className="text-sm">Friend Requests</SheetTitle>
        {/* If Friend Request is loading, show loading screen. Else, render friend requests */}
        {isFriedRequestListLoading ? (
          <div>loading...</div> // TODO: change to loading object
        ) : (
          friendRequestList.map((friendRequest) => (
            <FriendRequestCard
              key={friendRequest.id}
              friendRequest={friendRequest}
            />
          ))
        )}
        <Separator className="my-4" />
        <SheetTitle className="text-sm">Match Requests</SheetTitle>
        {/* If Game Request is loading, show loading screen. Else, render game requests */}
        {isMatchRequestListLoading ? (
          <div>loading...</div> // TODO: change to loading object
        ) : (
          matchRequestList.map((matchRequest) => (
            <MatchRequestCard
              key={matchRequest.id}
              matchRequest={matchRequest}
            />
          ))
        )}
      </SheetContent>
    </Sheet>
  );
}
