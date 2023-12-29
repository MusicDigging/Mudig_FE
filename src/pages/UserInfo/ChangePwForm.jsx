import React from 'react';
import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '../../components/common/Button/Button';
import { SignupInput } from '../../components/common/Input/SignupInput';
import usePasswordToggle from '../../hooks/ussPasswordToggle';
import { isLoginAtom, toastAtom, userInfoAtom } from '../../library/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useChangePassword } from '../../hooks/queries/useUserInfo';

import {
  showCustomModal,
  changePassworrdModal,
} from '../../library/sweetAlert/sweetAlert';
import { useNavigate } from 'react-router-dom';

export default function ChangePwForm() {
  const navigate = useNavigate();
  const userEmail = useRecoilValue(userInfoAtom).email;
  const { mutate: changePassword } = useChangePassword();
  const setIsLogin = useSetRecoilState(isLoginAtom);
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const setToast = useSetRecoilState(toastAtom);
  const pawwrodRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;
  const methods = useForm({
    defaultValues: {
      email: userEmail,
    },

    mode: 'onBlur',
  });

  const { formState, setError, watch, getValues } = methods;
  const { isValid } = formState;

  const handlePasswordSubmit = (data) => {
    changePassword(data, {
      onSuccess: (data) => {
        setToast({
          content: '비밀번호 변경이 완료되었습니다.',
          type: 'success',
        });
        setIsLogin(false);
        setUserInfo({});
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
                value: pawwrodRegex,
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
                value: pawwrodRegex,
                message:
                  '비밀번호는 8~16자 영문 대 소문자, 숫자를 조합해서 사용하세요.',
              },
              validate: {
                comfirmPw: (fieldValue) => {
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
                value: pawwrodRegex,
                message:
                  '비밀번호는 8~16자 영문 대 소문자, 숫자를 조합해서 사용하세요.',
              },
              validate: {
                comfirmPw: (fieldValue) => {
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
            onSubmit={handlePasswordSubmit}
            disabled={!isValid}
          ></Button>
        </ButtonBox>
      </FormWrap>
    </FormProvider>
  );
}

const FormWrap = styled.form`
  height: 100%;
  padding: 0px 16px;
`;

const InputTitle = styled.p`
  font-size: var(--font-md);
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 261px;
  gap: 4px;
  /* gap: 4px; */
`;

const ButtonBox = styled.div`
  position: absolute;
  bottom: 24px;
`;
