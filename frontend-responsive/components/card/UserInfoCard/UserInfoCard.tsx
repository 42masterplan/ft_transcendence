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

import { CardDescription, CardContent } from "@/components/shadcn/ui/card";
import ResponsiveContainer from "../../container/ResponsiveContainer";
import AvatarWithStatus from "./AvatarWithStatus";
import { UserInfo } from "@/lib/type";

type UserInfoCardProps = {
  userInfo: UserInfo;
  side?: "left" | "right";
  bgColor?: string;
  printIntro?: boolean;
  showStatus?: boolean;
};

export default function UserInfoCard({
  userInfo,
  side = "left",
  bgColor = "",
  printIntro = false,
  showStatus = true,
}: UserInfoCardProps) {
  let userNameAlign: string;
  if (side === "left") {
    // If the side is left, the user's name is aligned to the left.
    userNameAlign = "text-left";
  } else {
    // If the side is right, the user's name is aligned to the right.
    userNameAlign = "text-right";
  }

  const userNameClassName = "text-lg sm:text-xl font-semibold " + userNameAlign;

  return (
    <>
      <ResponsiveContainer bgColor={bgColor}>
        <AvatarWithStatus
          status={userInfo.currentStatus}
          avatarImage={userInfo.profileImage}
        />
        <ResponsiveContainer className="px-2 sm:px-3 py-0.5 sm:py-1 gap-1">
          <h1 className={userNameClassName}>{userInfo.name}</h1>
          {printIntro ? (
            <CardDescription>{userInfo.introduction}</CardDescription>
          ) : null}
        </ResponsiveContainer>
      </ResponsiveContainer>
    </>
  );
}
