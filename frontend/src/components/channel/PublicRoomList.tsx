import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/shadcn/tooltip';
import {LuGlobe2} from 'react-icons/lu';
import {Button} from '@/components/shadcn/button';
export default function PublicRoomList() {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip className='sticky top-0'>
        <TooltipTrigger asChild>
          <Button className='rounded-full h-14' onClick={() => setOpen(true)}>
            <LuGlobe2 className='h-8 w-8' />
            <p className='text-xl'>공개 채널</p>
            <span className='sr-only'>Public Room List</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={10}>Public Room List</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
