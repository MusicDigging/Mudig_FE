import { useForm, FormProvider } from 'react-hook-form';
import styled from 'styled-components';
import { AuthInput } from '../Input/AuthInput';
import { Button } from '../Button/Button';
export const AuthForm = () => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  const pawwrodRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;
  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });
  const { formState } = methods;
  const { isValid, errors } = formState;
  const onSubmit = (data) => console.log(data);
  const errorMessage =
    '아이디(로그인 전용 아이디) 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해 주세요';

  return (
    <FormProvider {...methods}>
      <FormContainer onSubmit={methods.handleSubmit(onSubmit)}>
        <AuthInput
          validation={{
            pattern: {
              value: emailRegex,
              message: errorMessage,
            },
            required: true, //true
          }}
          placeholder='이메일을 입력하세요'
          type='text'
          name='email'
          marginBottom
        />
        <AuthInput
          validation={{
            pattern: {
              value: pawwrodRegex,
              message: errorMessage,
            },
            required: true, //true
          }}
          placeholder='비밀번호를 입력하세요 '
          type='password'
          name='password'
        />
        <CheckboxContainer>
          <CheckboxInput
            type='checkbox'
            // checked={autoLogin}
            // onChange={handleCheckboxChange}
          />
          <CheckboxLabel>로그인 상태 유지</CheckboxLabel>
        </CheckboxContainer>
        {errors.email && errors.password && (
          <ErrorMsg>{errors.email.message || errors.password.message}</ErrorMsg>
        )}
        <Button
          btnMargin={'16px 0 0 0'}
          text='로그인'
          type='submit'
          disabled={!isValid}
        ></Button>
      </FormContainer>
    </FormProvider>
  );
};

const FormContainer = styled.form`
  display: flex;
  margin-top: 24px;
  align-items: center;
  flex-direction: column;
  /* gap: 10px; */
`;

const ErrorMsg = styled.span`
  color: red;
  font-size: 12px;
  text-align: left;
  margin-top: 8px;

  line-height: 18px;
`;
const CheckboxContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 16px;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
`;

const CheckboxInput = styled.input`
  appearance: none;
  width: 14px;
  height: 14px;
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

const CheckboxLabel = styled.label`
  font-size: var(--font-md);
  color: var(--font--color);
  cursor: pointer;
`;
