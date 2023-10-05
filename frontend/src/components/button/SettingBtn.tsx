import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/shadcn/dialog';
import ImageBtn from './ImageBtn';
import UserInfo from '@/components/userInfo/UserInfo';
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
        <DialogContent className='sm:max-w-[425px] max-h-screen bg-color_3 overflow-y-auto'>
          <DialogHeader>
            <DialogTitle className='text-center text-4xl '>
              회원 정보 설정
            </DialogTitle>
            <DialogDescription>
              <UserInfo />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </span>
  );
}
