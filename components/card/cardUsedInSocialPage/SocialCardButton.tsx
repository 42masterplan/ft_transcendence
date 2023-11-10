import {Button} from '@/components/shadcn/ui/button';
import {
  Gamepad2,
  ShieldAlert,
  ShieldOff,
  UserMinus2,
  UserPlus2
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/shadcn/ui/tooltip';

export type SocialCardButtonTypes =
  | 'matchRequest'
  | 'follow'
  | 'unfollow'
  | 'block'
  | 'unblock';

interface SocialCardButtonProps {
  onClick?: () => void;
  type: SocialCardButtonTypes;
}

export function SocialCardButton({onClick, type}: SocialCardButtonProps) {
  let icon: any;
  let color: string;
  let tooltipText: string;
  switch (type) {
    case 'matchRequest':
      icon = <Gamepad2 />;
      color = 'bg-custom2';
      tooltipText = 'Send match request';
      break;
    case 'follow':
      icon = <UserPlus2 />;
      color = 'bg-custom2/70';
      tooltipText = 'Follow';
      break;
    case 'unfollow':
      icon = <UserMinus2 />;
      color = 'bg-custom3/60';
      tooltipText = 'Unfollow';
      break;
    case 'block':
      icon = <ShieldAlert />;
      color = 'bg-custom4/80';
      tooltipText = 'Block';
      break;
    case 'unblock':
      icon = <ShieldOff />;
      color = 'bg-custom4/50';
      tooltipText = 'Unblock';
      break;
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button size='icon' onClick={onClick} className={color}>
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{tooltipText}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
