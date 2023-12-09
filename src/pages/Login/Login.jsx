import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../../components/common/Button/Button';
import { AuthForm } from '../../components/common/Form/AuthForm';
import KakaoIcon from '../../img/kakao-icon.svg';
import GoogleIcon from '../../img/google-icon.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { userInfoAtom } from '../../library/atom';
import {
  getKakaoInfo,
  getGoogleInfo,
  postUserCode,
} from '../../library/apis/api';
import { useMutation, useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';

export default function Login() {
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const navigate = useNavigate();
  const location = useLocation();
  //카카오, 구글 로그인 링크 get 요청
  const { data: kakaoData } = useQuery('kakao', getKakaoInfo);
  const { data: googleData } = useQuery('google', getGoogleInfo);

  const query = new URLSearchParams(location.search);
  const socialQuery = new URLSearchParams(location.search);

  useEffect(() => {
    // 쿼리 파라미터 값 가져오기
    const result = query.get('code') || false;
    const hasScope = socialQuery.get('scope');
    //url에서 scope값을 가지고 있다면 send code post 요청시 social = 'google'로 설정
    if ((result, hasScope)) {
      sendCode(result, 'google');
      //url에서 scope값이 없다면 send code post 요청시 social = 'kakako'로 설정
    } else if (result) {
      sendCode(result, 'kakao');
    }
  }, []);

  const sendCode = async (code, social) => {
    try {
      let response;
      if (social === 'kakao') {
        response = await postUserCode(code, 'kakao');
      } else if (social === 'google') {
        response = await postUserCode(code, 'google');
      }
      //가입 이력이 있을 경우
      if (response.message === '로그인 성공') {
        const { id, email, name, image, genre, about, rep_playlist } =
          response.user;
        const token = response.token;
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
        //가입 이력이 없고 뮤딕 프로필 설정이 필요한 경우
      } else {
        const email = response.email;
        setUserInfo({ email, type: 'social' });
        navigate('/setprofile');
      }
      console.log(response);
    } catch (error) {
      console.error('Error', error);
    }
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
            btnBorder='1px solid #DBDBDB'
            btnColor={'var(--font-color)'}
            imgSrc={GoogleIcon}
            onClick={googleLoginHandler}
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
  color: var(--sub-font--color);
  font-size: var(--font-md);
  line-height: 33px;
`;
const LoginMain = styled.main`
  margin: 0 auto;
  width: 328px;
  position: relative;
  text-align: center;
  top: 149px;
  //top:132px
`;

const LoginBtnBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 30px;
`;

const Span = styled.span`
  position: relative;
  display: block;
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
