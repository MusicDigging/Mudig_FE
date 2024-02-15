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
import { useMutation, useQuery } from 'react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { ILogin, ISignup } from '../../types/setUser';
export default function Login() {
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const setSignupInfo = useSetRecoilState(signUpInfoAtom);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);

  const { data: kakaoData } = useQuery('kakao', getKakaoInfo);
  const { data: googleData } = useQuery('google', getGoogleInfo);

  const query = new URLSearchParams(location.search);
  const socialQuery = new URLSearchParams(location.search);

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours(); // 0-23 사이의 시간
    if (isLogin) {
      if (hours >= 18 && hours < 24) {
        navigate('/event');
        console.log(now, hours, isLogin);
      } else {
        // 로그인 상태라면 메인 페이지로 이동
        navigate('/main');
      }
      return;
    }

    // 쿼리 파라미터 값 가져오기
    const result = query.get('code') || false;

    const hasScope = socialQuery.get('scope');
    //url에서 scope값을 가지고 있다면 send code post 요청시 social = 'google'로 설정
    if (result && hasScope) {
      sendCode(result, 'google');
    } else if (result) {
      sendCode(result, 'kakao');
    }
  }, [navigate, isLogin]);

  const sendCode = async (code: string, social: string) => {
    try {
      let response;
      if (social === 'kakao') {
        response = await postUserCode(code, 'kakao');
      } else if (social === 'google') {
        response = await postUserCode(code, 'google');
      }
      //가입 이력이 있을 경우
      if (response.message === '로그인 성공') {
        handleSuccessLogin(response);
        //가입 이력이 없고 뮤딕 프로필 설정이 필요한 경우
      } else {
        handleMoveSignUp(response);
      }
      // console.log(response);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const handleSuccessLogin = (response: ILogin) => {
    const { user, token } = response;
    const { id, email, name, image, genre, about, rep_playlist } = user;
    const { access, refresh } = token;
    localStorage.setItem('token', access);
    localStorage.setItem('refreshToken', refresh);
    setIsLogin(true);
    setUserInfo({
      id,
      email,
      name,
      image,
      genre,
      about,
      rep_playlist,
      token,
    });
    navigate('/main');
  };

  const handleMoveSignUp = (response: ISignup) => {
    const email = response.email;
    setSignupInfo({ email, type: 'social' });
    navigate('/setprofile');
  };

  const kakaoLoginHandler = () => {
    window.location.href = kakaoData.url;
  };

  const googleLoginHandler = () => {
    window.location.href = googleData.url;
  };

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
