import React from 'react';
import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '../../components/common/Button/Button';
import { SignupInput } from '../../components/common/Input/SignupInput';
import usePasswordToggle from '../../hooks/ussPasswordToggle';
import { userInfoAtom } from '../../library/atom';
import { useRecoilValue } from 'recoil';
import { useUserResign } from '../../hooks/queries/useUserInfo';

import { useNavigate } from 'react-router-dom';
import {
  showCustomModal,
  confirmModal,
  successModal,
} from '../../library/sweetAlert/sweetAlert';
export default function UserLeaveForm() {
  const navigate = useNavigate();
  const userEmail = useRecoilValue(userInfoAtom).email;
  const pawwrodRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;
  const { mutate: userResign } = useUserResign();
  const methods = useForm({
    defaultValues: {
      email: userEmail,
    },

    mode: 'onBlur',
  });

  const { formState, setError } = methods;
  const { isValid } = formState;
  const onSubmit = ({ password }) => {
    showCustomModal(confirmModal).then((result) => {
      if (result.isConfirmed) {
        userResign(password, {
          onSuccess: (data) => {
            showCustomModal(successModal);
            navigate('/register');
            console.log(data);
          },
          onError: (error) => {
            console.error('회원탈퇴 실패', error);
            setError('password', {
              message: '현재 비밀번호가 일치하지 않습니다.',
            });
          },
        });
      }
    });
  };
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
              required: '현재 사용중인 비밀번호를 입력하세요.',
            }}
            placeholder='비밀번호'
            type='password'
            name='password'
            showPassword={showPassword.password}
            toggleShowPassword={() => toggleShowPassword('password')}
          />
        </InputBox>
        <ButtonBox>
          <Button text='회원탈퇴' type='submit' disabled={!isValid}></Button>
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
  bottom: 24px;
  padding: 0 16px;
`;
