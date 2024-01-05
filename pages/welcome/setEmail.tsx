import {useState, ChangeEvent, useEffect} from 'react';
import isEmail from 'validator/lib/isEmail';
import useAxios from '@/hooks/useAxios';
import {useRouter} from 'next/router';
import {Button} from '@/components/shadcn/ui/button';
import Title from '@/components/Title';
import Image from 'next/image';
import {Input} from '@/components/shadcn/ui/input';
import {Label} from '@/components/shadcn/ui/label';
import InputValidCode from '@/components/input/InputValidCode';
import SpinningLoader from '@/components/loader/SpinningLoader';
import {useToast} from '@/components/shadcn/ui/use-toast';
export default function SetEmail() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const {toast} = useToast();
  const {
    fetchData: fetchEmail,
    response,
    isSuccess: emailDone,
    loading
  } = useAxios();
  const {
    fetchData: fetchCode,
    isSuccess: codeDone,
    response: codeResponse
  } = useAxios();
  const [fixEmail, setFixEmail] = useState(false);
  const Router = useRouter();
  const validateEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    if (isEmail(email)) {
      setMessage('올바른 이메일 형식 입니다.');
    } else {
      setMessage('올바른 이메일 형식이 아닙니다.');
    }
  };
  useEffect(() => {
    if (emailDone === true) setFixEmail(true);
    if (response == true) setFixEmail(true);
  }, [emailDone, response]);
  useEffect(() => {
    if (codeResponse === true) Router.push('/', undefined, {shallow: false});
    else if (codeDone === true)
      toast({
        title: '인증 실패',
        description:
          '인증에 실패하였습니다. 이메일을 다시 설정하여 메일을 다시 보내거나, 인증코드를 다시 확인해주세요.',
        variant: 'destructive'
      });
  }, [codeResponse, codeDone]);
  if (loading == true) return <SpinningLoader />;
  return (
    <>
      <div>
        <Title />
        <div className='flex flex-col items-center w-full h-auto rounded-lg p-6  gap-3'>
          <h1
            className='font-roboto-mono text-4xl
            font-semibold leading-10 tracking-normal text-center m-3 '
          >
            2단계 인증 이메일 설정
          </h1>
          <Image
            src='/space_dog.png'
            width={400}
            height={400}
            alt='2단계 인증'
            className='h-1/3 w-1/3'
          />
          <>
            <div className=' flex  flex-col gap-3'>
              <Label htmlFor='text'>2단계 인증에 필요한 Email</Label>
              <div className='w-full items-center gap-1.5   flex'>
                <Input
                  type='text'
                  id='text'
                  placeholder='당신의 Email이 필요해요'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e);
                  }}
                  disabled={fixEmail}
                />
                <Button
                  variant='default'
                  disabled={message !== '올바른 이메일 형식 입니다.'}
                  onClick={() => {
                    if (fixEmail) {
                      setFixEmail(false);
                    } else {
                      fetchEmail({
                        method: 'put',
                        url: '/users/two-factor-auth/email',
                        body: {email: email},
                        errorDescription: '이메일 설정에 실패 했습니다.',
                        errorTitle: '이메일 설정 실패',
                        successTitle: '이메일 설정 성공',
                        successDescription:
                          '이메일 설정에 성공 했습니다. 인증코드는 설정한 이메일을 확인해주세요!'
                      });
                    }
                  }}
                  className='flex flex-col items-center justify-center w-1/3 h-10'
                >
                  {message === '올바른 이메일 형식 입니다.' && !fixEmail
                    ? '코드 전송'
                    : '변경'}
                </Button>
              </div>
              {message === '올바른 이메일 형식 입니다.' ? (
                <div className='text-xs text-blue-500'>{message}</div>
              ) : (
                <div className='text-xs text-red-500'>{message}</div>
              )}
              {fixEmail ? (
                <InputValidCode fetchData={fetchCode} disabled={!emailDone} />
              ) : null}
            </div>
          </>
        </div>
      </div>
    </>
  );
}
