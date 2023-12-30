import {Input} from '@/components/shadcn/ui/input';
import {Button} from '@/components/shadcn/ui/button';
import Image from 'next/image';
import Title from '@/components/Title';
import {useEffect, useState} from 'react';
import {useToast} from '@/components/shadcn/ui/use-toast';
import {useCookies} from 'react-cookie';
import Router from 'next/router';
import useAxios from '@/hooks/useAxios';
import SpinningLoader from '@/components/loader/SpinningLoader';
export default function Validation() {
  const [code, setCode] = useState('');
  const [cookie, setCookie] = useCookies();
  const {fetchData: requestCode, isSuccess: success, response} = useAxios();
  const {fetchData: postCode, isSuccess, response: codeSuccess} = useAxios();
  const [email, setEmail] = useState('');
  const {toast} = useToast();
  useEffect(() => {
    const isTwoFactorDone = cookie.isTwoFactorDone;

    if (isTwoFactorDone) {
      toast({
        title: '이미 인증 완료',
        description: '이미 2단계 인증이 완료되었습니다'
      });
      Router.push('/');
    } else if (success === false) {
      console.log('hi');
      requestCode({
        method: 'post',
        url: '/users/two-factor-auth',
        errorTitle: '인증코드 전송 실패',
        errorDescription: '인증코드 전송 실패했습니다. 다시 새로고침 해주세요',
        disableSuccessToast: true
      });
    }
  }, []);
  useEffect(() => {
    if (success === true) setEmail(response.email);
    console.log(response);
  }, [response]);
  useEffect(() => {
    if (isSuccess === true && codeSuccess === true) {
      setCookie('isTwoFactorDone', true, {path: '/'});
      Router.push('/');
    } else if (codeSuccess === false) {
      toast({
        variant: 'destructive',
        title: '인증 실패',
        description: '인증 코드가 틀렸습니다!'
      });
    }
    console.log(codeSuccess);
  }, [codeSuccess]);

  const handleClick = () => {
    setCode('');
    postCode({
      method: 'post',
      url: '/users/two-factor-auth/validate',
      body: {code: parseInt(code, 10)},
      errorTitle: '인증 실패',
      errorDescription: '인증에 실패했습니다. 다시 시도해주세요',
      disableSuccessToast: true
    });
  };
  if (success === false)
    return (
      <div className='flex justify-center items-center w-full h-full'>
        <SpinningLoader />;
      </div>
    );

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
            {email}
          </h3>
          <p>이메일로 인증 코드를 보냈습니다</p>
          <Input
            placeholder='인증 코드를 입력해주세여'
            className='w-1/2'
            type={'number'}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button onClick={handleClick} disabled={code.trim().length === 0}>
            계속하기
          </Button>
        </div>
      </div>
    </>
  );
}
