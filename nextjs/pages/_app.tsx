import React from 'react';
import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import theme from '@/theme/themeConfig';
import Layout from '@/components/layout';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout;
  return (
    <ConfigProvider theme={theme}>
      {getLayout ? (
        getLayout(<Component {...pageProps} />)
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </ConfigProvider>
  );
}

export default App;
