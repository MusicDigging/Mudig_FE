import React from 'react';
import styled from 'styled-components';
import { Button } from '../../components/common/Button/Button';
import { AuthForm } from '../../components/common/Form/AuthForm';
import KakaoIcon from '../../img/kakao-icon.svg';
import GoogleIcon from '../../img/google-icon.svg';
export default function Login() {
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
            alt='카카오로 로그인하기 버튼'
          />
          <Button
            text='Google로 시작하기'
            btnBgColor='#FFF'
            btnBorder='1px solid #DBDBDB'
            btnColor={'var(--font-color)'}
            imgSrc={GoogleIcon}
            alt='구글로 로그인하기 버튼'
          />
        </LoginBtnBox>
        <Span>또는</Span>
        <AuthForm />
        <NavUserInfo>
          <NavUserInfoLink> 회원가입</NavUserInfoLink>
          <NavUserInfoLink>아이디 · 비밀번호 찾기 </NavUserInfoLink>
        </NavUserInfo>
      </LoginMain>
    </LoginWrap>
  );
}

const LoginWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const LoginHeader = styled.header`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 56px;
  left: 16px;
  line-height: 33px;
`;

const LoginTitle = styled.h1`
  font-size: var(--font-xl);
  font-weight: var(--font-bold);
`;

const LoginText = styled.span`
  color: var(--sub-font-color);
  font-size: var(--font-md);
`;
const LoginMain = styled.main`
  padding: 8px 16px;
  position: relative;
  text-align: center;
  top: 149px;
`;

const LoginBtnBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 30px;
`;

const Span = styled.span`
  position: relative;
  color: var(--font-color);
  font-weight: 300;
`;

//footer
const NavUserInfo = styled.nav`
  width: 328px;
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
`;

const NavUserInfoLink = styled.span`
  font-size: var(--font-sm);
  cursor: pointer;
`;
