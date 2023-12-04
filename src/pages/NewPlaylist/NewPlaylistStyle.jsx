import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import BgImg from '../../img/background-img.svg';

export const NewPlaylistWrap = styled.main`
  background-image: url(${BgImg}); // 임시 적용
  padding: 36px 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 36px;
`;

export const QuestionBox = styled.div`
  height: 84px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: var(--font-lg);
`;

export const Answer = styled(TextareaAutosize)`
  width: 100%;
  height: 60px;
  padding: 22px 18px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.7);
  resize: none;
  &:placeholder {
    color: var(--sub-font-color);
  }
  &::-webkit-scrollbar {
    width: 8px;
    /* width: 15px; */ //여백 있을 때
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--btn-border-color);
    /* border: 4px solid #fff; */ //여백 있을 때
    border-radius: 10px;
  }
`;
