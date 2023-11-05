import LinkBtn from '@/components/button/LinkBtn';
import SetUserInfo from '@/components/userInfo/SetUserInfo';
import Title from '@/components/Title';

export default function Register() {
  // let memberData = {
  //   name: '',
  //   custom_avatar: 0,
  //   profile_image: 'imageBinary',
  //   introduction: 'Hello World!',
  //   authorizationCode: ''
  // };
  // 추후에  state로 관리할 배열입니다. 이걸 json으로 바꿔서 backend에게 넘겨주면 됨..!
  // 유의할 점 : custom_avatar와  profile_image 중 하나만 올릴 수 있음..!
  return (
    <>
      <div className='flex-col justify-center'>
        <Title />
        <div className='flex flex-col items-center w-[466px] h-auto rounded-lg overflow-y-auto p-6 bg-info_bg gap-3'>
          <h1
            className='font-roboto-mono text-4xl
            font-semibold leading-10 tracking-normal text-center m-3'
          >
            회원 정보 설정
          </h1>
          <SetUserInfo />
          <LinkBtn link='/welcome/register/2step-auth'>계속하기</LinkBtn>
        </div>
      </div>
    </>
  );
}