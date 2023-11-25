import {useEffect} from 'react';
import {useRouter} from 'next/router';
import Axios from '@/api';
import SpinningLoader from '@/components/loader/SpinningLoader';
import {useCookies} from 'react-cookie';

import {toast} from '@/components/shadcn/ui/use-toast';
export default function Redirect() {
  const router = useRouter();
  const [, setCookie, removeCookie] = useCookies();
  async function login(auth_code: string | string[]) {
    await Axios.get('/auth/callback', {params: {code: auth_code}})
      .then((res) => {
        console.log('>>> [LOGIN] ✅ SUCCESS', res.data);
        setCookie('hasAccount', res.data.hasAccount, {
          path: '/',
          sameSite: 'strict',
          secure: true
        });
        if (res.status === 200) {
          setCookie('accessToken', res.data.accessToken, {
            path: '/',
            sameSite: 'strict',
            secure: true
          });
          setCookie('intraId', res.data.intraId, {
            path: '/',
            sameSite: 'strict',
            secure: true
          });
          setCookie('isTwoFactorDone', false, {
            path: '/',
            sameSite: 'strict',
            secure: true
          });
          if (res.data.hasAccount) {
            if (res.data.isTwoFactorEnabled === false) {
              setCookie('isTwoFactorDone', true, {
                path: '/',
                sameSite: 'strict',
                secure: true
              });
              router.replace('/');
            } else router.replace('/welcome/2step-auth');
          } else router.replace('/welcome/register');
        } else if (res.status === 401) {
          toast({
            title: 'Error',
            description: 'It is auth_code Error',
            variant: 'destructive'
          });
          removeCookie('accessToken');
          removeCookie('intraId');
          router.replace('/welcome');
        }
      })
      .catch((err) => {
        toast({
          title: 'Error',
          description: `>>> [LOGIN] 🤬 ERROR', ${err.message}`,
          variant: 'destructive'
        });
        router.replace('/welcome');
      });
  }
  useEffect(() => {
    const auth_code = router.query.code;
    if (auth_code) {
      login(auth_code);
    }
  }, [router]);
  return <SpinningLoader />;
}
