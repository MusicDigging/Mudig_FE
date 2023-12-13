import styled from 'styled-components';
import closeIcon from '../../img/close-icon.svg';
import eventPageBg from '../../img/eventPageBg.svg';

export const EventPageWrap = styled.div`
  width: 360px;
  height: 100vh;
  background-repeat: no-repeat;
  background-image: url(${eventPageBg});
`;
export const QuestionBox = styled.div`
  position: absolute;
  bottom: 30px;
  left: 0;
  width: 360px;
  input {
    width: 328px;
    height: 44px;
    padding: 10px 16px;
    border-radius: 5px;
    display: block;
    margin: 14px auto 62px auto;
  }
  p {
    margin-left: 16px;
    font-size: 22px;
    font-weight: --font-semi-bold;
  }
  div {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 12px;
    color: #9e9e9e;
  }
`;
export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  background-image: url(${closeIcon});
`;
export const SubmitButton = styled.button`
  display: block;
  width: 328px;
  height: 44px;
  margin: auto;
  border-radius: 5px;
  background: ${({ disabled }) => (disabled ? '#ccc' : '#7d4fff')};
  color: #fff;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

  &:disabled {
    background: #ccc;
  }
`;
