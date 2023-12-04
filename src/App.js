import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import { Router } from './routes/Router';
import Layout from './components/common/Layout/Layout';

import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import NewPlaylist from './pages/NewPlaylist/NewPlaylist';
import { RecoilRoot } from 'recoil';
import Home from './pages/Home/Home';

function App() {
  return (
    <Wrap>
      <GlobalStyle />
      <BrowserRouter>
        <RecoilRoot>
          <Layout>
            <Router />
          </Layout>
        </RecoilRoot>
      </BrowserRouter>
      <BrowserRouter>
        <Layout>
          <Router />
        </Layout>
      </BrowserRouter>
    </Wrap>
  );
}

export default App;

const Wrap = styled.div`
  position: relative;
  position: relative;
  width: 360px;
  height: 100vh;
  margin: 0 auto;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  overflow: hidden;
  background-color: #fff;
`;

// const Wrap = styled.div`
//   width: 360px;
//   height: 1205px;
//   margin: 0 auto;
//   box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
//   overflow: hidden;
//   background-color: #fff;
// `;
