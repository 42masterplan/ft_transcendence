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
import AvatarContainer from '@/components/avatar/AvatarContainer';
export default function SettingBtn() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ImageBtn btn_type='HeaderBtn' file='setting' width={50} height={50} />
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-center text-4xl'>
            회원 정보 설정
          </DialogTitle>
          <DialogDescription>
            <InputForm
              label='닉네임'
              placeholder='당신의 창의성을 믿어봐요'
              buttonLabel='중복확인'
            />
            <h1
              className='font-roboto-mono text-1xl
            font-semibold leading-10 tracking-normal text-center'
            >
              아바타 선택
            </h1>
            <AvatarContainer />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
