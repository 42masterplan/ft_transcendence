import {Input} from '@/components/shadcn/ui/input';
import {Button} from '@/components/shadcn/ui/button';
import Image from 'next/image';
import Title from '@/components/Title';
import {useState} from 'react';
export default function Validation() {
  const [code, setCode] = useState('');

  const handleClick = () => {
    console.log(code);
    setCode('');
  };
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
          <Input
            placeholder='인증 코드를 입력해주세여'
            className='w-1/2'
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button onClick={handleClick} disabled={code.trim('').length === 0}>
            계속하기
          </Button>
        </div>
      </div>
    </>
  );
}
