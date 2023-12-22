import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import styled from 'styled-components';
import { SignupInput } from '../Input/SignupInput';
import { Button } from '../Button/Button';
import usePasswordToggle from '../../../hooks/ussPasswordToggle';
import { InfoToast } from '../../../library/sweetAlert/sweetAlert';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const SignupForm = ({ onSubmit }) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  const pawwrodRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;
  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });
  const { formState, control, watch, setError } = methods;
  const { isValid } = formState;

  const watchEmail = watch('email');
  const { toggleShowPassword, showPassword } = usePasswordToggle();
  const [isEmailValidated, setIsEmailValidated] = useState(false);
  const [showTimeText, setShowTimeText] = useState(false);
  const [otpNum, setOtpNum] = useState('');

  //인증버튼 활성화 확인 여부 변수
  const disabledConfirm = emailRegex.test(watchEmail);

  useEffect(() => {
    console.log('이메일 인증 활성화 :', isEmailValidated);
  }, [isEmailValidated]);

  const handleEmailValidation = async () => {
    try {
      if (!disabledConfirm) {
        setIsEmailValidated(false);
        setShowTimeText(false);
        console.log('이메일 검사 실패');
        return;
      }
      setIsEmailValidated(true);

      const response = await axios.post('https://api.mudig.co.kr/user/otp/', {
        email: watchEmail,
      });

      if (response.status === 200) {
        InfoToast.fire({
          title: '해당 메일로 인증번호가 전송되었습니다!',
        });
        const { message, otp } = response.data;
        setOtpNum(otp);
      }
    } catch (error) {
      setError('email', {
        message: '이미 가입된 이메일입니다.',
      });
      console.error('otp 전송 실패', error);
    }
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormContainer>
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
                required: '인증번호가 오지 않으셨나요?',
                // custom validate 사용 현재 필드 값과 otpNum 불일치시 '인증번호가 일치하지 않습니다.' 출력
                validate: {
                  comfirmOtp: (fieldValue) => {
                    return (
                      fieldValue == otpNum || '인증번호가 일치하지 않습니다.'
                    );
                  },
                },
              }}
              placeholder='인증번호'
              type='text'
              name='otpNum'
            />
          )}
          <PasswordContainer>
            <SignupInput
              validation={{
                pattern: {
                  value: pawwrodRegex,
                  message: 'X 8~16자 영문 대 소문자, 숫자를 사용하세요.',
                },
                required: '비밀번호를 입력하세요',
              }}
              placeholder='비밀번호'
              type='password'
              name='password'
              showPassword={showPassword.password}
              toggleShowPassword={() => toggleShowPassword('password')}
            />
          </PasswordContainer>
        </FormContainer>

        <ButtonBox>
          <Button text='다음' type='submit' disabled={!isValid}></Button>
        </ButtonBox>
      </Form>
      <DevTool control={control} />
    </FormProvider>
  );
};

const Form = styled.form``;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
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

  bottom: 24px;
`;

const PasswordContainer = styled.div`
  display: flex;

  flex-direction: column;
`;
