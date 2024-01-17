import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '../../library/atom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../../img/icon_splash_logo.svg';
import Mudig from '../../img/icon_splash_mudig.svg';
import MudigHand from '../../img/icon_splash_mudig_hand.svg';

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
  }, [isLoggedIn, navigate]); // 의존성 배열에 포함된 변수들

  return (
    <SplashWrap>
      <LogoImg src={Logo} alt='로고 이미지' />
      <MudigBox>
        <MudigImg src={Mudig} alt='캐릭터 이미지' />
        <MudigHandImg src={MudigHand} alt='캐릭터 손 이미지' />
      </MudigBox>
    </SplashWrap>
  );
}

const SplashWrap = styled.div`
  max-width: 430px;
  @keyframes waveHand {
    0% {
      transform: rotate(-10deg);
    }
    50% {
      transform: rotate(5deg);
    }
    100% {
      transform: rotate(-10deg);
    }
  }
`;

const LogoImg = styled.img`
  display: block;
  margin: 173px auto 0 auto;
`;
const MudigImg = styled.img`
  position: absolute;
  margin-left: -140px;
`;
const MudigHandImg = styled.img`
  position: absolute;
  right: 13px;
  top: -16px;
  animation: waveHand 1s ease-in-out infinite;
`;
const MudigBox = styled.div`
  position: relative;
  margin-top: 50px;
  width: 385px;
`;
