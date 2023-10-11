import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/shadcn/tooltip';
import {RiChatSettingsLine} from 'react-icons/ri';
import {Button} from '@/components/shadcn/button';

export default function ManageChannel() {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip className='sticky top-0'>
        <TooltipTrigger asChild>
          <Button
            className='ml-auto rounded-full h-14'
            onClick={() => setOpen(true)}
          >
            <RiChatSettingsLine className='h-8 w-8' />
            <p className='text-xl'>채널 관리</p>
            <span className='sr-only'>Public Room List</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={10}>Public Room List</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
