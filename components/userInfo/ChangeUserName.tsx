import {Input} from '../shadcn/ui/input';
import {Button} from '../shadcn/ui/button';
import {useEffect, useState} from 'react';
import {useToast} from '../shadcn/ui/use-toast';
import useAxios from '@/hooks/useAxios';

export default function ChangeUserName() {
  let regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
  const titleFontStyle = 'font-roboto-mono font-semibold text-custom4 text-3xl';
  const hoverEffect =
    'm-2 hover:scale-[1.02] duration-200 hover:-translate-y-1';
  const subtitleFontStyle =
    'font-roboto-mono font-semibold text-custom4 text-xl';
  const {fetchData, response} = useAxios();
  const {fetchData: postUserName, isSuccess: isPostUserName} = useAxios();
  const {toast} = useToast();
  const [nickname, setNickname] = useState('');
  const [isDuplicated, setIsDuplicated] = useState(true);
  useEffect(() => {
    if (response === null) return;
    else if (response === undefined) {
      toast({
        title: '닉네임 중복 확인 실패',
        description: '닉네임 중복 확인에 실패했습니다.',
        variant: 'destructive'
      });
    } else if (response.isDuplicated == true) {
      toast({
        title: '이미 존재하는 닉네임입니다.',
        description: '다른 닉네임을 입력해주세요.',
        variant: 'destructive'
      });
    } else {
      toast({
        title: '사용 가능한 닉네임입니다.',
        description: '이 닉네임으로 진행해주세요.'
      });
      setIsDuplicated(false);
    }
  }, [response, toast]);
  useEffect(() => {
    if (isPostUserName === true) {
      location.reload();
    }
  }, [isPostUserName, toast]);
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
    <div className={`w-full ${hoverEffect} gap-5 flex flex-col`}>
      <label htmlFor='nickname' className={subtitleFontStyle}>
        닉네임
      </label>
      <div className='flex flex-row gap-2'>
        <Input
          placeholder='당신의 창의성을 믿어봐요'
          id='nickname'
          value={nickname.trim()}
          onChange={(e) => {
            if (regExp.test(e.target.value)) {
              toast({
                title: '닉네임에 특수문자는 사용할 수 없습니다.',
                variant: 'destructive'
              });
              return;
            }
            if (e.target.value.length > 10) {
              toast({
                title: '닉네임은 최대 10자까지 입력 가능합니다.',
                variant: 'destructive'
              });
              return;
            }
            setNickname(e.target.value);
          }}
          disabled={!isDuplicated}
        />
        <Button
          variant='default'
          onClick={() => {
            checkNickname();
          }}
          disabled={!isDuplicated}
        >
          중복 확인
        </Button>
      </div>
      <Button
        className='flex w-full justify-center items-center'
        onClick={() => {
          if (nickname.length <= 2) {
            toast({
              title: '닉네임은 3자 이상 입력해주세요.',
              variant: 'destructive'
            });
            return;
          }
          postUserName({
            method: 'put',
            url: '/users',
            body: {
              name: nickname
            },
            successTitle: '닉네임 변경 성공',
            successDescription: '닉네임 변경에 성공했습니다.',
            errorTitle: '닉네임 변경 실패',
            errorDescription: '닉네임 변경에 실패했습니다.'
          });
        }}
        disabled={isDuplicated}
      >
        닉네임 변경
      </Button>
    </div>
  );
}
