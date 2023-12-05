import SetAvatar from '@/components/avatar/SetAvatar';
import {useState} from 'react';
import {Input} from '@/components/shadcn/ui/input';
import {Button} from '@/components/shadcn/ui/button';
import SetUserName from './SetUserName';
import {useRouter} from 'next/router';
import {useToast} from '@/components/shadcn/ui/use-toast';

import useAxios from '@/hooks/useAxios';

interface SetUserInfoProps {
  mode?: 'register' | 'change';
  userInfo?: {
    name: string;
    profileImage: string;
    introduction: string;
    is2faEnabled: boolean;
  };
}
export default function SetUserInfo({
  mode = 'register',
  userInfo
}: SetUserInfoProps) {
  const {fetchData, isSuccess} = useAxios();
  const {toast} = useToast();
  const [nickname, setNickname] = useState('');
  const [isValidName, setIsValidName] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [profileImage, setProfileImage] = useState(
    process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI1 || ''
  );

  const router = useRouter();
  if (isSuccess === true) {
    if (mode == 'register') router.push('/welcome/setEmail');
    else
      return (
        <div className='text-4xl font-bold'>회원정보가 변경되었습니다.</div>
      );
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetchData({
      method: 'put',
      url: '/users',
      body: {
        name: nickname,
        profileImage: profileImage,
        introduction: statusMsg,
        is2faEnabled: false
      }
    });
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='max-w-100 rounded-lg overflow-y-auto p-6 bg-custom2/70 gap-3'>
        <h1 className='font-roboto-mono text-4xl font-semibold leading-10 tracking-normal text-custom4 m-3'>
          회원 정보 설정
        </h1>
        <SetUserName
          nickname={nickname}
          setNickname={setNickname}
          isValidName={isValidName}
          setIsValidName={setIsValidName}
        />
        <SetAvatar setProfileImage={setProfileImage} />
        <label
          htmlFor='statusMsg'
          className='font-roboto-mono text-1xl font-semibold leading-10 tracking-normal text-custom4'
        >
          상태 메시지
        </label>
        <Input
          id='statusMsg'
          value={statusMsg}
          onChange={(e) => {
            if (e.target.value.length > 20) {
              toast({
                title: '상태 메시지는 최대 20자까지 입력 가능합니다.',
                variant: 'destructive'
              });
              return;
            }
            setStatusMsg(e.target.value);
          }}
          placeholder='여러분을 표현해봐요'
        />
        <p className='text-custom4 text-xs p-3'>
          상태 메시지는 최대 20자까지 입력 가능합니다.
        </p>

        <Button
          className='self-center w-full mt-4 '
          disabled={isValidName !== true}
          onClick={handleSubmit}
        >
          {mode == 'change' ? '변경하기' : '회원가입(계속)'}
        </Button>
      </div>
    </div>
  );
}
