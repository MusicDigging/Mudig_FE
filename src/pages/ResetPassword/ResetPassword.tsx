import styled from 'styled-components';
import BackBtnIcon from '../../img/left-arrow-Icon.svg';
import { useNavigate } from 'react-router-dom';
import ResetPasswordForm from './ResetPasswordForm';

export default function ResetPassword() {
  const navigate = useNavigate();
  return (
    <UserLeavewWrap>
      <BackBtn>
        <button onClick={() => navigate(-1)}>
          <img src={BackBtnIcon} alt='뒤로가기 버튼' />
        </button>
      </BackBtn>
      <UserLeaveTitle>
        뮤딕 아이디의 <br /> 새 비밀번호를 설정해주세요
      </UserLeaveTitle>
      <ResetPasswordForm />
    </UserLeavewWrap>
  );
}

const UserLeavewWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* position: relative;
  padding: 0 16px; */
`;

const BackBtn = styled.div`
  position: absolute;
  top: 22px;
  left: 16px;
`;

const UserLeaveTitle = styled.h1`
  font-size: var(--font-xl);
  font-weight: var(--font-bold);
  line-height: 33px;
  position: relative;
  top: 56px;

  left: 16px;
`;
