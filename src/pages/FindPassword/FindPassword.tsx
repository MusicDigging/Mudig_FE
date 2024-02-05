import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import BackBtnIcon from '../../img/left-arrow-Icon.svg';
import FindPasswordForm from './FindPasswordForm';

export default function FindPassword() {
  const navigate = useNavigate();
  return (
    <FindPasswordWrap>
      <BackBtn>
        <button onClick={() => navigate(-1)}>
          <img src={BackBtnIcon} alt='뒤로가기 버튼' />
        </button>
      </BackBtn>
      <FindPasswordTitle>
        본인확인을 위해
        <br />
        뮤딕아이디의 이메일을
        <br />
        입력해주세요
      </FindPasswordTitle>
      <FindPasswordForm />
    </FindPasswordWrap>
  );
}

const FindPasswordWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const BackBtn = styled.div`
  position: absolute;
  top: 22px;
  left: 16px;
`;

const FindPasswordTitle = styled.h1`
  font-size: var(--font-xl);
  font-weight: var(--font-bold);
  line-height: 33px;
  position: relative;
  top: 56px;

  left: 16px;
`;
