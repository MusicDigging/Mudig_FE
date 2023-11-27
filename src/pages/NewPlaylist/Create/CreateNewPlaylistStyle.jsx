import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import BgImg from '../../../img/background-img.svg';
import { Link } from 'react-router-dom';

export const CreateNewPlaylistWrap = styled.main`
  position: relative;
  background-image: url(${BgImg}); // 임시 적용
  height: 100%;
  padding-top: 60px;
  img {
    height: 234px;
  }
  span + div {
    height: 100%;
  }
`;

export const PageNum = styled.span`
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 24px 16px;
  display: flex;
  justify-content: flex-end;
  font-size: var(--font-l);
  color: var(--sub-font-color);
`;

export const NewPlaylistBox = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const QuestionBox = styled.div`
  height: 84px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: var(--font-lg);
  font-weight: var(--font-semi-bold);
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
    width: 6px;
    /* width: 15px; */ //여백 있을 때
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--btn-border-color);
    /* border: 4px solid #fff; */ //여백 있을 때
    border-radius: 10px;
  }
`;

export const LinkBtn = styled(Link)`
  position: absolute;
  left: 50%;
  bottom: 24px;
  transform: translate(-50%, 0);
  width: 328px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: var(--point-2, #8969ff);
  color: white;
  font-size: var(--font-md);
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  cursor: ${(props) => (props.disabled ? 'initial' : 'pointer')};
`;
