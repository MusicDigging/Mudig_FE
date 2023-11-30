import React from 'react';
import styled from 'styled-components';
import { SignupForm } from '../../components/common/Form/SignupForm';
import { SignUpAtom } from '../../library/atom';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
export default function SignupDetail() {
  const setSignup = useSetRecoilState(SignUpAtom);
  const navigate = useNavigate();
  const onSubmit = (data) => {
    setSignup(data);
    navigate('/login');
  };
  return (
    <SingupDetailWrap>
      <PageNum>1/3</PageNum>
      <SignupDetailBox>
        <DetailTitle>
          회원가입을 위해 <br />
          아래의 정보를 입력해 주세요
        </DetailTitle>
      </SignupDetailBox>
      <Main>
        <SignupForm onSubmit={onSubmit} />
      </Main>
    </SingupDetailWrap>
  );
}

const SingupDetailWrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const SignupDetailBox = styled.div`
  display: flex;
  position: relative;
  top: 56px;
  left: 16px;
  line-height: 33px;
`;

const PageNum = styled.span`
  position: absolute;
  top: 24px;
  left: 317px;
  font-size: var(--font-l);
  color: var(--sub-font--color);
  font-weight: 500;
`;

const DetailTitle = styled.h1`
  font-size: var(--font-xl);
  font-weight: var(--font-bold);
`;

const Main = styled.div`
  /* width: 360px; */
  /* box-shadow: 0 0 10px red inset; */
  display: flex;
  justify-content: center;
`;
