import SetAvatar from '@/components/avatar/SetAvatar';
import {useEffect, useState} from 'react';
import {Input} from '@/components/shadcn/ui/input';
import {Button} from '@/components/shadcn/ui/button';
import SetUserName from './SetUserName';
import {useRouter} from 'next/router';
import {useToast} from '@/components/shadcn/ui/use-toast';
import {useCookies} from 'react-cookie';
import useAxios from '@/hooks/useAxios';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/shadcn/ui/card';
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

  const [cookie, setCookie, removeCookie] = useCookies();
  const router = useRouter();
  useEffect(() => {
    if (isSuccess === true) {
      if (mode == 'register') {
        setCookie('hasAccount', true, {
          path: '/',
          sameSite: 'strict',
          secure: true
        });
        setCookie('isTwoFactorDone', true, {
          path: '/',
          sameSite: 'strict',
          secure: true
        });
        router.push('/welcome/setEmail');
      } else {
        location.reload();
      }
    }
  }, [isSuccess]);
  if (mode !== 'register' && userInfo)
    return <div className='text-4xl font-bold'>회원정보가 변경되었습니다.</div>;
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

  const titleFontStyle = 'font-roboto-mono font-semibold text-custom4 text-3xl';
  const subtitleFontStyle =
    'font-roboto-mono font-semibold text-custom4 text-xl';

  const hoverEffect =
    'm-2 hover:scale-[1.02] duration-200 hover:-translate-y-1';

  return (
    <Card className='flex flex-col justify-center items-center p-2 bg-custom2 border-none'>
      <CardHeader>
        <CardTitle className={titleFontStyle}>회원 정보 설정</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col justify-center items-center'>
        <SetUserName
          nickname={nickname}
          setNickname={setNickname}
          isValidName={isValidName}
          setIsValidName={setIsValidName}
          titleFontStyle={subtitleFontStyle}
          hoverEffect={hoverEffect}
        />
        <SetAvatar
          setProfileImage={setProfileImage}
          titleFontStyle={subtitleFontStyle}
          hoverEffect={hoverEffect}
        />
        <div className={`flex flex-col w-full ${hoverEffect}`}>
          <label htmlFor='statusMsg' className={`${subtitleFontStyle} py-2`}>
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
          <p className='text-custom4 text-xs py-2'>
            상태 메시지는 최대 20자까지 입력 가능합니다.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className={`w-full ${hoverEffect}`}
          disabled={isValidName !== true}
          onClick={handleSubmit}
        >
          {mode == 'change' ? '변경하기' : '회원가입(계속)'}
        </Button>
      </CardFooter>
    </Card>
  );
}
