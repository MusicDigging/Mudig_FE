import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm, FormProvider, FieldValues } from 'react-hook-form';
import { Button } from '../../components/common/Button/Button';
import { SignupInput } from '../../components/common/Input/SignupInput';
import usePasswordToggle from '../../hooks/ussPasswordToggle';
import { isLoginAtom, userInfoAtom } from '../../library/atom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useUserResign } from '../../hooks/queries/useUserInfo';
import ResignModal from '../../components/common/Modal/ResignModal';
import { useNavigate } from 'react-router-dom';
import { toastAtom } from '../../library/atom';
import { modalAtom } from '../../atoms/modalAtom';
export default function UserLeaveForm() {
  const [isModalOpen, setModalOpen] = useRecoilState(modalAtom);
  const setIsLogin = useSetRecoilState(isLoginAtom);
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const setToast = useSetRecoilState(toastAtom);
  const navigate = useNavigate();
  const userEmail = useRecoilValue(userInfoAtom)?.email;
  const pawwrodRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;
  const { mutate: userResign } = useUserResign();
  const methods = useForm({
    defaultValues: {
      email: userEmail,
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
        setUserInfo(null);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setToast({ content: '회원탈퇴가 완료되었습니다.', type: 'success' });
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
  const { toggleShowPassword, showPassword } = usePasswordToggle();
  return (
    <>
      {isModalOpen && <ResignModal handleResign={handleResign} />}
      <FormProvider {...methods}>
        <FormWrap onSubmit={methods.handleSubmit(onSubmit)}>
          <InputBox>
            <SignupInput placeholder='아이디' type='text' name='email' />
            <SignupInput
              validation={{
                pattern: {
                  value: pawwrodRegex, //기능개발할땐 기존 유저 비밀번호를 검사해야 됨
                  message:
                    '비밀번호는 8~16자 영문 대 소문자, 숫자를 조합해서 사용하세요.',
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
            <Button
              text='회원탈퇴'
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
