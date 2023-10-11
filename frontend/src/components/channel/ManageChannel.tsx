import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/shadcn/tooltip';
import {RiChatSettingsLine} from 'react-icons/ri';
import {Button} from '@/components/shadcn/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from '@/components/shadcn/dialog';

import {Input} from '@/components/shadcn/input';
import {Label} from '@/components/shadcn/label';

export default function ManageChannel() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='ml-auto rounded-full h-14'>
          <RiChatSettingsLine className='h-8 w-8' />
          <p className='text-xl'>채널 관리</p>
          <span className='sr-only'>Public Room List</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input
              id='name'
              defaultValue='Pedro Duarte'
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              Username
            </Label>
            <Input
              id='username'
              defaultValue='@peduarte'
              className='col-span-3'
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
