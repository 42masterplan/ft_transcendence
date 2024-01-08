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
  const [code, setCode] = useState<string>('');
  return (
    <div className=' flex w-full items-center gap-2'>
      <Input
        type='number'
        id='text'
        placeholder='인증코드를 입력해주세요'
        value={code}
        disabled={disabled}
        onChange={(e) => {
          if (parseInt(e.target.value) < 0 || parseInt(e.target.value) > 999999)
            return;
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
            errorDescription:
              '인증 코드가 올바르지 않습니다. 이메일을 다시 설정하거나 인증코드를 다시 확인해주세요.',
            errorTitle: '인증 실패',
            disableSuccessToast: true
          });
        }}
        className='flex flex-col items-center justify-center  h-10 w-20'
      >
        확인
      </Button>
    </div>
  );
}
