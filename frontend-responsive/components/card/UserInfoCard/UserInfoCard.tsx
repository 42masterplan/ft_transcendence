/**
 * UserInfoCard
 * This component is a card that displays a user's information.
 */

import { CardDescription, CardContent } from "@/components/shadcn/ui/card";

import ResponsiveCard from "../ResponsiveCard";

import AvatarWithStatus from "./AvatarWithStatus";

type UserInfoCardProps = {
  name: string;
  profile_image: string;
  current_status: string;
  introduction?: string;
  side?: "left" | "right";
};

export default function UserInfoCard({
  name,
  profile_image,
  current_status,
  introduction = "",
  side = "left",
}: UserInfoCardProps) {
  // TEST: Print all props
  console.log(
    "UserInfoCard props: ",
    name,
    profile_image,
    current_status,
    introduction,
    side
  );

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
      <ResponsiveCard side={side} color="custom2">
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
