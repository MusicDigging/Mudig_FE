import React from 'react';
import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '../../components/common/Button/Button';
import { SignupInput } from '../../components/common/Input/SignupInput';
import usePasswordToggle from '../../hooks/ussPasswordToggle';
export default function ChangePwForm() {
  const pawwrodRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;
  const methods = useForm({
    defaultValues: {
      email: 'mudic@naver.com',
    },

    mode: 'onBlur',
  });
  const { formState } = methods;
  const { isValid } = formState;
  const onSubmit = (data) => console.log(data);
  const { toggleShowPassword, showPassword } = usePasswordToggle();
  return (
    <FormProvider {...methods}>
      <FormWrap onSubmit={methods.handleSubmit(onSubmit)}>
        <InputBox>
          <SignupInput placeholder='아이디' type='text' name='email' />

          <SignupInput
            validation={{
              pattern: {
                value: pawwrodRegex, //기능개발할땐 기존 유저 비밀번호를 검사해야 됨
                message: 'X 8~16자 영문 대 소문자, 숫자를 사용하세요.',
              },
              required: '현재 비밀번호가 기억나지 않으세요?',
            }}
            placeholder='현재 비밀번호'
            type='password'
            name='password'
            showPassword={showPassword.password}
            toggleShowPassword={() => toggleShowPassword('password')}
          />

          <SignupInput
            validation={{
              pattern: {
                value: pawwrodRegex,
                message: 'X 8~16자 영문 대 소문자, 숫자를 사용하세요.',
              },
              required: 'X 8~16자 영문 대 소문자, 숫자를 사용하세요.',
            }}
            placeholder='새 비밀번호'
            type='password'
            name='newPassword'
            showPassword={showPassword.newPassword}
            toggleShowPassword={() => toggleShowPassword('newPassword')}
          />
          <SignupInput
            validation={{
              pattern: {
                value: pawwrodRegex,
                message: 'X 8~16자 영문 대 소문자, 숫자를 사용하세요.',
              },
              required: 'X 8~16자 영문 대 소문자, 숫자를 사용하세요.',
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
            onSubmit={onSubmit}
            disabled={!isValid}
          ></Button>
        </ButtonBox>
      </FormWrap>
    </FormProvider>
  );
}

const FormWrap = styled.form``;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 261px;
  padding: 0px 16px;
`;

const ButtonBox = styled.div`
  position: absolute;
  top: 732px;
  padding: 0 16px;
`;
