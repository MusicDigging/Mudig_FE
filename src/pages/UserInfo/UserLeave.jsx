import React from 'react';
import styled from 'styled-components';
import UserLeaveForm from './UserLeaveForm';
export default function UserLeave() {
  return (
    <UserLeavewWrap>
      <UserLeaveTitle>
        본인확인을 위해
        <br />
        뮤딕아이디의 비밀번호를
        <br />
        입력해주세요
      </UserLeaveTitle>
      <UserLeaveForm />
    </UserLeavewWrap>
  );
}

const UserLeavewWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const UserLeaveTitle = styled.h1`
  font-size: var(--font-xl);
  font-weight: var(--font-bold);
  line-height: 33px;
  position: relative;
  top: 56px;
  left: 16px;
`;
