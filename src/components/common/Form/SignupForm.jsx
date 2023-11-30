import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import styled from 'styled-components';
import { SignupInput } from '../Input/SignupInput';
import { Button } from '../Button/Button';
import usePasswordToggle from '../../../hooks/ussPasswordToggle';
import { useState } from 'react';

export const SignupForm = ({ onSubmit }) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  const pawwrodRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;
  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmNum: '',
    },
    mode: 'onBlur',
  });
  const { formState, control, watch } = methods;
  const { isValid } = formState;

  const watchEmail = watch('email');
  const { toggleShowPassword, showPassword } = usePasswordToggle();
  const [isEmailValidated, setIsEmailValidated] = useState(false);
  const [showTimeText, setShowTimeText] = useState(false);
  //인증버튼 활성화 확인 여부 변수
  const disabledConfirm = emailRegex.test(watchEmail);

  const handleEmailValidation = () => {
    if (disabledConfirm) {
      setIsEmailValidated(true);
      setShowTimeText(true);
      console.log('이메일 검사 통과 인증번호 제공');
    } else {
      setIsEmailValidated(false);
      setShowTimeText(false);
      console.log('이메일 검사 실패');
    }
  };

  return (
    <FormProvider {...methods}>
      <FormContainer onSubmit={methods.handleSubmit(onSubmit)}>
        <EmailValidBox>
          <Box>
            <SignupInput
              validation={{
                pattern: {
                  value: emailRegex,
                  message: '이메일을 다시 확인해주세요.',
                },
                required: '이메일을 입력하세요',
              }}
              placeholder='이메일'
              type='text'
              name='email'
              btnWidth='211px'
              showTimeText={showTimeText}
            />
          </Box>
          <Button
            btnWidth='101px'
            text='인증'
            type='button'
            onClick={handleEmailValidation}
            disabled={!disabledConfirm}
          />
        </EmailValidBox>
        {isEmailValidated && (
          <SignupInput
            validation={{
              // pattern: {
              //   value: 백에서 받아온 인증번호
              //   message: '인증번호가 일치하지 않습니다.',
              // }, 차후 인증번호 유효성 구현
              required: '인증번호가 오지 않으셨나요?',
            }}
            placeholder='인증번호'
            type='text'
            name='confirmNum'
          />
        )}
        <PasswordContainer>
          <SignupInput
            validation={{
              pattern: {
                value: pawwrodRegex,
                message: 'X 8~16자 영문 대 소문자, 숫자를 사용하세요.',
              },
              required: '비밀번호를 입력하세요.',
            }}
            placeholder='비밀번호 '
            type='password'
            name='password'
            showPassword={showPassword.password}
            toggleShowPassword={() => toggleShowPassword('password')}
          />
        </PasswordContainer>
        <ButtonBox>
          <Button text='로그인' type='submit' disabled={!isValid}></Button>
        </ButtonBox>
      </FormContainer>
      <DevTool control={control} />
    </FormProvider>
  );
};

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 335px;
`;

const EmailValidBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  /* box-shadow: 0 0 10px red inset; */
  /* margin-bottom: 16px; */
`;

const Box = styled.div``;

const ButtonBox = styled.div`
  position: absolute;
  top: 397px;
`;

const PasswordContainer = styled.div`
  /* position: relative; */
  display: flex;
  flex-direction: column;
`;
