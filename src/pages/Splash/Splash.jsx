import React from 'react';
import styled from 'styled-components';
import Gradation from '../../components/common/Gradation';
import Logo from '../../img/icon_splash_logo.svg';
import Mudig from '../../img/icon_splash_mudig.svg';

export default function Splash() {
  return (
    <SplashWrap>
      <GradationBox>
        <Gradation />
      </GradationBox>
      <LogoImg src={Logo} alt='로고 이미지' />
      <MudigImg src={Mudig} alt='캐릭터 이미지' />
    </SplashWrap>
  );
}
const SplashWrap = styled.div`
  position: relative;
  width: 360px;
`;
const GradationBox = styled.div`
  width: 100%;
  height: 100%;
  //   div {
  //     position: absolute;
  //     z-index: -10; // z-index 설정
  //   }
`;
const LogoImg = styled.img`
  display: block;
  margin: 173px auto 0 auto;
  position: relative; // position 추가
  z-index: 1; // z-index 설정
`;
const MudigImg = styled.img`
  margin-top: 40px;
  position: relative; // position 추가
  z-index: 1; // z-index 설정
`;
