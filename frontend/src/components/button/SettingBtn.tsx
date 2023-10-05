import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/shadcn/dialog';
import ImageBtn from './ImageBtn';
import {Button} from '../shadcn/button';
import {InputForm} from '../input/InputForm';
import UserInfo from '@/components/userInfo/UserInfo';
import AvatarContainer from '@/components/avatar/AvatarContainer';
export default function SettingBtn() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ImageBtn btn_type='HeaderBtn' file='setting' width={50} height={50} />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] bg-color_3'>
        <DialogHeader>
          <DialogTitle className='text-center text-4xl'>
            회원 정보 설정
          </DialogTitle>
          <DialogDescription>
            <UserInfo />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
