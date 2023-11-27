import React from 'react';
import { Button } from '../../components/common/Button/Button';
import * as S from './SignupStyle';
import KakaoIcon from '../../img/kakao-icon.svg';
import GoogleIcon from '../../img/google-icon.svg';
export default function Signup() {
  return (
    <S.SignupWrap>
      <S.SignupHeader>
        <S.SignupTitle>
          선곡 고민 끝, <br />
          뮤딕에 오신 것을
          <br /> 환영합니다!
        </S.SignupTitle>
        <S.SignupText>3초 가입으로 바로 시작해 보세요</S.SignupText>
      </S.SignupHeader>
      <S.SignupMain>
        <S.SignupBtnBox>
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
        </S.SignupBtnBox>
        <S.Span>또는</S.Span>
        <Button
          text='이메일로 시작하기'
          btnBorder='1px solid #DBDBDB'
          alt='구글로 로그인하기 버튼'
        />
        <S.NavLoign>
          <S.NavSpan>이미 계정이 있으신가요? </S.NavSpan>
          <S.LinkLogin>로그인하기</S.LinkLogin>
        </S.NavLoign>
      </S.SignupMain>
    </S.SignupWrap>
  );
}
