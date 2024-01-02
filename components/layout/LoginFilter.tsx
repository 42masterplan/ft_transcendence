'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useCookies} from 'react-cookie';
import {toast} from '@/components/shadcn/ui/use-toast';
export default function LoginFilter({children}: {children: React.ReactNode}) {
  const [cookie, setCookie, removeCookie] = useCookies();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const token = cookie.accessToken;
    const isTwoFactorDone = cookie.isTwoFactorDone;
    const hasAccount = cookie.hasAccount;
    if (router.pathname.startsWith('/welcome')) {
      if (
        router.pathname === '/welcome' ||
        router.pathname === '/welcome/redirect'
      ) {
        setLoading(false);
        return;
      }
      if (!token || isTwoFactorDone === undefined || hasAccount === undefined) {
        console.log('<<<<<<<🤬>>>>>>');
        router.push('/welcome');
      } else if (router.pathname === '/welcome/2step-auth') {
        if (isTwoFactorDone === true) {
          toast({
            title: '이미 인증 완료',
            description: '이미 2단계 인증이 완료되었습니다'
          });
          router.push('/');
        }
      } else if (router.pathname === '/welcome/register') {
        if (hasAccount) {
          toast({
            title: '이미 계정 생성 완료',
            description: '이미 계정이 생성되었습니다'
          });
          router.push('/');
        }
      }
    } else {
      if (!token || hasAccount === undefined) {
        removeCookie('accessToken');
        removeCookie('isTwoFactorDone');
        removeCookie('hasAccount');
        toast({
          title: '로그인 상태 만료',
          description: '로그인 상태가 만료되었습니다. 다시 로그인 해주세요'
        });

        router.push('/welcome');
      } else if (
        router.pathname !== 'welcome/setEmail' &&
        hasAccount === false
      ) {
        router.push('/welcome/register');
        toast({
          title: '계정 생성 필요',
          description: '계정이 생성되지 않았습니다. 계정을 생성해주세요'
        });
      } else if (isTwoFactorDone === false) {
        router.push('/welcome/2step-auth');
        toast({
          title: '2단계 인증 필요',
          description: '2단계 인증이 필요합니다. 2단계 인증을 진행해주세요'
        });
      }
    }
    setLoading(false);
  }, [router.pathname]);

  return <>{loading ? null : children}</>;
}
