import '@/styles/globals.css';
import type {AppProps} from 'next/app';

import {ThemeProvider} from '@/components/theme/theme-provider';
import {CookiesProvider} from 'react-cookie';
import Layout from '@/components/layout/Layout';
import {RecoilRoot} from 'recoil';

export default function App({Component, pageProps}: AppProps) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <CookiesProvider>
        <RecoilRoot>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RecoilRoot>
      </CookiesProvider>
    </ThemeProvider>
  );
}
