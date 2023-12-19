import {RiChatSettingsLine} from 'react-icons/ri';
import {Button} from '@/components/shadcn/ui/button';
import {Input} from '@/components/shadcn/ui/input';

import AdminUserListSlider from '@/components/channel/header/manageChannel/AdminUserListSlider';
import BanUserListSlider from '@/components/channel/header/manageChannel/BanUserListSlider';
import ParticipantListSlider from '@/components/channel/header/manageChannel/ParticipantListSlider';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from '@/components/shadcn/ui/dialog';
import {Label} from '@/components/shadcn/ui/label';
export default function ManageChannel({
  channel_name,
  channelId
}: {
  channel_name: string;
  channelId: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-custom4 justify-self-end'>
          <RiChatSettingsLine className='h-6 w-6' />
          <p className='text-6'>채널 관리</p>
        </Button>
      </DialogTrigger>
      <DialogContent className=' bg-custom1 h-5/6 sm:max-w-[700px] overflow-auto'>
        <DialogHeader>
          <DialogTitle className='text-center'>방장 전용 페이지</DialogTitle>
          <DialogDescription className='text-center text-l'>
            이곳에서 채널을 관리할 수 있습니다.
            <br />
            채널명 : {channel_name}
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-6 py-6 '>
          {/* TODO : 채널 Ban user Icon 띄우고 지우는 형식으로 만들기*/}
          <ParticipantListSlider channelId={channelId} />
          <BanUserListSlider channelId={channelId} />
          <AdminUserListSlider channelId={channelId} />
          <div>
            <Label htmlFor='channel_password' className='text-right'>
              비밀번호 변경
            </Label>
            <div className='flex space-x-4 text-start flex-row items-center'>
              <Input id='channel_password' className='col-span-3' />
              <Button variant='default' className='w-20'>
                변경
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
