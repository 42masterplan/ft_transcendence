import Header from './header/Header';
import Footer from './footer/Footer';
import {Toaster} from '@/components/shadcn/ui/toaster';
import {useRouter} from 'next/router';
import {useRecoilState} from 'recoil';
import {loginState} from '@/recoils/login';
import getAuthorization from '@/lib/utils/cookieUtils';
import {useEffect} from 'react';
import {useState} from 'react';
export default function Layout({children}: {children: React.ReactNode}) {
  const router = useRouter();
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [isAuth, setIsAuth] = useRecoilState(loginState);
  const isLoading = true;
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   if (router.pathname.startsWith('/welcome') == false) {
  //     if (isLogin == false) {
  //       router.push('/welcome');
  //       return;
  //     }
  //     if (isAuth == false) {
  //       router.push('/welcome/2step-auth/validation');
  //       return;
  //     }
  //     const token = getAuthorization();
  //     if (token === null) {
  //       setIsLogin(false);
  //       setIsAuth(false);
  //       router.push('/welcome');
  //       return;
  //     }
  //   }
  //   setIsLoading(true);
  // }, [router.pathname]);

  return (
    <>
      {isLoading && (
        <>
          {router.pathname.startsWith('/welcome') ? null : (
            <Header
              className={`flex flex-row w-full items-center justify-between px-3 sm:px-4 h-[5vh] sm:h-[7vh]`}
            />
          )}

          <main
            className={`flex flex-col h-[95vh] sm:h-[86vh] w-full sm:max-w-5xl`}
          >
            {children}
          </main>
          {router.pathname.startsWith('/welcome') ? null : (
            <Footer
              className={`hidden sm:flex flex-row w-full items-center justify-between gap-4 px-3 h-[7vh]`}
            />
          )}
          <Toaster />
        </>
      )}
    </>
  );
}
