import {Button} from '@/components/shadcn/ui/button';
import {UserPlus, UserX, Swords, X} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/shadcn/ui/tooltip';
import {ToastAction} from '@/components/shadcn/ui/toast';
import {useToast} from '@/components/shadcn/ui/use-toast';

type RequestButtonProps = {
  requestType: 'match' | 'friend';
  onAccept: () => void;
  onReject: () => void;
};

export default function RequestButton({
  requestType,
  onAccept,
  onReject
}: RequestButtonProps) {
  const {toast} = useToast();
  let acceptTooltip: string;
  let rejectTooltip: string;
  if (requestType === 'match') {
    acceptTooltip = 'Accept match request';
    rejectTooltip = 'Reject match request';
  } else {
    acceptTooltip = 'Accept friend request';
    rejectTooltip = 'Reject friend request';
  }

  let toastTitle: string;
  if (requestType === 'match') {
    toastTitle = '게임을 시작하시겠습니까?';
  } else if (requestType === 'friend') {
    toastTitle = '친구 요청을 수락하시겠습니까?';
  }

  let toastDescription: string;
  if (requestType === 'match') {
    toastDescription = '버튼을 누르면 게임이 시작됩니다.';
  } else if (requestType === 'friend') {
    toastDescription = '버튼을 누르면 친구가 됩니다.';
  }

  return (
    <div className='flex space-x-2 items-center'>
      <TooltipProvider>
        {/* request reject button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='requestRejectBtn'
              size='requestBtn'
              onClick={onReject}
            >
              {requestType === 'match' ? <X /> : <UserX />}
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
              variant='requestAcceptBtn'
              size='requestBtn'
              onClick={() => {
                toast({
                  title: toastTitle,
                  description: toastDescription,
                  action: (
                    <ToastAction altText='Accept' onClick={onAccept}>
                      Accept
                    </ToastAction>
                  )
                });
              }}
            >
              {requestType === 'match' ? <Swords /> : <UserPlus />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{acceptTooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
