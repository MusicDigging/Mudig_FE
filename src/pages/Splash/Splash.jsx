import React from 'react';
import styled from 'styled-components';
import Gradation from '../../components/common/Gradation';
import Logo from '../../img/icon_splash_logo.svg';
import Mudig from '../../img/icon_splash_mudig.svg';

export default function Splash() {
  return (
    <SplashWrap>
      <Gradation />
      <LogoImg src={Logo} alt='로고 이미지' />
      <MudigImg src={Mudig} alt='캐릭터 이미지' />
    </SplashWrap>
  );
}
const SplashWrap = styled.div`
  width: 360px;
`;
const LogoImg = styled.img`
  display: block;
  margin: 173px auto 0 auto;
  z-index: 10;
`;
const MudigImg = styled.img`
  z-index: 10;
  margin-top: 40px;
`;
