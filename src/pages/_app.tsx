import Layout from '@components/layout/Layout';
import SEO from '@components/layout/SEO';
import '@fonts/NotoSansCJKkr_font.css';
import GlobalStyles from '@styles/globalStyles';
import theme from '@styles/theme';
import 'moment/locale/ko';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { isDesktop } from 'react-device-detect';
import { ThemeProvider } from 'styled-components';
import 'swiper/swiper.min.css';
import { SWRConfig } from 'swr';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <SWRConfig
      value={{ revalidateOnFocus: isDesktop || router.route === '/alarm' ? false : true, revalidateOnMount: true, errorRetryCount: 3 }}
    >
      <SEO />
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </SWRConfig>
  );
}

export default App;

if (process.env.NODE_ENV === 'production') console.log = function no_console() {};
