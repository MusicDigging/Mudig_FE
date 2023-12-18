import React, { useEffect } from 'react';
import { Button } from '../../components/common/Button/Button';
import * as S from './SignupStyle';
import KakaoIcon from '../../img/kakao-icon.svg';
import GoogleIcon from '../../img/google-icon.svg';
import { userInfoAtom } from '../../library/atom';
import { useSetRecoilState } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import {
  getKakaoInfo,
  getGoogleInfo,
  postUserCode,
} from '../../library/apis/api';
export default function Signup() {
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const location = useLocation();
  const navigate = useNavigate();
  const { data: kakaoData } = useQuery('kakao', getKakaoInfo);
  const { data: googleData } = useQuery('google', getGoogleInfo);

  const query = new URLSearchParams(location.search);
  const socialQuery = new URLSearchParams(location.search);

  useEffect(() => {
    // 쿼리 파라미터 값 code(소셜 로그인 인가코드) 가져오기
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
