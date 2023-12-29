import { motion } from 'framer-motion';
import styled from 'styled-components';

export const CommentWrap = styled.div`
  height: 100%;
`;
export const CommentBox = styled(motion.div)`
  background-color: #fff;
  height: 100%;
`;
export const CommentTop = styled.header`
  position: relative;
  height: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: #fff;
  background-color: var(--main-color);
  h1 {
    font-size: var(--font-lg);
    font-weight: var(--font-semi-bold);
  }
  p {
    max-width: 240px;
    font-size: 11px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const CommentListBox = styled.main`
  padding: 16px 16px 88px;
`;

export const BackBtn = styled.button`
  position: absolute;
  top: 22px;
  left: 16px;
  filter: invert(100%) sepia(75%) saturate(1%) hue-rotate(10deg)
    brightness(104%) contrast(101%);
`;

export const ReplyBtnBox = styled.div`
  &.isReply {
    padding-bottom: 6px;
    border-bottom: 1px solid #ededed;
  }
`;

export const ReplyBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: var(--font-sm);
  color: var(--sub-font-color);
`;
