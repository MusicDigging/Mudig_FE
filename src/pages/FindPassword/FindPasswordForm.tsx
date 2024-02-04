import styled from 'styled-components';
import { useForm, FormProvider, FieldValues } from 'react-hook-form';
import { Button } from '../../components/common/Button/Button';
import { SignupInput } from '../../components/common/Input/SignupInput';
import { isLoginAtom, userInfoAtom } from '../../library/atom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useUserResign } from '../../hooks/queries/useUserInfo';
import ResignModal from '../../components/common/Modal/ResignModal';
import { useNavigate } from 'react-router-dom';
import { toastAtom } from '../../library/atom';
import { modalAtom } from '../../atoms/modalAtom';
export default function FindPasswordForm() {
  const emailRegex = /^\S+@\S+\.\S+$/;
  const [isModalOpen, setModalOpen] = useRecoilState(modalAtom);
  const setIsLogin = useSetRecoilState(isLoginAtom);
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const setToast = useSetRecoilState(toastAtom);
  const navigate = useNavigate();
  const { mutate: userResign } = useUserResign();
  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
    },

    mode: 'onSubmit',
  });

  const { formState, setError, getValues } = methods;

  const { isValid, errors } = formState;
  const password = getValues('password');
  const passwordError = errors['password'] as FieldValues['password'];

  const handleResign = () => {
    userResign(password, {
      onSuccess: (data) => {
        setIsLogin(false);
        setUserInfo({
          id: 0,
          email: '',
          name: '',
          image: '',
          genre: '',
          about: '',
          rep_playlist: null,
          token: {
            access: '',
            refresh: '',
          },
        });
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setToast({
          content: '새 비밀번호 설정이 완료되었습니다. 다시 로그인 해주세요.',
          type: 'success',
        });
        // console.log(data);
      },

      onError: (error) => {
        console.error('회원탈퇴 실패', error);
        setModalOpen(false);
        setError('password', {
          message: '현재 비밀번호가 일치하지 않습니다.',
        });
      },
    });

    setModalOpen(false);
  };

  const onSubmit = () => {
    setModalOpen(true);
  };

  return (
    <>
      {isModalOpen && <ResignModal handleResign={handleResign} />}
      <FormProvider {...methods}>
        <FormWrap onSubmit={methods.handleSubmit(onSubmit)}>
          <InputBox>
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
              disabled={!isValid || passwordError}
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
`;

const ButtonBox = styled.div`
  width: 100%;

  bottom: 24px;
`;
