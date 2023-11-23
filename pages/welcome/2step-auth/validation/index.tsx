import {Input} from '@/components/shadcn/ui/input';
import LinkBtn from '@/components/button/LinkBtn';
import Image from 'next/image';
import Title from '@/components/Title';
export default function Validation() {
  return (
    <>
      <div className='flex-col justify-center'>
        <Title />
        <div className='flex flex-col items-center w-full h-auto rounded-lg p-6  gap-3'>
          <h1
            className='font-roboto-mono text-4xl
            font-semibold leading-10 tracking-normal text-center m-3'
          >
            2단계 인증
          </h1>
          <Image
            src='/space_dog.png'
            width={400}
            height={400}
            alt='2단계 인증'
            className='h-1/3 w-1/3'
          />
          <h3
            className='font-roboto-mono text-[20px]
            font-semibold text-center'
          >
            amazing_pong@student.42seoul.kr
          </h3>
          <p>이메일로 인증 코드를 보냈습니다</p>
          <Input placeholder='인증 코드를 입력해주세여' />
          <div className='flex justify-between w-full'>
            <LinkBtn link='/welcome/register/2step-auth/'>돌아가기</LinkBtn>
            <LinkBtn link='/'>계속하기</LinkBtn>
          </div>
        </div>
      </div>
    </>
  );
}
