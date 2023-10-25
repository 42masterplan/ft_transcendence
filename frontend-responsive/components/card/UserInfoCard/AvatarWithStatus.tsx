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

type AvatarWithStatusProps = {
  status: string;
  avatarImage: string;
};

export default function AvatarWithStatus({
  status,
  avatarImage,
}: AvatarWithStatusProps) {
  const altImage = "@/public/avatars/picapica.jpg";

  let statusColor: string;

  switch (status) {
    case "ONLINE":
      statusColor = "bg-green-500";
      break;
    case "OFFLINE":
      statusColor = "bg-gray-500";
      break;
    case "INGAME":
      statusColor = "bg-blue-500";
      break;
    default:
      statusColor = "bg-yellow-500";
      break;
  }

  const statusStyle = `absolute top-1 right-1 sm:top-1.5 sm:right-1.5 px-1 py-1 sm:px-1.5 sm:py-1.5 z-10 rounded-full ${statusColor}`;

  return (
    <div className="relative flex justify-center items-center h-min">
      <div className={statusStyle}></div>
      <Avatar className="h-10 w-10 sm:h-16 sm:w-16">
        <AvatarImage src={avatarImage} alt={altImage} />
        <AvatarFallback>😜</AvatarFallback>
      </Avatar>
    </div>
  );
}
