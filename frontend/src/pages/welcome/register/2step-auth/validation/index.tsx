import Header from '@/components/Header';
import {Input} from '@/components/shadcn/input';
import LinkBtn from '@/components/button/LinkBtn';

export default function validation() {
  return (
    <>
      <div className='flex justify-center'>
        <div
          className='flex flex-col items-center w-[466px] h-auto rounded-l
         p-6 bg-info_bg gap-3'
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
            <LinkBtn name='돌아가기' link='/welcome/register/2step-auth/' />
            <LinkBtn name='계속하기' link='/welcome/loading/' />
          </div>
        </div>
      </div>
    </>
  );
}
