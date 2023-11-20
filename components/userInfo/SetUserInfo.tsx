import SetAvatar from '@/components/avatar/SetAvatar';
import {useState} from 'react';
import {Input} from '../shadcn/ui/input';
import {Button} from '../shadcn/ui/button';
import Axios from '@/api';
import SetUserName from './SetUserName';
import {useRouter} from 'next/router';
import {useToast} from '@/components/shadcn/ui/use-toast';
import SpinningLoader from '@/components/loader/SpinningLoader';
import useAxios from '@/hooks/useAxios';
export default function SetUserInfo() {
  const {fetchData, response, error, loading, isSuccess} = useAxios();
  const {toast} = useToast();
  const [nickname, setNickname] = useState('');
  const [isValidName, setIsValidName] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [profileImage, setProfileImage] = useState(
    process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI1 || ''
  );
  const router = useRouter();
  if (isSuccess === true) {
    router.push('/welcome/2step-auth');
  }
  const handleSubmit = () => {
    fetchData({
      method: 'post',
      url: '/users',
      body: {
        name: nickname,
        profileImage: profileImage,
        introduction: statusMsg,
        is2faEnabled: false
      }
    });
  };

  return loading ? (
    <SpinningLoader />
  ) : (
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
          계속하기
        </Button>
      </div>
    </div>
  );
}
