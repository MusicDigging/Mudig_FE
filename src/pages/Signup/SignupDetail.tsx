import React, { useState } from 'react';
import styled from 'styled-components';
import { SignupForm } from '../../components/common/Form/SignupForm';
import { signUpInfoAtom, toastAtom } from '../../library/atom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

export default function SignupDetail() {
  const setUserInfo = useSetRecoilState(signUpInfoAtom);
  const [toast, setToast] = useRecoilState(toastAtom);
  const navigate = useNavigate();
  const type = 'mudig';

  interface Props {
    email: string;
    password: string;
  }

  const onSubmit = ({ email, password }: Props) => {
    setUserInfo({ email, password, type });
    navigate('/setprofile');
  };
  const handleToastMessage = () => {
    setToast({
      content: '해당메일로 인증번호가 전송되었습니다. ✉️',
      type: 'success',
    });
  };

  return (
    <SingupDetailWrap>
      <PageNum>1/2</PageNum>
      <SignupDetailBox>
        <DetailTitle>
          회원가입을 위해 <br />
          아래의 정보를 입력해 주세요
        </DetailTitle>
      </SignupDetailBox>
      <Main>
        <SignupForm onSubmit={onSubmit} onEmailToastMsg={handleToastMessage} />
      </Main>
    </SingupDetailWrap>
  );
}

const SingupDetailWrap = styled.div`
  padding: 0 16px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

// const ToastBox = styled.div`
//   position: absolute;
//   top: 13px;
//   left: 13px;
//   z-index: 1;
//   width: 94%;
// `;
const SignupDetailBox = styled.div`
  display: flex;
  position: relative;
  top: 56px;
  /* left: 16px; */
  line-height: 33px;
`;

const PageNum = styled.span`
  position: absolute;
  top: 24px;
  right: 16px;
  font-size: var(--font-l);
  color: var(--sub-font-color);
  font-weight: 500;
`;

const DetailTitle = styled.h1`
  font-size: var(--font-xl);
  font-weight: var(--font-bold);
`;

const Main = styled.div`
  height: 100%;
`;
