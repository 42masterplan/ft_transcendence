import LinkBtn from '@/components/button/LinkBtn';
import {InputWithLabel} from '@/components/input/InputWithLabel';
import Title from '@/components/Title';
import Image from 'next/image';
// import bg from '@/public/space_dog.jpg';
export default function twoStepAuth() {
  return (
    <>
      <div className=''>
        <Title />

        <div className='flex flex-col items-center w-full h-auto rounded-lg p-6  gap-3'>
          <h1
            className='font-roboto-mono text-4xl
            font-semibold leading-10 tracking-normal text-center m-3 '
          >
            2단계 인증
          </h1>
          {/* <Image
            src='/space_dog.jpg'
            width={200}
            height={200}
            alt='2단계 인증'
          /> */}
          <InputWithLabel
            header='2단계 인증에 필요한 Email'
            placeholder='당신의 Email이 필요해요'
          />
          <LinkBtn link='/welcome/2step-auth/validation'>
            인증 코드 받기
          </LinkBtn>
        </div>
      </div>
    </>
  );
}
