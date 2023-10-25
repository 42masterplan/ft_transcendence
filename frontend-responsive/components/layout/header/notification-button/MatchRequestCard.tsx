import { Button } from "@/components/shadcn/ui/button";
import { useState } from "react";
import ResponsiveCard from "@/components/card/ResponsiveCard";
import UserInfoCard from "@/components/card/UserInfoCard/UserInfoCard";
import { MatchRequest } from "@/api/type";
import { getDummyUserInfo } from "@/api/DummyData";

type MatchRequestCardProps = {
  matchRequest: MatchRequest;
};

export default function MatchRequestCard({
  matchRequest,
}: MatchRequestCardProps) {
  const [name, setName] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [currentStatus, setCurrentStatus] = useState<string>("");

  async function getUserInfo() {
    const userInfo = await getDummyUserInfo(matchRequest.challengerId); // TODO: change getDummyUserInfo to actual function
    setName(userInfo.name);
    setProfileImage(userInfo.profileImage);
    setCurrentStatus(userInfo.currentStatus);
  }

  function handleAcceptOnClick() {
    // TODO: Send accept request to server
    console.log("Accept match request");
  }

  function handleDeclineOnClick() {
    // TODO: Send decline request to server
    console.log("Decline match request");
  }

  getUserInfo();

  return (
    <ResponsiveCard>
      <UserInfoCard
        name={name}
        profileImage={profileImage}
        currentStatus={currentStatus}
      />
      <div className="flex flex-col justify-around">
        <Button
          variant="requestBtn"
          size="requestBtn"
          onClick={handleAcceptOnClick}
        >
          Accept
        </Button>
        <Button
          variant="requestBtn"
          size="requestBtn"
          onClick={handleDeclineOnClick}
        >
          Decline
        </Button>
      </div>
    </ResponsiveCard>
  );
}
