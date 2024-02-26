import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../../components/common/Button/Button';
import { AuthForm } from '../../components/common/Form/AuthForm';
import KakaoIcon from '../../img/kakao-icon.svg';
import GoogleIcon from '../../img/google-icon.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { isLoginAtom, signUpInfoAtom, userInfoAtom } from '../../library/atom';
import {
  getKakaoInfo,
  getGoogleInfo,
  postUserCode,
} from '../../library/apis/api';

import { useSocialLogin } from '../../hooks/useSocialLogin';
export default function Login() {
  const navigate = useNavigate();

  const kakaoLoginHandler = useSocialLogin(getKakaoInfo, 'kakao');
  const googleLoginHandler = useSocialLogin(getGoogleInfo, 'google');

  return (
    <LoginWrap>
      <LoginHeader>
        <LoginTitle>
          선곡 고민 끝, <br />
          뮤딕에 오신 것을
          <br /> 환영합니다!
        </LoginTitle>
        <LoginText>로그인하고 서비스를 이용해 주세요</LoginText>
      </LoginHeader>
      <LoginMain>
        <LoginBtnBox>
          <Button
            text='카카오로 시작하기'
            btnBgColor='#FBE101'
            btnBorder='1px solid #FBE101'
            btnColor={'var(--font-color)'}
            imgSrc={KakaoIcon}
            onClick={kakaoLoginHandler}
            alt='카카오로 로그인하기 버튼'
          />
          <Button
            text='Google로 시작하기'
            btnBgColor='#FFF'
            btnBorder='1px solid #FFF'
            btnColor={'var(--font-color)'}
            imgSrc={GoogleIcon}
            onClick={googleLoginHandler}
            alt='구글로 로그인하기 버튼'
          />
        </LoginBtnBox>
        <Span>또는</Span>
        <AuthForm />
        <NavUserInfo>
          <NavUserInfoLink onClick={() => navigate('/register')}>
            회원가입
          </NavUserInfoLink>
          <NavUserInfoLink onClick={() => navigate('/password/find')}>
            비밀번호 찾기
          </NavUserInfoLink>
        </NavUserInfo>
      </LoginMain>
    </LoginWrap>
  );
}

const LoginWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 16px;
`;

const LoginHeader = styled.header`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 56px;

  line-height: 33px;
`;

const LoginTitle = styled.h1`
  font-size: var(--font-xl);
  font-weight: var(--font-bold);
`;

const LoginText = styled.span`
  color: var(--sub-font--color);
  font-size: var(--font-md);
  line-height: 33px;
`;
const LoginMain = styled.main`
  /* padding: 0 16px; */
  position: relative;
  text-align: center;
  top: 149px;
`;

const LoginBtnBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 25px;
`;

const Span = styled.span`
  position: relative;
  display: block;
  color: var(--font-color);
  font-weight: 300;
`;

const NavUserInfo = styled.nav`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
`;

const NavUserInfoLink = styled.span`
  font-size: var(--font-sm);
  cursor: pointer;
`;
