import {useEffect} from 'react';
import {useRouter} from 'next/router';
import Http from '@/api';

export default function Redirect() {
  const router = useRouter();
  async function login(auth_code: string) {
    await Http.post('/user/login', auth_code, {
      withCredentials: true
    })
      .then((res) => {
        console.log('>>> [LOGIN] ✅ SUCCESS', res.data);
        if (res.status === 200) {
          //여기서 토큰 받는 로직 작성
          const access_token = res.data.token;
          if (res.data.isRegisted) {
            router.replace('/');
          } else {
            router.replace('/welcome/register');
          }
        }
      })
      .catch((err) => {
        console.warn('>>> [LOGIN] 🤬 ERROR', err.message);
        router.replace('/error');
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
