import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import styled from 'styled-components';
import BackgroundImg from '../src/img/background-img.svg';
import { Router } from './routes/Router';
import GlobalStyle from './styles/GlobalStyle';
import Layout from './components/common/Layout/Layout';

function App() {
  const queryClient = new QueryClient();
  return (
    <Wrap>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <RecoilRoot>
            <Layout>
              <Router />
            </Layout>
          </RecoilRoot>
        </BrowserRouter>
        {/* <ReactQueryDevtools initialIsOpen={false} position='bottom-right' /> */}
      </QueryClientProvider>
    </Wrap>
  );
}

export default App;

const Wrap = styled.div`
  position: relative;
  max-width: 430px;
  min-height: 100dvh;
  margin: 0 auto;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  overflow: hidden;
  background: url(${BackgroundImg}) top left / cover no-repeat;
`;
