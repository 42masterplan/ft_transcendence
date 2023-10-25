import { type } from "os"
import { Button } from "@/components/shadcn/ui/button";
import { gameRequests } from "@/public/APIData"

import ResponsiveCard from "@/components/card/ResponsiveCard"
import UserInfoCard from "@/components/card/UserInfoCard/UserInfoCard";

type MatchRequestCardProps = {
  gameRequest: typeof gameRequests[number];
}


export default function MatchRequestCard({ gameRequest }: MatchRequestCardProps) {
  // destructuring gameRequest
  const { id, name, profile_image, current_status, game_mode } = gameRequest;
  
  return (
    <ResponsiveCard color="custom2" >
      <UserInfoCard name={name} profile_image={profile_image} current_status={current_status} side="left" />
      <div className="flex flex-col">
      <Button>Accept</Button>
      <Button>Decline</Button>
      </div>
    </ResponsiveCard>
  )
}