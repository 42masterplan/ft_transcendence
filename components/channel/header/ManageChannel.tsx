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
      <DialogContent className=' bg-custom1 h-5/6 sm:max-w-[700px]'>
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
          {/* <FriendListSelector>밴(금지)유저 목록</FriendListSelector> */}
          {/* TODO : 전체 유저가 나오고, 채널 관리자 임명 삭제를 할 수 있도록 함.*/}
          {/* <FriendListSelector>관리자 수정</FriendListSelector> */}

          {/* TODO : 채널 비밀번호 변경 기능 버튼 추가*/}
          {/* <Label htmlFor='channel_password' className='text-right'>
              비밀번호 변경
            </Label>
            <Input id='channel_password' className='col-span-3' /> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
