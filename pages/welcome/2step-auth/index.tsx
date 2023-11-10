import LinkBtn from '@/components/button/LinkBtn';
import {InputWithLabel} from '@/components/input/InputWithLabel';
import Title from '@/components/Title';

export default function twoStepAuth() {
  return (
    <>
      <div className='flex-col justify-center'>
        <Title />
        <div className='flex flex-col items-center w-[466px] h-auto rounded-lg p-6 bg-custom2 gap-3'>
          <h1
            className='font-roboto-mono text-4xl
            font-semibold leading-10 tracking-normal text-center m-3 '
          >
            2단계 인증
          </h1>
          <InputWithLabel
            header='2단계 인증에 필요한 Email'
            placeholder='당신의 Email이 필요해요'
          />
          <LinkBtn link='/welcome/register/2step-auth/validation'>
            인증 코드 받기
          </LinkBtn>
        </div>
      </div>
    </>
  );
}
