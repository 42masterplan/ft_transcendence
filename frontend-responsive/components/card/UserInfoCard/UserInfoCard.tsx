/**
 * UserInfoCard
 * This component is a card that displays a user's information.
 * Mandatory props:
 * - name: string
 * - profileImage: string
 * - currentStatus: string
 * Optional props:
 * - introduction: string -> if introduction is not empty, display introduction
 * - side: "left" | "right" -> default is "left"
 */

import * as types from "@/api/type"
import { CardDescription, CardContent } from "@/components/shadcn/ui/card";
import ResponsiveCard from "../ResponsiveCard";
import AvatarWithStatus from "./AvatarWithStatus";

type UserInfoCardProps = {
  name: string;
  profileImage: string;
  currentStatus: string;
  introduction?: string;
  side?: "left" | "right";
};

export default function UserInfoCard({
  name,
  profileImage: profile_image,
  currentStatus: current_status,
  introduction = "",
  side = "left",
}: UserInfoCardProps) {
  
  // If the side is left, the user's name is aligned to the left.
  // If the side is right, the user's name is aligned to the right.
  let userNameAlign: string;
  if (side === "left") {
    userNameAlign = "text-left";
  } else {
    userNameAlign = "text-right";
  }

  const userNameClassName = "text-lg sm:text-xl font-semibold " + userNameAlign;

  return (
    <>
      <ResponsiveCard side={side} bgColor="custom2">
        <AvatarWithStatus status={current_status} avatarImage={profile_image} />
        <CardContent className="flex flex-col px-2 sm:px-3 py-0.5 sm:py-1 gap-1">
          <h1 className={userNameClassName}>{name}</h1>
          {/* if introduction is not empty, display introduction */}
          {introduction !== "" ? (
            <CardDescription>{introduction}</CardDescription>
          ) : null}
        </CardContent>
      </ResponsiveCard>
    </>
  );
}
