import React from 'react';
import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '../../components/common/Button/Button';
import { SignupInput } from '../../components/common/Input/SignupInput';
import usePasswordToggle from '../../hooks/ussPasswordToggle';
export default function UserLeaveForm() {
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
              required: 'X 8~16자 영문 대 소문자, 숫자를 사용하세요.',
            }}
            placeholder='비밀번호'
            type='password'
            name='password'
            showPassword={showPassword.password}
            toggleShowPassword={() => toggleShowPassword('password')}
          />
        </InputBox>
        <ButtonBox>
          <Button text='변경' type='submit' disabled={!isValid}></Button>
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
  padding: 0 16px;
  top: 348px;
`;

const ButtonBox = styled.div`
  position: absolute;
  top: 755px;
  padding: 0 16px;
`;
