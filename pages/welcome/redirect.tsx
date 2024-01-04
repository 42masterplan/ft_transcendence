import {useEffect} from 'react';
import {useRouter} from 'next/router';
import Axios from '@/api';
import SpinningLoader from '@/components/loader/SpinningLoader';
import {useCookies} from 'react-cookie';

import {toast} from '@/components/shadcn/ui/use-toast';
export default function Redirect() {
  const router = useRouter();
  const [cookie, setCookie, removeCookie] = useCookies();
  async function login(auth_code: string | string[]) {
    await Axios.get('/auth/callback', {params: {code: auth_code}})
      .then((res) => {
        console.log('>>> [LOGIN] ✅ SUCCESS', res.data);
        if (res.status === 200) {
          setCookie('accessToken', res.data.accessToken, {
            path: '/',
            sameSite: 'strict',

          });

          if (res.data.hasAccount) {
            if (res.data.isTwoFactorEnabled === false) {
              router.replace('/');
            } else router.replace('/welcome/2step-auth');
          } else if (res.data.hasProfile === true)
            router.replace('/welcome/setEmail');
          else router.replace('/welcome/register');
        } else if (res.status === 401) {
          toast({
            title: 'Error',
            description: 'It is auth_code Error',
            variant: 'destructive'
          });
          removeCookie('accessToken');
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
