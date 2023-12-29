import React from 'react';
import styled from 'styled-components';
import ChangePwForm from './ChangePwForm';
import BackBtnIcon from '../../img/left-arrow-Icon.svg';
import { useNavigate } from 'react-router-dom';
export default function ChangePassword() {
  const navigate = useNavigate();
  return (
    <ChangePwWrap>
      <BackBtn>
        <button onClick={() => navigate(-1)}>
          <img src={BackBtnIcon} alt='뒤로가기 버튼' />
        </button>
      </BackBtn>
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
  display: flex;
  flex-direction: column;
`;

const ChangePwTitle = styled.h1`
  font-size: var(--font-xl);
  font-weight: var(--font-bold);
  line-height: 33px;
  position: relative;
  top: 56px;
  left: 16px;
`;

const BackBtn = styled.div`
  position: absolute;
  top: 22px;
  left: 16px;
`;
