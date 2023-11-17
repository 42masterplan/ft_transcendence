import {Button} from '@/components/shadcn/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/shadcn/ui/tooltip';
import {Send} from 'lucide-react';

export default function DMButton(userId: string) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button
          size='icon'
          className='bg-custom4 hover:bg-custom4/60'
          onClick={async () => {
            // TODO: implement open DM
          }}
        >
          <Send />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Open DM</TooltipContent>
    </Tooltip>
  );
}
