import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '../../components/common/Button/Button';
import { SignupInput } from '../../components/common/Input/SignupInput';
import { useSetRecoilState } from 'recoil';
import { useFindPassword } from '../../hooks/queries/useUserInfo';
import { toastAtom } from '../../library/atom';
import { AxiosError } from 'axios';

interface MyResponse {
  data: {
    message: string;
  };

  status: number;
  message: string;
  statusText: string;
}

export default function FindPasswordForm() {
  const emailRegex = /^\S+@\S+\.\S+$/;
  const setToast = useSetRecoilState(toastAtom);
  const { mutate: findPassword } = useFindPassword();

  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
    },

    mode: 'onSubmit',
  });

  const { setError, watch } = methods;

  const email = watch('email');

  const onSubmit = () => {
    findPassword(email, {
      onSuccess: async (data) => {
        setToast({
          content: '해당 이메일로 비밀번호 재설정 링크가 전송되었습니다.',
          type: 'success',
        });
      },

      onError: (error) => {
        console.error('비밀번호 찾기 실패', error);
        const axiosError = error as AxiosError<MyResponse>;
        if (axiosError.response) {
          setError('email', {
            message: axiosError.response.data.message,
          });
        }
      },
    });
  };

  return (
    <>
      <FormProvider {...methods}>
        <FormWrap onSubmit={methods.handleSubmit(onSubmit)}>
          <InputBox>
            <InputTitle>이메일</InputTitle>
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
          </InputBox>

          <ButtonBox>
            <Button
              text='비밀번호 찾기'
              type='submit'
              // disabled={!isValid || passwordError}
            ></Button>
          </ButtonBox>
        </FormWrap>
      </FormProvider>
    </>
  );
}

const FormWrap = styled.form`
  flex: 1 0 0;
  padding: 261px 16px 24px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InputBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InputTitle = styled.p`
  font-size: var(--font-md);
`;

const ButtonBox = styled.div`
  width: 100%;
  bottom: 24px;
`;
