import { useForm, FormProvider } from 'react-hook-form';
import styled from 'styled-components';
import { AuthInput } from '../Input/AuthInput';
import { Button } from '../Button/Button';
import { userInfoAtom, isLoginAtom } from '../../../library/atom';
import { loginUser } from '../../../library/apis/api';
import { useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import usePasswordToggle from '../../../hooks/usePasswordToggle';
import { ILogin } from '../../../types/setUser';
interface ILoginData {
  email: string;
  password: string;
}
const emailRegex = /^\S+@\S+\.\S+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;
const errorMessage = `아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해 주세요`;
export const AuthForm = () => {
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  });
  const { formState } = methods;
  const { errors } = formState;

  const setUserInfo = useSetRecoilState(userInfoAtom);
  const setIsLogin = useSetRecoilState(isLoginAtom);
  const { mutate } = useMutation(loginUser, {
    onSuccess: (data: ILogin) => {
      const { user, token } = data;
      const { id, email, name, image, genre, about, rep_playlist } = user;
      const { access, refresh } = token;
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
      setIsLogin(true);
      localStorage.setItem('token', access);
      localStorage.setItem('refreshToken', refresh);
      navigate('/main');
      // console.log('로그인 성공', data);
    },
    onError: (error) => {
      // console.error('로그인 실패', error);
      methods.setError('email', { message: errorMessage }); //setError methods로 에러 설정
      methods.setError('password', { message: errorMessage }); //setError methods로 에러 설정
    },
  });

  const handleLogin = (data: ILoginData) => {
    mutate(data);
  };

  const handleCheckboxChange = () => {
    const checkbox = document.getElementById('checkbox') as HTMLInputElement;
    if (checkbox) {
      const autoLogin = checkbox.checked;
      localStorage.setItem('autoLogin', autoLogin ? 'true' : 'false');
      // checkbox.click();
    }
  };

  const { toggleShowPassword, showPassword } = usePasswordToggle();
  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(handleLogin)}>
        <FormContainer>
          <AuthInput
            validation={{
              pattern: {
                value: emailRegex,
                message: errorMessage,
              },
              required: true, //true
            }}
            placeholder='이메일을 입력하세요'
            type='email'
            name='email'
            marginBottom
          />
          <AuthInput
            validation={{
              pattern: {
                value: passwordRegex,
                message: errorMessage,
              },
              required: true, //true
            }}
            placeholder='비밀번호를 입력하세요 '
            type='password'
            name='password'
            showPassword={showPassword.password}
            toggleShowPassword={() => toggleShowPassword('password')}
          />

          <AutoLoginCheckBox>
            <CheckboxInput
              type='checkbox'
              onClick={handleCheckboxChange}
              id='checkbox'
            />
            <label htmlFor='checkbox'>로그인 상태 유지</label>
          </AutoLoginCheckBox>
          {/* 이메일 비밀번호 불일치& 유효성검사 실패시 에러메시지 */}
          <ErrorBox>
            {errors.email || errors.password ? (
              <ErrorMsg>
                {errors.email?.message || errors.password?.message}
              </ErrorMsg>
            ) : null}
          </ErrorBox>
        </FormContainer>
        <ButtonBox>
          <Button text='로그인' type='submit'></Button>
        </ButtonBox>
      </Form>
    </FormProvider>
  );
};

const Form = styled.form``;

const FormContainer = styled.div`
  display: flex;
  margin-top: 24px;
  /* align-items: center; */
  flex-direction: column;
  position: relative;
`;

const ErrorBox = styled.div`
  margin-top: 8px;
  color: red;
  font-size: 12px;
  text-align: left;
  line-height: 18px;
  white-space: pre-wrap;
`;

const ErrorMsg = styled.span``;

const ButtonBox = styled.div`
  margin-top: 16px;
`;

const CheckboxInput = styled.input`
  appearance: none;
  width: 14px;
  height: 14px;
  background-color: #fff;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  cursor: pointer;
  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: var(--btn-background-color);
  }
`;
const AutoLoginCheckBox = styled.div`
  display: flex;
  margin-top: 16px;
  gap: 6px;
  align-items: center;
  font-size: var(--font-md);
`;
