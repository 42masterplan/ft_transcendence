import {RiChatSettingsLine} from 'react-icons/ri';
import {Button} from '@/components/shadcn/ui/button';
import {Input} from '@/components/shadcn/ui/input';
import {useState} from 'react';
import AdminUserListSlider from '@/components/channel/header/manageChannel/AdminUserListSlider';
import BanUserListSlider from '@/components/channel/header/manageChannel/BanUserListSlider';
import ParticipantListSlider from '@/components/channel/header/manageChannel/ParticipantListSlider';
import useSocket from '@/hooks/useSocket';
import {useToast} from '@/components/shadcn/ui/use-toast';
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
  const [socket] = useSocket('channel');
  const [channelPassword, setChannelPassword] = useState('');
  const {toast} = useToast();
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <ParticipantListSlider channelId={channelId} setOpen={setOpen} />
          <BanUserListSlider channelId={channelId} setOpen={setOpen} />
          <AdminUserListSlider channelId={channelId} setOpen />
          <div>
            <Label htmlFor='channel_password' className='text-right'>
              비밀번호 변경
            </Label>
            <div className='flex space-x-4 text-start flex-row items-center'>
              <Input
                id='channel_password'
                className='col-span-3'
                value={channelPassword}
                onChange={(e) => setChannelPassword(e.target.value)}
              />
              <Button
                variant='default'
                className='w-20'
                onClick={() => {
                  socket.emit(
                    'changePassword',
                    {
                      channelId: channelId,
                      password: channelPassword.replace(/\s/g, '')
                    },
                    (res: string) => {
                      if (res === 'changePassword Success!') {
                        toast({
                          title: '비밀번호가 변경되었습니다.',
                          description: '비밀번호가 변경되었습니다.'
                        });
                        setOpen(false);
                      } else {
                        toast({
                          title: '비밀번호 변경 실패',
                          description: res
                        });
                      }
                      setChannelPassword('');
                    }
                  );
                }}
              >
                변경
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
