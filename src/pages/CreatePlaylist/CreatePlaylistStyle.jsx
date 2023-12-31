import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

import { Link } from 'react-router-dom';

export const CreateNewPlaylistWrap = styled.main`
  height: 100%;

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
  height: 100%;
  padding: 60px 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const QuestionBox = styled.div`
  min-height: 84px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: var(--font-lg);
  font-weight: var(--font-semi-bold);
`;

export const AnswerForm = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  div {
    min-height: 38px;
  }
  span {
    display: flex;
    justify-content: flex-end;
    margin-top: 8px;
    margin-right: 4px;
    font-size: var(--font-md);
    color: var(--sub-font-color);
  }
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
    display: none;
  }
`;

export const LinkBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const NextLink = styled(Link)`
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: var(--main-color);
  color: white;
  font-size: var(--font-md);
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`;
export const CompleteBtn = styled(NextLink)``;

export const BackLink = styled(NextLink)`
  background: #fff;
  color: var(--main-color);
  bottom: 88px;
`;
