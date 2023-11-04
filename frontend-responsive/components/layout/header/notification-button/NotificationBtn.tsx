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

import { Bell } from "lucide-react";
import { Button } from "@/components/shadcn/ui/button";
import { ResponsiveDesign } from "../../../../lib/ResponsiveDesign";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcn/ui/sheet";
import { Separator } from "@/components/shadcn/ui/separator";

// import {
//   getDummyCurrentUserIdSync,
//   getDummyFriendRequestsSync,
//   getDummyMatchRequestsSync,
// } from "@/DummyBackend/outdated/DummyAPI";

import * as dummyAPI from "@/DummyBackend/new/notificationAPI";

import FriendRequestCard from "./request/FriendRequestCard";
import MatchRequestCard from "./request/MatchRequestCard";
import ScrollableContainer from "@/components/container/ScrollableContainer";


export default function NotificationBtn(){
  // TODO: FIX: get MatchRequests and FriendRequests from server ---------------

  const matchRequests = dummyAPI.notification__getMatchRequests();
  const friendRequests = dummyAPI.notification__getFriendRequests();
  const notificationCount = matchRequests.length + friendRequests.length;

  // ---------------------------------------------------------------------------

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
              font-bold leading-none text-red-100 transform translate-x-1/2 
              -translate-y-1/2 bg-red-600 rounded-full "
            >
              {notificationCount}
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
          <Separator className="my-2" />
          <SheetTitle className="text-sm my-2">Friend Requests</SheetTitle>
          <div className="w-full space-y-2">
            {/* friend request list */}
            {friendRequests.map((friendRequest) => (
              <FriendRequestCard
                key={friendRequest.id}
                request={friendRequest}
              />
            ))}
          </div>
          <Separator className="my-2" />
          <SheetTitle className="text-sm my-2">Match Requests</SheetTitle>
          <div className="w-full space-y-2">
            {/* match request list */}
            {matchRequests.map((matchRequest) => (
              <MatchRequestCard key={matchRequest.game_id} request={matchRequest} />
            ))}
          </div>
        </ScrollableContainer>
      </SheetContent>
    </Sheet>
  );
}
