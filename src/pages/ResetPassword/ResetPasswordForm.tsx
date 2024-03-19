import React from 'react';
import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '../../components/common/Button/Button';
import { SignupInput } from '../../components/common/Input/SignupInput';
import usePasswordToggle from '../../hooks/usePasswordToggle';
import { toastAtom } from '../../library/atom';
import { useSetRecoilState } from 'recoil';
import {
  useChangePassword,
  useSetNewPassword,
} from '../../hooks/queries/useUserInfo';
import { useNavigate } from 'react-router-dom';

export default function ResetPasswordForm() {
  const navigate = useNavigate();

  const { mutate: setNewPassword } = useSetNewPassword();

  const setToast = useSetRecoilState(toastAtom);
  const pawwrodRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;
  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },

    mode: 'onBlur',
  });

  const { formState, setError, watch, getValues } = methods;
  const { isValid } = formState;
  const password = watch('password');
  const handlePasswordSubmit = () => {
    setNewPassword(password, {
      onSuccess: (data) => {
        setToast({
          content: '비밀번호 변경이 완료되었습니다.',
          type: 'success',
        });
        navigate('/login');
        localStorage.removeItem('token');
        console.log(data);
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
          <InputTitle>새 비밀번호</InputTitle>
          <SignupInput
            validation={{
              pattern: {
                value: pawwrodRegex,
                message:
                  '비밀번호는 8~16자 영문 대 소문자, 숫자를 조합해서 사용하세요.',
              },

              required:
                '비밀번호는 8~16자 영문 대 소문자, 숫자를 조합해서 사용하세요.',
            }}
            placeholder='새 비밀번호'
            type='password'
            name='password'
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
                comfirmPw: (fieldValue: string) => {
                  return (
                    fieldValue == watch('password') ||
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
            // onClick={() => handlePasswordSubmit(getValues())}
            disabled={!isValid}
          ></Button>
        </ButtonBox>
      </FormWrap>
    </FormProvider>
  );
}

const FormWrap = styled.form`
  flex: 1 0 0;
  padding: 241px 16px 24px;
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
