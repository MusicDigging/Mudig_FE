import React from 'react';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import NewPlaylist from './pages/NewPlaylist/NewPlaylist';

function App() {
  return (
    <Wrap>
      <GlobalStyle />
      <Signup />
    </Wrap>
  );
}

export default App;

const Wrap = styled.div`
  width: 360px;
  height: 800px;
  margin: 0 auto;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  overflow: hidden;
  background-color: #fff;
`;
