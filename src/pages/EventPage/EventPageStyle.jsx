import styled, { css, keyframes } from 'styled-components';
import closeIcon from '../../img/close-icon.svg';
import eventPageBg from '../../img/eventPageBg.svg';

const moveDiagonally = keyframes`
  0% {
    background-position: -150px -62px;
  }
  100% {
    background-position: -90px -60px;
  }
`;

export const EventPageWrap = styled.div`
  max-width: 430px;
  height: 100vh;
  background-repeat: no-repeat;
  background-image: url(${eventPageBg});

  /* 애니메이션 적용 */
  animation: ${moveDiagonally} 7s 1;
  animation-fill-mode: forwards; /* 애니메이션이 끝난 후 최종 상태 유지 */
  background-size: auto;
  animation-timing-function: linear;
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

export const QuestionBox = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  width: 360px;
  max-width: 100%;
  transform: translateX(-50%);
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
    font-weight: var(--font-semi-bold);
  }
  div {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 12px;
    color: #9e9e9e;
  }
`;
