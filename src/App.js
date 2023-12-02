import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import { Router } from './routes/Router';
import Layout from './components/common/Layout/Layout';

function App() {
  return (
    <Wrap>
      <GlobalStyle />
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
  height: 1205px;
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
