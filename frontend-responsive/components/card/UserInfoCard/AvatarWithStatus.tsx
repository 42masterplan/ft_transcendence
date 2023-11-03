/**
 * This component will be used to display the user's avatar and status.
 * Status is displayed as a small circle on the bottom right of the avatar.
 */

import { type } from "os";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/ui/avatar";

import { userStatus } from "@/lib/type";
import { sizeType } from "@/lib/ResponsiveDesign";

type AvatarWithStatusProps = {
  image: string;
  size: sizeType;
  status?: userStatus | null;
  showStatus?: boolean;
};


export default function AvatarWithStatus({
  image: avatarImage,
  size: avatarSize,
  showStatus = true,
  status = null,
}: AvatarWithStatusProps) {
  const altImage = "@/public/avatars/picapica.jpg";

  let statusColor: string;
  switch (status) {
    case "Online":
      statusColor = "bg-green-500";
      break;
    case "Offline":
      statusColor = "bg-gray-500";
      break;
    case "InGame":
      statusColor = "bg-blue-500";
      break;
    case "AFK":
      statusColor = "bg-yellow-500";
      break;
    default:
      statusColor = "bg-red-500";
      break;
  }

  let avatarSizeStyle: string;
  let statusSizeStyle: string;
  let statusPositionStyle: string;
  switch (avatarSize) {
    case "sm":
      avatarSizeStyle = "h-10 w-10 sm:h-16 sm:w-16";
      statusSizeStyle = "p-1 sm:p-1.5";
      statusPositionStyle = "top-0.5 right-0.5 sm:top-1 sm:right-1"
      break;
    case "md":
      avatarSizeStyle = "h-16 w-16 sm:h-24 sm:w-24";
      statusSizeStyle = "p-1.5 sm:p-2";
      statusPositionStyle = "top-1 right-1 sm:top-1.5 sm:right-1.5"
      break;
    case "lg":
      avatarSizeStyle = "h-32 w-32 sm:h-40 sm:w-40";
      statusSizeStyle = "p-2 sm:p-2.5";
      statusPositionStyle = "top-3 right-3 sm:top-3.5 sm:right-3.5"
      break;
    default:
      // small size
      avatarSizeStyle = "h-10 w-10 sm:h-16 sm:w-16";
      statusSizeStyle = "p-1 sm:p-1.5";
      statusPositionStyle = "top-0.5 right-0.5 sm:top-1 sm:right-1"
      break;
  }

  const statusStyle = `absolute ${statusSizeStyle} ${statusPositionStyle} z-10 rounded-full ${statusColor}`;

  return (
    <div className="relative flex justify-center items-center h-min">
      {showStatus ? <div className={statusStyle}></div> : null}
      <Avatar className={avatarSizeStyle}>
        <AvatarImage src={avatarImage} alt={altImage} />
        <AvatarFallback>😜</AvatarFallback>
      </Avatar>
    </div>
  );
}
