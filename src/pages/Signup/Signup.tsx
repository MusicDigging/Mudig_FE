import React, { useEffect } from 'react';
import { Button } from '../../components/common/Button/Button';
import * as S from './SignupStyle';
import KakaoIcon from '../../img/kakao-icon.svg';
import GoogleIcon from '../../img/google-icon.svg';
import { isLoginAtom, signUpInfoAtom, userInfoAtom } from '../../library/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getKakaoInfo, getGoogleInfo } from '../../library/apis/api';
import { useSocialLogin } from '../../hooks/useSocialLogin';
export default function Signup() {
  const navigate = useNavigate();

  const kakaoLoginHandler = useSocialLogin(getKakaoInfo, 'kakao');
  const googleLoginHandler = useSocialLogin(getGoogleInfo, 'google');

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
            onClick={kakaoLoginHandler}
            alt='카카오로 회원가입하기 버튼'
          />
          <Button
            text='구글로 시작하기'
            btnBgColor='#FFF'
            btnBorder='1px solid #DBDBDB'
            btnColor={'var(--font-color)'}
            imgSrc={GoogleIcon}
            onClick={googleLoginHandler}
            alt='구글로 회원가입하기 버튼'
          />
        </S.SignupBtnBox>
        <S.Span>또는</S.Span>
        <Button
          text='이메일로 시작하기'
          btnBorder='1px solid #DBDBDB'
          alt='이메일로 회원가입하기 버튼'
          onClick={() => navigate('/register/detail')}
        />
        <S.NavLoign>
          <S.NavSpan>이미 계정이 있으신가요? </S.NavSpan>
          <S.LinkLogin onClick={() => navigate('/login')}>
            로그인하기
          </S.LinkLogin>
        </S.NavLoign>
      </S.SignupMain>
      <S.Footer></S.Footer>
    </S.SignupWrap>
  );
}
