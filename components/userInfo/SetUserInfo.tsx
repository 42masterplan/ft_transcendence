import SetAvatar from '@/components/avatar/SetAvatar';
import {useState} from 'react';
import {Input} from '../shadcn/ui/input';
import {Button} from '../shadcn/ui/button';
import Axios from '@/api';
import SetUserName from './SetUserName';
import {useRouter} from 'next/router';
export default function SetUserInfo() {
  const [nickname, setNickname] = useState('');
  const [isValidName, setIsValidName] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [profileImage, setProfileImage] = useState(
    process.env.NEXT_PUBLIC_CHARACTER_HOSTING_URI1 || ''
  );
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      await Axios.post('/users', {
        name: nickname,
        profileImage: profileImage,
        introduction: statusMsg,
        is2faEnabled: false
      });
      router.push('/welcome/register/2step-auth');
    } catch (err) {
      alert('회원가입 실패');
    }
  };
  return (
    <div className='flex flex-col items-center max-w-100 h-auto rounded-lg overflow-y-auto p-6 bg-custom2/70 gap-3'>
      <h1
        className='font-roboto-mono text-4xl
            font-semibold leading-10 tracking-normal text-custom4 m-3'
      >
        회원 정보 설정
      </h1>
      <SetUserName
        nickname={nickname}
        setNickname={setNickname}
        isValidName={isValidName}
        setIsValidName={setIsValidName}
      />

      <SetAvatar setProfileImage={setProfileImage} />
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
        onChange={(e) => {
          if (e.target.value.length > 20) {
            alert('20자 이하로 입력해주세요.');
            return;
          }
          setStatusMsg(e.target.value);
        }}
        placeholder='여러분을 표현해봐요'
      />
      <p className='text-custom4 text-xs'>
        상태 메시지는 최대 20자까지 입력 가능합니다.
      </p>
      {/* <LinkBtn
        link='/welcome/register/2step-auth'
        className='bg-custom4 '
        disabled={isValidName !== true}
        onClick={() => {}}
      >
        계속하기
      </LinkBtn> */}
      <Button disabled={isValidName !== true} onClick={handleSubmit}>
        계속하기
      </Button>
    </div>
  );
}
