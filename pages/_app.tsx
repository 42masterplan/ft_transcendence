import '@/styles/globals.css';
import type {AppProps} from 'next/app';

import {ThemeProvider} from '@/components/theme/theme-provider';
import {CookiesProvider} from 'react-cookie';
import Layout from '@/components/layout/Layout';
import {RecoilRoot} from 'recoil';
import LoginFilter from '@/components/layout/LoginFilter';
export default function App({Component, pageProps}: AppProps) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <CookiesProvider>
        <Layout>
          <RecoilRoot>
            <LoginFilter>
              <Component {...pageProps} />
            </LoginFilter>
          </RecoilRoot>
        </Layout>
      </CookiesProvider>
    </ThemeProvider>
  );
}
