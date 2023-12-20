import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '../../library/atom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Gradation from '../../components/common/Gradation';
import Logo from '../../img/icon_splash_logo.svg';
import Mudig from '../../img/icon_splash_mudig.svg';

export default function Splash() {
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(isLoginAtom); // Recoil에서 로그인 상태 가져오기

  useEffect(() => {
    // 3초 후에 실행될 함수
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        // 로그인 상태라면 메인 페이지로 이동
        navigate('/main');
      } else {
        // 로그인 상태가 아니라면 로그인 페이지로 이동
        navigate('/login');
      }
    }, 3000); // 3초 대기

    // 컴포넌트 언마운트 시 타이머 제거
    return () => clearTimeout(timer);
  }, [isLoggedIn, navigate]);

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
