import {InputForm} from '@/components/input/InputForm';
import AvatarContainer from '@/components/avatar/AvatarContainer';
import {InputWithLabel} from '@/components/input/InputWithLabel';
import {InputFile} from '@/components/input/InputFile';
export default function SetUserInfo() {
  // kind == 'modal' ?
  return (
    <div className='grid place-content-center  grid-rows-1 gap-2 '>
      <InputForm
        label='닉네임'
        placeholder='당신의 창의성을 믿어봐요'
        buttonLabel='중복확인'
      />
      <h1
        className='font-roboto-mono text-1xl
		font-semibold leading-10 tracking-normal text-center'
      >
        아바타 선택
      </h1>
      <AvatarContainer />
      {/* <InputFile /> */}
      <InputWithLabel header='상태메시지' placeholder='type what you want' />
    </div>
  );
}
