import {useEffect} from 'react';
import {useRouter} from 'next/router';
import Http from '@/api';
import {useSetRecoilState} from 'recoil';
import {LoginState} from '@/States/LoginState';
export default function Redirect() {
  const router = useRouter();
  const setLogin = useSetRecoilState(LoginState);
  async function login(auth_code: string) {
    await Http.post('/user/login', auth_code, {
      withCredentials: true
    })
      .then((res) => {
        console.log('>>> [LOGIN] ✅ SUCCESS', res.data);
        if (res.status === 200) {
          //여기서 토큰 받는 로직 작성
          const access_token = res.data.access_token;
          const refresh_token = res.data.refresh_token;
          setLogin(true);
          if (res.data.isRegisted) {
            router.replace('/');
          } else {
            router.replace('/welcome/register');
          }
        }
      })
      .catch((err) => {
        console.warn('>>> [LOGIN] 🤬 ERROR', err.message);
        router.replace('/welcome');
      });
  }
  console.log(router);
  useEffect(() => {
    const auth_code = router.query.code;
    console.log(auth_code);
    //login(auth_code);
    // router.replace('/');
    router.replace('/welcome/register');
  }, []);

  return <div></div>;
}
