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
export default function TwoStepAuth() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const {fetchData: fetchEmail, response, isSuccess: emailDone} = useAxios();
  const {fetchData: fetchCode, isSuccess: codeDone} = useAxios();
  const [fixEmail, setFixEmail] = useState(false);
  const Router = useRouter();
  const validateEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    if (isEmail(email)) {
      setMessage('올바른 이메일 형식 입니다.');
    } else {
      setMessage('Please, enter valid Email!');
    }
  };
  useEffect(() => {
    if (emailDone === true) setFixEmail(true);
    if (response == true) setFixEmail(true);
  }, [emailDone, response]);
  useEffect(() => {
    if (codeDone === true) Router.push('/');
  }, [codeDone]);
  return (
    <>
      <div>
        <Title />
        <div className='flex flex-col items-center w-full h-auto rounded-lg p-6  gap-3'>
          <h1
            className='font-roboto-mono text-4xl
            font-semibold leading-10 tracking-normal text-center m-3 '
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
          <>
            <div className='grid w-full max-w-sm items-center gap-1.5  m-3'>
              <Label htmlFor='text'>2단계 인증에 필요한 Email</Label>
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
              <div className='text-xs text-red-500'>{message}</div>
            </div>
            {fixEmail ? (
              <InputValidCode fetchData={fetchCode} disabled={!emailDone} />
            ) : null}
            <Button
              size='lg'
              variant='default'
              disabled={message !== '올바른 이메일 형식 입니다.'}
              onClick={() => {
                if (fixEmail) {
                  setFixEmail(false);
                } else {
                  fetchEmail({
                    method: 'put',
                    url: '/users/two-factor-auth',
                    body: {email: email},
                    errorDescription: '이메일 설정에 실패 했습니다.',
                    errorTitle: '이메일 설정 실패',
                    successTitle: '이메일 설정 성공',
                    successDescription: '이메일 설정에 성공 했습니다.'
                  });
                }
              }}
            >
              {message === '올바른 이메일 형식 입니다.' && !fixEmail
                ? '인증 코드 받기'
                : '이메일 변경'}
            </Button>
          </>
        </div>
      </div>
    </>
  );
}
