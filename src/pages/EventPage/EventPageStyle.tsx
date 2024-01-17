import styled, { css, keyframes } from 'styled-components';
import closeIcon from '../../img/close-icon-white.svg';
import eventPageBg from '../../img/eventPageBg.svg';
import checkMark from '../../img/checkmark.svg';

const moveDiagonally = keyframes`
  0% {
    background-position: -100px -260px;
  }
  100% {
    background-position: -80px -260px;
  }
`;

export const EventPageWrap = styled.div`
  max-width: 430px;
  height: 150vh;
  background-repeat: no-repeat;
  background-image: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,

      rgba(255, 255, 255, 0) 60%,
      rgba(255, 255, 255, 1) 100%
    ),
    url(${eventPageBg});
  background-size: 600px;
  // background-position: -80px -260px; // 필요에 따라 이 위치 조정을 활성화하거나 조정할 수 있습니다.

  /* 애니메이션 적용 */
  animation: ${moveDiagonally} 7s 1;
  animation-fill-mode: forwards; /* 애니메이션이 끝난 후 최종 상태 유지 */
  animation-timing-function: linear;
`;
export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
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
  #answer {
    width: 328px;
    height: 44px;
    padding: 10px 16px;
    border-radius: 5px;
    display: block;
    margin: 14px auto 10px auto;
  }
  h1 {
    margin-left: 16px;
    font-size: 22px;
    font-weight: var(--font-semi-bold);
    color: #fff;
  }
  #textValue {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 12px;
    color: #fff;
  }
`;

export const NotTodayBox = styled.div`
  width: 200px;
  display: flex;
  margin: 14px 0 52px 0;
  padding: 0px 0px 0px 15px;
  gap: 5px;
  align-items: center; // 텍스트와 정렬을 맞추기 위해 추가

  // 체크박스 스타일 설정
  input[type='checkbox'] {
    -webkit-appearance: none; // 기본 체크박스 스타일 제거
    -moz-appearance: none; // 기본 체크박스 스타일 제거
    appearance: none; // 기본 체크박스 스타일 제거
    width: 14px; // 체크박스 크기 설정
    height: 14px; // 체크박스 크기 설정
    border: 1px solid #fff; // 테두리 설정
    border-radius: 3px; // 모서리 둥글게
    background-color: rgba(255, 255, 255, 0.6); // 배경색 설정
    cursor: pointer; // 마우스 오버시 커서 변경
    position: relative; // 후속 위치 지정을 위해 relative 설정

    // 체크박스가 체크되었을 때 스타일
    &:checked {
      background-image: url(${checkMark}); // 체크 이미지 설정
      background-position: center; // 이미지 중앙 정렬
      background-repeat: no-repeat; // 이미지 반복 없음
      background-size: contain; // 이미지 사이즈 조정
      border: none; // 테두리 설정
    }
  }

  // 체크박스 라벨
  p {
    color: #fff; // 텍스트 색상
    font-size: 12px; // 텍스트 크기
  }
`;
