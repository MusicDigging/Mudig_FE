import React from 'react';
import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '../../components/common/Button/Button';
import { SignupInput } from '../../components/common/Input/SignupInput';
import usePasswordToggle from '../../hooks/usePasswordToggle';
import { isLoginAtom, toastAtom, userInfoAtom } from '../../library/atom';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { useChangePassword } from '../../hooks/queries/useUserInfo';
import { useNavigate } from 'react-router-dom';
interface IFormData {
  email?: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
}

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;

export default function ChangePwForm() {
  const navigate = useNavigate();
  const userEmail = useRecoilValue(userInfoAtom)?.email;
  const { mutate: changePassword } = useChangePassword();
  const setIsLogin = useSetRecoilState(isLoginAtom);
  const resetUserInfo = useResetRecoilState(userInfoAtom);
  const setToast = useSetRecoilState(toastAtom);
  const methods = useForm({
    defaultValues: {
      email: userEmail,
      password: '',
      newPassword: '',
      confirmPassword: '',
    },

    mode: 'onBlur',
  });

  const { formState, setError, watch, getValues } = methods;
  const { isValid } = formState;

  const handlePasswordSubmit = (data: IFormData) => {
    changePassword(data, {
      onSuccess: (data) => {
        setToast({
          content: '비밀번호 변경이 완료되었습니다.',
          type: 'success',
        });
        setIsLogin(false);
        resetUserInfo();
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        navigate('/login');
      },
      onError: (error) => {
        console.error('비밀번호 변경 실패', error);
        setError('password', { message: '현재 비밀번호가 일치하지 않습니다.' });
      },
    });
  };
  const { toggleShowPassword, showPassword } = usePasswordToggle();
  return (
    <FormProvider {...methods}>
      <FormWrap onSubmit={methods.handleSubmit(handlePasswordSubmit)}>
        <InputBox>
          <InputTitle>이메일 </InputTitle>
          <SignupInput placeholder='이메일' type='text' name='email' />

          <InputTitle>현재 비밀번호</InputTitle>
          <SignupInput
            validation={{
              pattern: {
                value: passwordRegex,
                message:
                  '비밀번호는 8~16자 영문 대 소문자, 숫자를 조합해서 사용하세요.',
              },

              required: '현재 사용중인 비밀번호를 입력하세요.',
            }}
            placeholder='현재 비밀번호'
            type='password'
            name='password'
            showPassword={showPassword.password}
            toggleShowPassword={() => toggleShowPassword('password')}
          />

          <InputTitle>새 비밀번호</InputTitle>
          <SignupInput
            validation={{
              pattern: {
                value: passwordRegex,
                message:
                  '비밀번호는 8~16자 영문 대 소문자, 숫자를 조합해서 사용하세요.',
              },
              validate: {
                comfirmPw: (fieldValue: string) => {
                  const oldPassword = watch('password');

                  if (fieldValue === oldPassword) {
                    return '현재 비밀번호와 새 비밀번호는 동일할 수 없습니다.';
                  }

                  return null;
                },
              },
              required:
                '비밀번호는 8~16자 영문 대 소문자, 숫자를 조합해서 사용하세요.',
            }}
            placeholder='새 비밀번호'
            type='password'
            name='newPassword'
            showPassword={showPassword.newPassword}
            toggleShowPassword={() => toggleShowPassword('newPassword')}
          />
          <InputTitle>새 비밀번호 확인</InputTitle>
          <SignupInput
            validation={{
              pattern: {
                value: passwordRegex,
                message:
                  '비밀번호는 8~16자 영문 대 소문자, 숫자를 조합해서 사용하세요.',
              },
              validate: {
                comfirmPw: (fieldValue: string) => {
                  return (
                    fieldValue == watch('newPassword') ||
                    '새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다. '
                  );
                },
              },

              required:
                '비밀번호는 8~16자 영문 대 소문자, 숫자를 조합해서 사용하세요.',
            }}
            placeholder='새 비밀번호 확인'
            type='password'
            name='confirmPassword'
            showPassword={showPassword.confirmPassword}
            toggleShowPassword={() => toggleShowPassword('confirmPassword')}
          />
        </InputBox>
        <ButtonBox>
          <Button
            text='변경'
            type='submit'
            onClick={() => handlePasswordSubmit(getValues())}
            disabled={!isValid}
          ></Button>
        </ButtonBox>
      </FormWrap>
    </FormProvider>
  );
}

const FormWrap = styled.form`
  flex: 1 0 0;
  padding: 261px 16px 24px;
  width: 100%;
  display: flex;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  flex-direction: column;
  justify-content: space-between;
`;

const InputTitle = styled.p`
  font-size: var(--font-md);
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  gap: 4px;
  /* gap: 4px; */
`;

const ButtonBox = styled.div`
  width: 100%;

  bottom: 24px;
`;
