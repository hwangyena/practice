import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { GlobalStore } from '../store';
import { SWRConfig } from 'swr';
import { getFetch } from 'src/lib/api';
import { swrLogger } from 'src/lib/endpoints';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalStore.Provider>
      <SWRConfig
        value={{
          use: [swrLogger],
          fetcher: getFetch,
          onErrorRetry: (error, key: string, config, revalidate, { retryCount }) => {
            // 10번까지만 재시도
            if (retryCount >= 10) return;
            //5초후에 재시도
            setTimeout(() => revalidate({ retryCount }), 5000);
          },
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </GlobalStore.Provider>
  );
}

export default MyApp;
