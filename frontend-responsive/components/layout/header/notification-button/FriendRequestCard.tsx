import { UserInfo, FriendRequest } from "@/api/type";
import ResponsiveCard from "@/components/card/ResponsiveCard";
import UserInfoCard from "@/components/card/UserInfoCard/UserInfoCard";
import { Button } from "@/components/shadcn/ui/button";
import { getDummyUserInfo } from "@/api/DummyData";
import { join } from "path";
import { get } from "http";
import { useState } from "react";

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
    <ResponsiveCard color="custom2">
      <UserInfoCard
        name={name}
        profileImage={profileImage}
        currentStatus={currentStatus}
      />
      <Button variant="requestBtn" size="requestBtn" onClick={handleAcceptOnClick}>Accept</Button>
      <Button variant="requestBtn" size="requestBtn" onClick={handleDeclineOnClick}>Decline</Button>
    </ResponsiveCard>
  );
}
