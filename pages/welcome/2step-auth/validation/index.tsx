import {Input} from '@/components/shadcn/ui/input';
import LinkBtn from '@/components/button/LinkBtn';

export default function Validation() {
  return (
    <>
      <div className='flex-col justify-center'>
        <h1 className='text-custom4 p-5 text-center font-roboto-mono text-5xl leading-tight font-semibold'>
          Amazing Pong
        </h1>
        <div
          className='flex flex-col items-center w-[466px] h-auto rounded-l
         p-6 bg-custom2 gap-3'
        >
          <h1
            className='font-roboto-mono text-4xl
            font-semibold leading-10 tracking-normal text-center m-3'
          >
            2단계 인증
          </h1>
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
            <LinkBtn link='/welcome/loading/'>계속하기</LinkBtn>
          </div>
        </div>
      </div>
    </>
  );
}
