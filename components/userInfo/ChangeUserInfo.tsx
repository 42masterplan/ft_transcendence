import {Input} from '@/components/shadcn/ui/input';
import {Button} from '@/components/shadcn/ui/button';
import {useToast} from '@/components/shadcn/ui/use-toast';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/shadcn/ui/card';
import {useEffect, useState} from 'react';
import {Switch} from '@/components/shadcn/ui/switch';
import {Label} from '@/components/shadcn/ui/label';
import useAxios from '@/hooks/useAxios';
import SpinningLoader from '../loader/SpinningLoader';
import ChangeAvatar from './ChangeAvatar';
import ChangeUserName from './ChangeUserName';
import LinkBtn from '@/components/button/LinkBtn';
export default function ChangeUserInfo() {
  const {fetchData, isSuccess, response} = useAxios();
  const {toast} = useToast();

  const [myInfo, setMyInfo] = useState({
    profileImage: '',
    name: '',
    introduction: '',
    is2faEnabled: false
  });
  useEffect(() => {
    fetchData({
      method: 'get',
      url: '/users/my-info',
      errorTitle: '내 정보 조회 실패',
      errorDescription: '내 정보 조회에 실패했습니다.',
      disableSuccessToast: true
    });
  }, []);

  const titleFontStyle = 'font-roboto-mono font-semibold text-custom4 text-3xl';
  const subtitleFontStyle =
    'font-roboto-mono font-semibold text-custom4 text-xl';
  const hoverEffect =
    'm-2 hover:scale-[1.02] duration-200 hover:-translate-y-1';

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetchData({
      method: 'put',
      url: '/users',
      body: {
        introduction: myInfo.introduction
      }
    });
    location.reload();
  };
  useEffect(() => {
    if (isSuccess === true) {
      setMyInfo(response);
    }
  }, [isSuccess, response]);
  if (isSuccess === false) return <SpinningLoader />;
  return (
    <Card className='flex flex-col justify-center items-center p-2 bg-custom2 border-none'>
      <CardHeader>
        <CardTitle className={titleFontStyle}>회원 정보 변경</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col justify-center items-center'>
        <ChangeUserName />
        <ChangeAvatar beforeAvatar={response.profileImage} />
        <div className={`flex flex-col w-full ${hoverEffect}`}>
          <label htmlFor='statusMsg' className={`${subtitleFontStyle} py-2`}>
            상태 메시지
          </label>
          <Input
            id='statusMsg'
            value={myInfo.introduction}
            onChange={(e) => {
              if (e.target.value.length > 20) {
                toast({
                  title: '상태 메시지는 최대 20자까지 입력 가능합니다.',
                  variant: 'destructive'
                });
                return;
              }
              setMyInfo({...myInfo, introduction: e.target.value});
            }}
            placeholder='여러분을 표현해봐요'
          />
          <p className='text-custom4 text-xs py-2'>
            상태 메시지는 최대 20자까지 입력 가능합니다.
          </p>
        </div>
        <Button className={`w-full ${hoverEffect}`} onClick={handleSubmit}>
          상태메세지 변경
        </Button>
        <div className='flex justify-center space-x-2'>
          <Switch
            id='two-step'
            checked={myInfo.is2faEnabled}
            onClick={() => {
              fetchData({
                method: 'put',
                url: '/users',
                body: {
                  is2faEnabled: !myInfo.is2faEnabled
                }
              });
              const newMyInfo = {...myInfo};
              newMyInfo.is2faEnabled = !myInfo.is2faEnabled;
              setMyInfo(newMyInfo);
              location.reload();
            }}
          />
          <Label htmlFor='two-step'>2단계 인증 활성화</Label>
        </div>
        <LinkBtn link='/welcome/setEmail'>2단계 인증 이메일 변경</LinkBtn>
      </CardContent>
    </Card>
  );
}
