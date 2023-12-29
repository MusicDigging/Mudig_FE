import styled, { css, keyframes } from 'styled-components';
import styled, { css, keyframes } from 'styled-components';
import closeIcon from '../../img/close-icon.svg';
import eventPageBg from '../../img/eventPageBg.svg';

const moveDiagonally = keyframes`
  0% {
    background-position: -240px -60px;
  }
  100% {
    background-position: -135px -60px;
  }
`;

const moveDiagonally = keyframes`
  0% {
    background-position: -240px -60px;
  }
  100% {
    background-position: -135px -60px;
  }
`;

export const EventPageWrap = styled.div`
  max-width: 430px;
  height: 100vh;
  background-repeat: no-repeat;
  background-image: url(${eventPageBg});

  /* 애니메이션 적용 */
  animation: ${moveDiagonally} 5s 1;
  animation-fill-mode: forwards; /* 애니메이션이 끝난 후 최종 상태 유지 */
  background-size: auto;
  animation-timing-function: linear;
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
