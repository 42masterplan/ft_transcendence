import { UserInfo, FriendRequest } from "@/api/type";
import ResponsiveCard from "@/components/card/ResponsiveCard";
import UserInfoCard from "@/components/card/UserInfoCard/UserInfoCard";
import { Button } from "@/components/shadcn/ui/button";
import { getDummyUserInfo } from "@/api/DummyData";
import { join } from "path";
import { get } from "http";
import { useState } from "react";
import { UserPlus, UserX } from "lucide-react";
import { LayoutResponsiveDesign } from "@/components/layout/LayoutResponsiveDesign";

type FriendRequestCardProps = {
  friendRequest: FriendRequest;
};

export default function FriendRequestCard({
  friendRequest,
}: FriendRequestCardProps) {
  const [name, setName] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [currentStatus, setCurrentStatus] = useState<string>("");

  async function getUserInfo() {
    const userInfo = await getDummyUserInfo(friendRequest.from); // TODO: change getDummyUserInfo to actual function
    setName(userInfo.name);
    setProfileImage(userInfo.profileImage);
    setCurrentStatus(userInfo.currentStatus);
  }

  function handleAcceptOnClick() {
    // TODO: Send accept request to server
    console.log("Accept friend request");
  }

  function handleDeclineOnClick() {
    // TODO: Send decline request to server
    console.log("Decline friend request");
  }

  getUserInfo();

  return (
    <ResponsiveCard>
      <UserInfoCard
        name={name}
        profileImage={profileImage}
        currentStatus={currentStatus}
      />
      <div className="flex justify-around space-x-3">
        <Button variant="iconBtn" size="icon" onClick={handleDeclineOnClick}>
        <UserX className={LayoutResponsiveDesign.iconSize} />
        </Button>
        <Button variant="iconBtn" size="icon" onClick={handleAcceptOnClick}>
          <UserPlus className={LayoutResponsiveDesign.iconSize} />
        </Button>
      </div>
    </ResponsiveCard>
  );
}
