import styled from 'styled-components';
import UserLeaveForm from './UserLeaveForm';
import BackBtnIcon from '../../img/left-arrow-Icon.svg';
import { useNavigate } from 'react-router-dom';

export default function UserLeave() {
  const navigate = useNavigate();
  return (
    <UserLeavewWrap>
      <BackBtn>
        <button onClick={() => navigate(-1)}>
          <img src={BackBtnIcon} alt='뒤로가기 버튼' />
        </button>
      </BackBtn>
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
