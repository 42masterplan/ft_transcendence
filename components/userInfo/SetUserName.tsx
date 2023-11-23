import {Input} from '../shadcn/ui/input';
import {Button} from '../shadcn/ui/button';
import {Dispatch, SetStateAction, useEffect} from 'react';
import {useToast} from '../shadcn/ui/use-toast';
import useAxios from '@/hooks/useAxios';

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
  const {fetchData, response} = useAxios();
  const {toast} = useToast();
  useEffect(() => {
    if (response === null) return;
    else if (response === undefined) {
      toast({
        title: '닉네임 중복 확인 실패',
        description: '닉네임 중복 확인에 실패했습니다.',
        variant: 'destructive'
      });
      setIsValidName(false);
    } else if (response == true) {
      toast({
        title: '이미 존재하는 닉네임입니다.',
        description: '다른 닉네임을 입력해주세요.',
        variant: 'destructive'
      });
      setIsValidName(false);
    } else {
      toast({
        title: '사용 가능한 닉네임입니다.',
        description: '이 닉네임으로 진행해주세요.'
      });
      setIsValidName(true);
    }
  }, [response, toast, setIsValidName]);
  const checkNickname = () => {
    if (nickname.length <= 2) {
      toast({
        title: '닉네임은 3자 이상 입력해주세요.',
        variant: 'destructive'
      });
      return;
    }
    fetchData({
      method: 'get',
      url: '/users/is-duplicated-name',
      params: {name: nickname},
      errorTitle: '닉네임 중복 확인 실패',
      errorDescription: '닉네임 중복 확인에 실패했습니다.',
      disableSuccessToast: true
    });
  };

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
              toast({
                title: '닉네임은 최대 10자까지 입력 가능합니다.',
                variant: 'destructive'
              });
              return;
            }
            setNickname(e.target.value);
          }}
        />
        <Button
          disabled={isValidName}
          onClick={() => {
            checkNickname();
          }}
        >
          중복 확인
        </Button>
      </div>
    </>
  );
}
