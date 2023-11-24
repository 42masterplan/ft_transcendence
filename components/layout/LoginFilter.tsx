'use client';

import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {useCookies} from 'react-cookie';
export default function LoginFilter({children}: {children: React.ReactNode}) {
  const [cookie, setCookie, removeCookie] = useCookies();
  const router = useRouter();
  useEffect(() => {
    const token = cookie.accessToken;
    if (!token) {
      router.push('/welcome');
    }
  }, []);
  return <>{children}</>;
}
