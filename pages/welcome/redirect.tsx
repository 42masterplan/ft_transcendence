import {useEffect} from 'react';
import {useRouter} from 'next/router';
import Axios from '@/api';
import SpinningLoader from '@/components/loader/SpinningLoader';
import {useCookies} from 'react-cookie';
import {useSetRecoilState} from 'recoil';
import {twoFactorAuthorizeState} from '@/recoils/twoFactorEnable';
import {loginState} from '@/recoils/login';
import {toast, useToast} from '@/components/shadcn/ui/use-toast';
export default function Redirect() {
  const router = useRouter();
  const [cookie, setCookie, removeCookie] = useCookies();
  const setTwoFactorAuthorize = useSetRecoilState(twoFactorAuthorizeState);
  const setLogin = useSetRecoilState(loginState);
  async function login(auth_code: string | string[]) {
    await Axios.get('/auth/callback', {params: {code: auth_code}})
      .then((res) => {
        console.log('>>> [LOGIN] ✅ SUCCESS', res.data);
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
          if (res.data.hasAccount) {
            if (res.data.isTwoFactorEnabled === false) {
              setLogin(true);
              setTwoFactorAuthorize(true);
              router.replace('/');
            } else {
              setLogin(() => true);
              setTwoFactorAuthorize(false);
              router.replace('/welcome/2step-auth/validation');
            }
          } else {
            setLogin(false);
            setTwoFactorAuthorize(false);
            router.replace('/welcome/register');
          }
        } else if (res.status === 401) {
          toast({
            title: 'Error',
            description: 'It is auth_code Error',
            variant: 'destructive'
          });
          setLogin(false);
          setTwoFactorAuthorize(false);
          router.replace('/welcome');
        }
      })
      .catch((err) => {
        setLogin(false);
        setTwoFactorAuthorize(false);
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
