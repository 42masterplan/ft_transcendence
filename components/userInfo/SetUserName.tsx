import {Input} from '../shadcn/ui/input';
import {Button} from '../shadcn/ui/button';

import Axios from '@/api';
import {Dispatch, SetStateAction} from 'react';
async function checkNickname(
  nickname: string,
  setIsValidName: Dispatch<SetStateAction<boolean>>
) {
  //이거 api 바꾸면 이걸로 바꿀 예정입니다.
  // await Axios.get('/users/is-duplicated-name', {params: {name: nickname}})
  // .then((res) => {
  //   console.log(res.data);
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
  if (nickname.length <= 2) {
    alert('3자 이상 입력해주세요');
    return;
  }
  await Axios.post('/users/hasDuplicateName', {name: nickname})
    .then((res) => {
      console.log(res);

      if (nickname !== 'joushin' && res.data == true) {
        //test위해서 가입할 때 joushin이 아니면 중복된 닉네임이라고 뜨게 했습니다.
        alert('중복된 닉네임입니다.');
        setIsValidName(false);
      } else {
        alert('사용 가능한 닉네임입니다.');
        setIsValidName(true);
      }
    })
    .catch((err) => {
      console.log(err);
      setIsValidName(false);
      alert('네트워크 에러');
    });
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
  return (
    <>
      <label
        htmlFor='nickname'
        className='font-roboto-mono text-1xl font-semibold leading-10 tracking-normal text-center text-custom4'
      >
        닉네임
      </label>
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
        className='bg-custom4'
        disabled={isValidName}
        onClick={() => {
          checkNickname(nickname, setIsValidName);
        }}
      >
        중복 확인
      </Button>
    </>
  );
}
