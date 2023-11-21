import {Button} from '@/components/shadcn/ui/button';
import Title from '@/components/Title';
import Image from 'next/image';
import {Input} from '@/components/shadcn/ui/input';
import {Label} from '@/components/shadcn/ui/label';
import {useState, ChangeEvent, useEffect} from 'react';
import isEmail from 'validator/lib/isEmail';
import useAxios from '@/hooks/useAxios';
import {useRouter} from 'next/router';
export default function TwoStepAuth() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const {fetchData, isSuccess} = useAxios();
  const Router = useRouter();
  const validateEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    if (isEmail(email)) {
      setMessage('Thank you');
    } else {
      setMessage('Please, enter valid Email!');
    }
  };
  useEffect(() => {
    if (isSuccess === true) Router.push('/welcome/2step-auth/validation');
  }, [isSuccess]);
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
            />
            <div className='text-xs text-red-500'>{message}</div>
          </div>
          <Button
            size='lg'
            variant='default'
            disabled={message !== 'Thank you'}
            onClick={() => {
              fetchData({
                method: 'put',
                url: '/auth/2step-auth',
                body: {email: email}
              });
            }}
          >
            인증 코드 받기
          </Button>
        </div>
      </div>
    </>
  );
}
