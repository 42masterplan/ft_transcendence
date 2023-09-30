import Header from '@/components/components/custom/Header';
import {InputForm} from '@/components/components/custom/InputForm';
import {PresetSwitch} from './presetSwitch';
import AvatarContainer from './AvatarContainer';
import {InputWithLabel} from '@/components/components/custom/InputWithLabel';
import {Button} from '@/components/components/shadcn/button';

export default function register() {
  return (
    <>
      <Header />
      <div className='flex justify-center'>
        <div className='flex flex-col items-center w-[466px] h-[616px] rounded-lg overflow-y-auto p-6 bg-info_bg gap-3'>
          <h1
            className='font-roboto-mono text-4xl
            font-semibold leading-10 tracking-normal text-center m-3'
          >
            회원 정보 설정
          </h1>
          <InputForm />
          <PresetSwitch />
          <AvatarContainer />
          <InputWithLabel
            header='상태메시지'
            placeholder='type what you want'
          />
          <Button variant='default' size='lg' className='shrink-0'>
            계속하기
          </Button>
        </div>
      </div>
    </>
  );
}
