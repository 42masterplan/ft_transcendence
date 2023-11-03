import { MatchRequest } from "@/lib/type";
import UserInfoCard from "@/components/card/userInfoCard/UserInfoCard";
import { getDummyUserInfoSync } from "@/DummyBackend/outdated/DummyAPI";
import RequestButton from "./RequestButton";
import ResponsiveContainer from "@/components/container/ResponsiveContainer";
import * as dummyAPI from "@/DummyBackend/new/notificationAPI";
import * as Type from "@/lib/type"
import * as Class from "@/lib/class"

type NotificationCardProps = {
  request: dummyAPI.matchRequest;
};

export default function MatchRequestCard({ request }: NotificationCardProps) {

  const newMatch: Type.GameInfo = new Class.Game();
  const notificationShooter: Type.UserInfo  = new Class.User();
  notificationShooter.name = request.friend_id;
  notificationShooter.profileImage = request.profile_image;
  newMatch.id = request.game_id;
  // TODO: add game type

  // TODO: implement this
  const handleAccept = () => {
    console.log("Match accepted");
  };

  const handleReject = () => {
    console.log("Match rejected");
  };

  return (
    <ResponsiveContainer
    className="flex-row justify-between items-center">
      <UserInfoCard userInfo={notificationShooter} showStatus={false} size="sm"/>
      <RequestButton
        requestType="match"
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </ResponsiveContainer>
  );
}
