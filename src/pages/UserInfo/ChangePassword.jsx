import React from 'react';
import styled from 'styled-components';
import ChangePwForm from './ChangePwForm';
export default function ChangePassword() {
  return (
    <ChangePwWrap>
      <ChangePwTitle>
        뮤딕아이디의
        <br /> 비밀번호를 변경해주세요
      </ChangePwTitle>
      <ChangePwForm />
    </ChangePwWrap>
  );
}

const ChangePwWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const ChangePwTitle = styled.h1`
  font-size: var(--font-xl);
  font-weight: var(--font-bold);
  line-height: 33px;
  position: relative;
  top: 56px;
  left: 16px;
`;
