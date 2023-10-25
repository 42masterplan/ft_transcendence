import { Bell } from "lucide-react";

import { Button } from "@/components/shadcn/ui/button";
import { type } from "os";
import React from "react";
import { LayoutResponsiveDesign } from "../../LayoutResponsiveDesign";

import { gameRequests, friendRequests } from "@/public/APIData";  // TODO: change it to actual data from API

import { Input } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcn/ui/sheet";

import MatchRequestCard from "./MatchRequestCard";

export default function NotificationBtn() {

  function getGameRequests() {
    // TODO: replace with actual data from API
    return gameRequests;
  }

  function getFriendRequests() {
    // TODO: replace with actual data from API
    return friendRequests;
  }

  let notificationCount = gameRequests.length + friendRequests.length;

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
        <SheetTitle className="text-sm">Friend Requests</SheetTitle>
        {gameRequests.map((gameRequest) => (
          <MatchRequestCard
            key={gameRequest.id}
            gameRequest={gameRequest}
          ></MatchRequestCard>
        ))}
        <SheetTitle className="text-sm">Match Requests</SheetTitle>
        {friendRequests.map((friendRequest) => (
          <MatchRequestCard
            key={friendRequest.id}
            gameRequest={friendRequest}
          ></MatchRequestCard>
        ))}

        {/* <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose> */}
      </SheetContent>
    </Sheet>
  );
}
