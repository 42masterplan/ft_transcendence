import {Input} from '../shadcn/ui/input';
import {Button} from '../shadcn/ui/button';

import Axios from '@/api';
import {Dispatch, SetStateAction} from 'react';
import {useToast} from '../shadcn/ui/use-toast';
async function checkNickname(
  nickname: string,
  setIsValidName: Dispatch<SetStateAction<boolean>>,
  toast: any
) {
  //이거 api 바꾸면 이걸로 바꿀 예정입니다.
  if (nickname.length <= 2) {
    alert('3자 이상 입력해주세요');
    return;
  }
  try {
    const res = await Axios.get('/users/is-duplicated-name', {
      params: {name: nickname}
    });
    console.log(res);
    if (res.data == true) {
      toast({
        title: '이미 존재하는 닉네임입니다.',
        description: '다른 닉네임을 입력해주세요.',
        variant: 'destructive',
        duration: 3000
      });
      setIsValidName(false);
    } else {
      toast({
        title: '사용 가능한 닉네임입니다.',
        description: '이 닉네임으로 진행해주세요.',
        variant: 'success',
        duration: 3000
      });
      setIsValidName(true);
    }
  } catch (err) {
    console.log(err);
    setIsValidName(false);
    toast({
      title: '닉네임 중복 확인 실패',
      description: '닉네임 중복 확인에 실패했습니다.',
      variant: 'destructive',
      duration: 3000
    });
  }
}
export default function SetUserName({
  nickname,
  setNickname,
  isValidName,
  setIsValidName
}: {
  nickname: string;
  setNickname: Dispatch<SetStateAction<string>>;
  isValidName: boolean;
  setIsValidName: Dispatch<SetStateAction<boolean>>;
}) {
  const {toast} = useToast();
  return (
    <>
      <label
        htmlFor='nickname'
        className='font-roboto-mono text-1xl font-semibold leading-10 tracking-normal  text-custom4'
      >
        닉네임
      </label>
      <div className='flex gap-1'>
        <Input
          placeholder='당신의 창의성을 믿어봐요'
          id='nickname'
          value={nickname}
          disabled={isValidName}
          onChange={(e) => {
            if (e.target.value.length > 10) {
              alert('10자 이내로 입력해주세요');
              return;
            }
            setNickname(e.target.value);
          }}
        />
        <Button
          disabled={isValidName}
          onClick={() => {
            checkNickname(nickname, setIsValidName, toast);
          }}
        >
          중복 확인
        </Button>
      </div>
    </>
  );
}
