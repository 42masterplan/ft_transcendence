import SetAvatar from '@/components/avatar/SetAvatar';
import {InputWithLabel} from '@/components/input/InputWithLabel';
import {useState} from 'react';
import {Input} from '../shadcn/ui/input';
import {Button} from '../shadcn/ui/button';
import Axios from '@/api';
import {Dispatch, SetStateAction} from 'react';
import SetUserName from './SetUserName';

export default function SetUserInfo() {
  const [nickname, setNickname] = useState('');
  const [isValidName, setIsValidName] = useState(false);
  return (
    <div className='flex flex-col gap-y-2'>
      <SetUserName
        nickname={nickname}
        setNickname={setNickname}
        isValidName={isValidName}
        setIsValidName={setIsValidName}
      />
      <h1
        className='font-roboto-mono text-1xl
		font-semibold leading-10 tracking-normal text-center text-custom4'
      >
        아바타 선택
      </h1>
      <SetAvatar />
      {/* <InputFile /> */}
      <InputWithLabel header='상태메시지' placeholder='type what you want' />
    </div>
  );
}
