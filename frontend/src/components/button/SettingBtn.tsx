import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/shadcn/dialog';
import {Mail} from 'lucide-react';
import ImageBtn from './ImageBtn';
import SetUserInfo from '@/components/userInfo/SetUserInfo';
import {Button} from '../shadcn/button';
import {Switch} from '@/components/shadcn/switch';
import {Label} from '@/components/shadcn/label';
export default function SettingBtn() {
  return (
    <span className='fixed top-2.5 right-2.5'>
      <Dialog>
        <DialogTrigger asChild>
          <ImageBtn
            btn_type='HeaderBtn'
            file='setting'
            width={50}
            height={50}
          />
        </DialogTrigger>
        <DialogContent className='sm:max-w-[450px] max-h-screen bg-color_3 overflow-y-auto'>
          <DialogHeader>
            <DialogTitle className='text-center text-4xl top-0'>
              회원 정보 설정
            </DialogTitle>
            <DialogDescription className='flex flex-col items-center space-y-3'>
              <SetUserInfo />
              <div className='flex items-center space-x-2'>
                <Switch id='performance' />
                <Label htmlFor='performance'>
                  <span className='text-black font-medium text-l leading-[14px]'>
                    2단계 인증 활성화
                  </span>
                </Label>
              </div>
              <Button>
                <Mail className='mr-2 h-4 w-4' /> 2단계 인증 이메일 변경
              </Button>

              <Button> 설정 저장</Button>
              <div className='flex space-x-3'>
                <Button variant='destructive' size='sm'>
                  {' '}
                  로그아웃
                </Button>
                <Button variant='destructive' size='sm'>
                  {' '}
                  회원 탈퇴
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </span>
  );
}
