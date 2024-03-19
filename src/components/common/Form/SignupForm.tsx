import { useForm, FormProvider } from 'react-hook-form';
import styled from 'styled-components';
import { SignupInput } from '../Input/SignupInput';
import { Button } from '../Button/Button';
import usePasswordToggle from '../../../hooks/usePasswordToggle';
import { useState } from 'react';
import { useOtpValid } from '../../../hooks/queries/useUserInfo';
import { IOtpResponse } from '../../../types/setUser';
interface Props {
  onSubmit: (data: { email: string; password: string }) => void;
  onEmailToastMsg?: () => void;
}

export const SignupForm = ({ onSubmit, onEmailToastMsg }: Props) => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  const pawwrodRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;
  const { mutate: postOtpValid } = useOtpValid();
  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
      otpNum: '',
    },
    mode: 'onBlur',
  });
  const { formState, watch, setError } = methods;
  const { isValid } = formState;

  const watchEmail = watch('email');
  const watchOtpNum = watch('otpNum');

  const { toggleShowPassword, showPassword } = usePasswordToggle();
  const [isEmailValidated, setIsEmailValidated] = useState(false);

  const [otpNum, setOtpNum] = useState('');

  //인증버튼 활성화 확인 여부 변수
  const disabledConfirm = emailRegex.test(watchEmail);
  const isOtpValidated = isEmailValidated && watchOtpNum !== '';
  const formIsValid = isValid && isOtpValidated;

  const handleEmailValidation = () => {
    if (!disabledConfirm) {
      setIsEmailValidated(false);

      return;
    }
    setIsEmailValidated(true);
    postOtpValid(watchEmail, {
      onSuccess: (data: IOtpResponse) => {
        if (onEmailToastMsg) {
          onEmailToastMsg();
        }
        const otp = data.otp;

        setOtpNum(otp);
      },
      onError: (error) => {
        setError('email', {
          message: '이미 가입된 이메일입니다.',
        });
        console.error('otp 전송 실패', error);
      },
    });
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
                    message: '이메일 형식에 맞지 않는 메일주소 입니다.',
                  },
                  required: '이메일을 입력하세요',
                }}
                placeholder='이메일'
                type='text'
                name='email'
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
                  comfirmOtp: (fieldValue: string) => {
                    return (
                      fieldValue.trim() === otpNum ||
                      '인증번호가 일치하지 않습니다.'
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
                  message:
                    '비밀번호는 8~16자 영문 대 소문자, 숫자를 조합해서 사용하세요.',
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
          <Button text='다음' type='submit' disabled={!formIsValid}></Button>
        </ButtonBox>
      </Form>
      {/* <DevTool control={control} /> */}
    </FormProvider>
  );
};

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 335px;
  padding-bottom: 24px;
`;

const FormContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const EmailValidBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  button {
    flex-shrink: 0;
  }
`;

const Box = styled.div`
  flex: 1 0 0;
`;

const ButtonBox = styled.div`
  width: 100%;
  /* position: absolute; */

  bottom: 24px;
`;

const PasswordContainer = styled.div`
  display: flex;

  flex-direction: column;
`;
