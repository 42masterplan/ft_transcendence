
import SetUserInfo from '@/components/userInfo/SetUserInfo';

export default function Register() {
  return (
    <>
      <div className='flex flex-col items-center w-full max-w-100 h-auto rounded-lg overflow-y-auto p-6 bg-custom3/70p gap-3'>
        <h1
          className='font-roboto-mono text-4xl
            font-semibold leading-10 tracking-normal text-custom4 m-3'
        >
          회원 정보 설정
        </h1>
        <SetUserInfo />
        
      </div>
    </>
  );
}
