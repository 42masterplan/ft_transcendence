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

type AvatarWithStatusProps = {
  status: userStatus;
  avatarImage: string;
  showStatus?: boolean;
};

export default function AvatarWithStatus({
  status,
  avatarImage,
  showStatus = true,
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
      statusColor = "bg-yellow-500";
      break;
  }

  const statusStyle = `absolute top-0.5 right-0.5 sm:top-1 sm:right-1 px-1 py-1 sm:px-1.5 sm:py-1.5 z-10 rounded-full ${statusColor}`;

  return (
    <div className="relative flex justify-center items-center h-min">
      {showStatus ? <div className={statusStyle}></div> : null}
      <Avatar className="h-10 w-10 sm:h-16 sm:w-16">
        <AvatarImage src={avatarImage} alt={altImage} />
        <AvatarFallback>😜</AvatarFallback>
      </Avatar>
    </div>
  );
}
