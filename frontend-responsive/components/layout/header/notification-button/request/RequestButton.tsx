import { Button } from "@/components/shadcn/ui/button";
import { UserPlus, UserX, Swords, X } from "lucide-react";
import ResponsiveContainer from "@/components/container/ResponsiveContainer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/shadcn/ui/tooltip";
import { ToastAction } from "@/components/shadcn/ui/toast";
import { useToast } from "@/components/shadcn/ui/use-toast";

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
  const { toast } = useToast()
  let acceptTooltip: string;
  let rejectTooltip: string;
  if (requestType === "match") {
    acceptTooltip = "Accept match request";
    rejectTooltip = "Reject match request";
  } else {
    acceptTooltip = "Accept friend request";
    rejectTooltip = "Reject friend request";
  }

  let toastTitle: string;
  if (requestType === "match") {
    toastTitle = "Are you sure you want to accept this match request?";
  } else if (requestType === "friend") {
    toastTitle = "Are you sure you want to accept this friend request?";
  }

  let toastDescription: string;
  if (requestType === "match") {
    toastDescription =
      "Click the button to accept the match request."
  } else if (requestType === "friend") {
    toastDescription =
      "Click the button to accept the friend request.";
  }

  return (
    <ResponsiveContainer className="space-x-2 items-center">
      <TooltipProvider>
        {/* request reject button */}
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

        {/* request accept button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="requestAcceptBtn"
              size="requestBtn"
              onClick={() => {
                toast({
                  title: toastTitle,
                  description: toastDescription,
                  action: (
                    <ToastAction altText="Accept" onClick={onAccept}>Accept</ToastAction>
                  ),
                });
              }}
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
