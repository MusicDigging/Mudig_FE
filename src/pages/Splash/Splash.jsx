import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from '../../library/atom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Gradation from '../../components/common/Gradation';
import Logo from '../../img/icon_splash_logo.svg';
import Mudig from '../../img/icon_splash_mudig.svg';
import MudigHand from '../../img/icon_splash_mudig_hand.svg';

export default function Splash() {
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(isLoginAtom); // Recoil에서 로그인 상태 가져오기

  useEffect(() => {
    // 3초 후에 실행될 함수
    const timer = setTimeout(() => {
      // 현재 시간을 가져옵니다.
      const now = new Date();
      const hours = now.getHours(); // 0-23 사이의 시간

      if (isLoggedIn) {
        if (hours >= 16 && hours < 22) {
          // 만약 현재 시간이 18시에서 22시 사이라면 이벤트 페이지로 이동
          navigate('/event');
        } else {
          // 로그인 상태라면 메인 페이지로 이동
          navigate('/main');
        }
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
      <GradationBox>
        <Gradation />
      </GradationBox>
      <LogoImg src={Logo} alt='로고 이미지' />
      <MudigBox>
        <MudigImg src={Mudig} alt='캐릭터 이미지' />
        <MudigHandImg src={MudigHand} alt='캐릭터 손 이미지' />
      </MudigBox>
    </SplashWrap>
  );
}

const SplashWrap = styled.div`
  width: 360px;
  @keyframes waveHand {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(15deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
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
  z-index: 1; // z-index 설정
`;
const MudigImg = styled.img`
  position: absolute;
  z-index: 1;
  margin-left: -140px;
`;
const MudigHandImg = styled.img`
  position: absolute;
  right: -29px;
  animation: waveHand 1s ease-in-out infinite;
`;
const MudigBox = styled.div`
  position: relative;
  margin-top: 50px;
`;
