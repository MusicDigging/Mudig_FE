import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { isLoginAtom, signUpInfoAtom, userInfoAtom } from '../library/atom';
import { useQuery } from 'react-query';
import { postUserCode } from '../library/apis/api';
interface ISocialData {
  url: string;
}

export function useSocialLogin(
  socialData: () => Promise<ISocialData>,
  socialType: string,
) {
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const setSignupInfo = useSetRecoilState(signUpInfoAtom);
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);

  const query = new URLSearchParams(location.search);

  const { data: socialAuthData } = useQuery(socialType, socialData);

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

    //url에서 scope값을 가지고 있다면 send code post 요청시 social = 'google'로 설정
    if (result) {
      sendCode(result, socialType);
    }
  }, [navigate, isLogin]);

  const sendCode = async (code: string, social: string) => {
    try {
      let response;
      if (social === 'kakao' || social === 'google') {
        response = await postUserCode(code, social);
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

  const handleSuccessLogin = (response: any) => {
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

  const handleMoveSignUp = (response: any) => {
    const email = response.email;
    setSignupInfo({ email, type: 'social' });
    navigate('/setprofile');
  };

  const loginHandler = () => {
    window.location.href = socialAuthData?.url || '';
  };

  return loginHandler;
}
