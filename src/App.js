import React from 'react';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import Login from './pages/Login/Login';
function App() {
  return (
    <Wrap>
      <GlobalStyle />
      <Login />
    </Wrap>
  );
}

export default App;

const Wrap = styled.div`
  width: 390px;
  height: 100vh;
  /* position: relative; */
  margin: 0 auto;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  overflow: hidden;
  background-color: #fff;
`;
