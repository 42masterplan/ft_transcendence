import {Input} from '../shadcn/ui/input';
import {Button} from '../shadcn/ui/button';
import {useState} from 'react';

export default function InputValidCode({
  fetchData,
  disabled
}: {
  fetchData: any;
  disabled: boolean;
}) {
  const [code, setCode] = useState('');
  return (
    <div className='flex w-full max-w-sm gap-2'>
      <Input
        type='number'
        id='text'
        placeholder='인증 코드를 입력해주세요'
        value={code}
        disabled={disabled}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      />

      <Button
        size='default'
        variant='default'
        disabled={disabled}
        onClick={() => {
          fetchData({
            method: 'post',
            url: '/users/two-factor-auth/email/validate',
            body: {code: parseInt(code, 10)},
            errorDescription: '인증 코드가 올바르지 않습니다.',
            errorTitle: '인증 실패',
            successTitle: '인증 성공',
            successDescription: '인증에 성공했습니다.'
          });
        }}
      >
        check
      </Button>
    </div>
  );
}
