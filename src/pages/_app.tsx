import Layout from '@/components/Layout';
import type {AppProps} from 'next/app';
import {SessionProvider} from 'next-auth/react';

import '../../app/globals.css';
export default function App({
  Component,
  pageProps: {session, ...pageProps}
}: AppProps) {
  return (
    <Layout>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Layout>
  );
}
