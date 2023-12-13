import React from 'react';
import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '../../components/common/Button/Button';
import { SignupInput } from '../../components/common/Input/SignupInput';
import usePasswordToggle from '../../hooks/ussPasswordToggle';
import { userInfoAtom } from '../../library/atom';
import { useRecoilValue } from 'recoil';
import { useMutation } from 'react-query';
import Swal from 'sweetalert2';

import axios from 'axios';
export default function ChangePwForm() {
  const userEmail = useRecoilValue(userInfoAtom).email;
  const token = useRecoilValue(userInfoAtom).token.access;
  const pawwrodRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/;
  const methods = useForm({
    defaultValues: {
      email: userEmail,
    },

    mode: 'onBlur',
  });

  const { formState, setError, watch } = methods;
  const { isValid } = formState;

  const { mutate } = useMutation(async (data) => {
    const { password, newPassword } = data;
    try {
      const response = await axios.put(
        'https://api.mudig.co.kr/user/changepassword/',
        {
          old_password: password,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      Swal.fire({
        icon: 'success',
        title: '비밀번호 변경 완료',
        text: '비밀번호가 성공적으로로 변경되었습니다!',
      });
      console.log(response.data);
    } catch (error) {
      setError('password', { message: '현재 비밀번호가 일치하지 않습니다.' });
      console.error('비밀번호 변경 실패', error);
    }
  });

  const onSubmit = (data) => {
    mutate(data);
  };
  const { toggleShowPassword, showPassword } = usePasswordToggle();
  return (
    <FormProvider {...methods}>
      <FormWrap onSubmit={methods.handleSubmit(onSubmit)}>
        <InputBox>
          <Label>이메일 </Label>
          <SignupInput placeholder='이메일' type='text' name='email' />

          <Label>현재 비밀번호</Label>
          <SignupInput
            validation={{
              pattern: {
                value: pawwrodRegex, //기능개발할땐 기존 유저 비밀번호를 검사해야 됨
                message: 'X 8~16자 영문 대 소문자, 숫자를 사용하세요.',
              },

              required: '현재 사용중인 비밀번호를 입력하세요.',
            }}
            placeholder='현재 비밀번호'
            type='password'
            name='password'
            showPassword={showPassword.password}
            toggleShowPassword={() => toggleShowPassword('password')}
          />
          <Label>새 비밀번호</Label>
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
          <Label>새 비밀번호 확인</Label>
          <SignupInput
            validation={{
              pattern: {
                value: pawwrodRegex,
                message: 'X 8~16자 영문 대 소문자, 숫자를 사용하세요.',
              },
              validate: {
                comfirmPw: (fieldValue) => {
                  return (
                    fieldValue == watch('newPassword') ||
                    '비밀번호 확인이 일치하지 않습니다.'
                  );
                },
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

const FormWrap = styled.form`
  height: 100%;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 261px;
  padding: 0px 16px;
`;

const ButtonBox = styled.div`
  position: absolute;
  top: 755px;
  padding: 0 16px;
`;

const Label = styled.label`
  padding-bottom: 8px;
  font-size: var(--font-md);
`;
