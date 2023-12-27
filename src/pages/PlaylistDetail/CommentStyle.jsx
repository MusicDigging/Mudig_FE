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
  height: 80px;
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
    font-size: 11px;
  }
`;

export const CommentListBox = styled.main`
  padding: 16px 16px 88px;
`;

export const BackBtn = styled.button`
  position: absolute;
  left: 22.5px;
`;

export const ReplyBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: var(--font-sm);
  color: var(--sub-font-color);
`;

export const ToastBox = styled.div`
  position: absolute;
  top: 13px;
  left: 13px;
  z-index: 1;
`;
