import SetAvatar from '@/components/avatar/SetAvatar';
import {InputWithLabel} from '@/components/input/InputWithLabel';
import {useState} from 'react';
import {Input} from '../shadcn/ui/input';
import {Button} from '../shadcn/ui/button';
import Axios from '@/api';
import SetUserName from './SetUserName';
import LinkBtn from '@/components/button/LinkBtn';
export default function SetUserInfo() {
  const [nickname, setNickname] = useState('');
  const [isValidName, setIsValidName] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  return (
    <div className='flex flex-col gap-y-2 items-center'>
      <SetUserName
        nickname={nickname}
        setNickname={setNickname}
        isValidName={isValidName}
        setIsValidName={setIsValidName}
      />

      <SetAvatar />
      {/* <InputFile /> */}
      <label
        htmlFor='statusMsg'
        className='font-roboto-mono text-1xl font-semibold leading-10 tracking-normal text-custom4'
      >
        상태 메시지
      </label>
      <Input
        id='statusMsg'
        value={statusMsg}
        onChange={(e) => setStatusMsg(e.target.value)}
        placeholder='여러분을 표현해봐요'
      />
      <LinkBtn
        link='/welcome/register/2step-auth'
        className='bg-custom4 '
        disabled={isValidName !== true}
      >
        계속하기
      </LinkBtn>
    </div>
  );
}
