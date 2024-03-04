import React from 'react';
import { Button } from '../../components/common/Button/Button';
import { AuthForm } from '../../components/common/Form/AuthForm';
import KakaoIcon from '../../img/kakao-icon.svg';
import GoogleIcon from '../../img/google-icon.svg';
import * as S from './LoginStlye';
import { useNavigate } from 'react-router-dom';
import { getKakaoInfo, getGoogleInfo } from '../../library/apis/api';
import { useSocialLogin } from '../../hooks/useSocialLogin';
export default function Login() {
  const navigate = useNavigate();

  const kakaoLoginHandler = useSocialLogin(getKakaoInfo, 'kakao');
  const googleLoginHandler = useSocialLogin(getGoogleInfo, 'google');

  return (
    <S.LoginWrap>
      <S.LoginHeader>
        <S.LoginTitle>
          선곡 고민 끝, <br />
          뮤딕에 오신 것을
          <br /> 환영합니다!
        </S.LoginTitle>
        <S.LoginText>로그인하고 서비스를 이용해 주세요</S.LoginText>
      </S.LoginHeader>
      <S.LoginMain>
        <S.LoginBtnBox>
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
        </S.LoginBtnBox>
        <S.Span>또는</S.Span>
        <AuthForm />
        <S.NavUserInfo>
          <S.NavUserInfoLink onClick={() => navigate('/register')}>
            회원가입
          </S.NavUserInfoLink>
          <S.NavUserInfoLink onClick={() => navigate('/password/find')}>
            비밀번호 찾기
          </S.NavUserInfoLink>
        </S.NavUserInfo>
      </S.LoginMain>
    </S.LoginWrap>
  );
}
