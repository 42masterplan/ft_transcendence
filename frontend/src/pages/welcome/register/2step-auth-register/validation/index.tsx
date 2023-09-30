import Header from '@/components/components/custom/Header';
import {InputWithLabel} from '@/components/components/custom/InputWithLabel';
import {Button} from '@/components/components/shadcn/button';
import LinkBtn from '@/components/components/custom/LinkBtn';

export default function validation() {
  return (
    <>
      <Header />
      <div className='flex justify-center'>
        <div className='flex flex-col items-center w-[466px] h-auto rounded-lg p-6 bg-info_bg gap-3'>
          <h1
            className='font-roboto-mono text-4xl
            font-semibold leading-10 tracking-normal text-center m-3'
          >
            2단계 인증
          </h1>
          <div className='flex justify-items-end'>
            <LinkBtn
              name='돌아가기'
              link='/welcome/register/2step-auth-register/'
            />
            <LinkBtn
              name='계속하기'
              link='/welcome/register/2step-auth-register/'
            />
          </div>
        </div>
      </div>
    </>
  );
}
