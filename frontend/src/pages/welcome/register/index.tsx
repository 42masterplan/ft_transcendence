import Header from '@/components/components/custom/Header';
import {InputForm} from '@/components/components/custom/InputForm';
import {SwitchDemo} from './presetSwitch';
import AvatarContainer from './AvatarContainer';
import {InputWithLabel} from '@/components/components/custom/InputWithLabel';
import {Button} from '@/components/components/shadcn/button';

export default function register() {
  return (
    <>
      <Header />
      <div
        className='w-466 p-20 gap-10
          flex-col justify-center items-center bg-gray-100'
      >
        <h1
          className='font-roboto-mono text-2xl
            font-semibold leading-10 tracking-normal text-center'
        >
          회원 정보 설정
        </h1>
        <InputForm />
        <SwitchDemo />
        <AvatarContainer />
        <InputWithLabel header='상태메시지' placeholder='type what you want' />
        <Button variant='default' size='lg'>
          계속하기
        </Button>
      </div>
    </>
  );
}
