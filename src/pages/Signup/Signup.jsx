import React from 'react';
import { Button } from '../../components/common/Button/Button';
import {
  SignupWrap,
  SignupHeader,
  SignupTitle,
  SignupText,
  SignupMain,
  SignupBtnBox,
  Span,
  NavLoign,
  NavSpan,
  LinkLogin,
  Footer,
  FooterSpan,
} from './SignupStyle';
import KakaoIcon from '../../img/kakao-icon.svg';
import GoogleIcon from '../../img/google-icon.svg';
export default function Signup() {
  return (
    <SignupWrap>
      <SignupHeader>
        <SignupTitle>
          선곡 고민 끝, <br />
          뮤딕에 오신 것을
          <br /> 환영합니다!
        </SignupTitle>
        <SignupText>3초 가입으로 바로 시작해 보세요</SignupText>
      </SignupHeader>
      <SignupMain>
        <SignupBtnBox>
          <Button
            text='카카오로 시작하기'
            btnBgColor='#FBE101'
            btnBorder='1px solid #FBE101'
            btnColor={'var(--font-color)'}
            imgSrc={KakaoIcon}
            alt='카카오로 로그인하기 버튼'
          />
          <Button
            text='구글로 시작하기'
            btnBgColor='#FFF'
            btnBorder='1px solid #DBDBDB'
            btnColor={'var(--font-color)'}
            imgSrc={GoogleIcon}
            alt='구글로 로그인하기 버튼'
          />
        </SignupBtnBox>
        <Span>또는</Span>
        <Button
          text='이메일로 시작하기'
          btnBorder='1px solid #DBDBDB'
          alt='구글로 로그인하기 버튼'
        />
        <NavLoign>
          <NavSpan>이미 계정이 있으신가요? </NavSpan>
          <LinkLogin>로그인하기</LinkLogin>
        </NavLoign>
      </SignupMain>
      <Footer>
        <FooterSpan>
          회원가입과 함께 <br />
          Muding의 약관에 동의하는 것으로 간주합니다.
        </FooterSpan>
      </Footer>
    </SignupWrap>
  );
}
