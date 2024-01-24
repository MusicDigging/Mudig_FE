import React from 'react';
import styled from 'styled-components';
import KakaoIcon from '../../img/kakao-icon.svg';
import { Button } from '../../components/common/Button/Button';
import closeIcon from '../../img/close-icon.svg';
import GoogleGrayIcon from '../../img/google-gray-icon.svg';

export default function Intro() {
  return (
    <IntroWrap>
      <CloseButton>
        <img src={closeIcon} alt='닫기 버튼' />
      </CloseButton>
      <ItroBox>
        <IntroText>
          <Title bold={false}>
            간편하게 로그인하고
            <br />
          </Title>
          <Title bold={true}>뮤딕의 서비스를 이용해보세요.</Title>
        </IntroText>
        <Button
          text='카카오로 시작하기'
          btnBgColor='#FBE101'
          btnBorder='1px solid #FBE101'
          btnColor={'var(--font-color)'}
          imgSrc={KakaoIcon}
          alt='카카오로 로그인하기 버튼'
        />
      </ItroBox>
      <AuthContainer>
        <AuthText color='#767676'>다른 방법으로 시작하기</AuthText>
        <AuthNav>
          <GoogleIcon />
          <Divider />
          <EmailText>이메일</EmailText>
        </AuthNav>
      </AuthContainer>
    </IntroWrap>
  );
}

interface TitleProps {
  bold: boolean;
}
const IntroWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const CloseButton = styled.button`
  img {
    padding: 24px 0 0 16px;
  }
`;

const IntroText = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;
const Title = styled.span<TitleProps>`
  color: #191919;
  font-size: var(--font-xl);
  font-weight: ${(props) =>
    props.bold ? 'var(--font-bold)' : 'var(--regular)'};
  line-height: 33px;
`;

const ItroBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 367px;
  padding: 0 16px;
`;

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: absolute;
  top: 702px;
  left: 128px;
`;

const AuthText = styled.div`
  color: var(--sub-font-color);
  font-size: var(--font-sm);
`;

const AuthNav = styled.div`
  display: flex;
  align-items: center;
`;

const Divider = styled.div`
  width: 1px;
  height: 16px;
  background: var(--border-color);
  margin: 0 16px;
`;

const GoogleIcon = styled.button`
  width: 12px;
  height: 12px;
  position: relative;

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0.86px;
    top: 0.43px;
    background: url(${GoogleGrayIcon}) no-repeat center center;
  }
`;

const EmailText = styled.span`
  color: var(--tertiary-font-color);
  font-size: var(--font-sm);
  cursor: pointer;
`;
