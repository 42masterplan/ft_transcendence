import { Button } from "@/components/shadcn/ui/button";
import { UserPlus, UserX, Swords, X } from "lucide-react";
import ResponsiveContainer from "@/components/container/ResponsiveContainer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";

type RequestButtonProps = {
  requestType: "match" | "friend";
  onAccept: () => void;
  onReject: () => void;
};

export default function RequestButton({
  requestType,
  onAccept,
  onReject,
}: RequestButtonProps) {
  // const friendAcceptTooltip = "Accept friend request";
  // const friendRejectTooltip = "Reject friend request";
  // const matchAcceptTooltip = "Accept match request";
  // const matchRejectTooltip = "Reject match request";

  let acceptTooltip: string;
  let rejectTooltip: string;
  if (requestType === "match") {
    acceptTooltip = "Accept match request";
    rejectTooltip = "Reject match request";
  }
  else {
    acceptTooltip = "Accept friend request";
    rejectTooltip = "Reject friend request";
  }


  return (
    <ResponsiveContainer className="space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="requestRejectBtn"
              size="requestBtn"
              onClick={onReject}
            >
              {requestType === "match" ? <X /> : <UserX />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{rejectTooltip}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="requestAcceptBtn"
              size="requestBtn"
              onClick={onAccept}
            >
              {requestType === "match" ? <Swords /> : <UserPlus />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{acceptTooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </ResponsiveContainer>
  );
}
