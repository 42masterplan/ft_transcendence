import Header from '@/components/Header';
import LinkBtn from '@/components/button/LinkBtn';
import {InputWithLabel} from '@/components/input/InputWithLabel';
import {Button} from '@/components/shadcn/button';

export default function twoStepAuth() {
  return (
    <>
      <div className='flex justify-center'>
        <div className='flex flex-col items-center w-[466px] h-auto rounded-lg p-6 bg-info_bg gap-3'>
          <h1
            className='font-roboto-mono text-4xl
            font-semibold leading-10 tracking-normal text-center m-3'
          >
            2단계 인증
          </h1>
          <InputWithLabel
            header='2단계 인증에 필요한 Email'
            placeholder='당신의 Email이 필요해요'
          />
          <LinkBtn
            name='인증 코드 받기'
            link='/welcome/register/2step-auth/validation'
          />
        </div>
      </div>
    </>
  );
}
