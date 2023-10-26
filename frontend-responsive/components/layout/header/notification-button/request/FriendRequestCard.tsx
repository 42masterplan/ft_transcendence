import { FriendRequest } from "@/lib/type";
import UserInfoCard from "@/components/card/UserInfoCard/UserInfoCard";
import { getDummyUserInfoSync } from "@/DummyBackend/DummyAPI";
import RequestButton from "./RequestButton";
import ResponsiveCard from "@/components/card/ResponsiveCard";

type NotificationCardProps = {
  request: FriendRequest;
};

export default function NotificationCard({ request }: NotificationCardProps) {
  const bgColor = "custom1";

  // TODO: Fix: fetch data from actual server ----------------------------------

  const notificationShooterId = request.from;
  const notificationShooter = getDummyUserInfoSync(notificationShooterId);

  // ---------------------------------------------------------------------------

  // TODO: implement this
  const handleAccept = () => {
    console.log("Friend accepted");
  };

  const handleReject = () => {
    console.log("Friend rejected");
  };

  return (
    <ResponsiveCard
      bgColor={bgColor}
      hoverEffect={true}
      className="justify-between px-2 sm:px-3 py-1.5 sm:py-2"
    >
      <UserInfoCard userInfo={notificationShooter} />
      <RequestButton
        requestType="friend"
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </ResponsiveCard>
  );
}
