import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import SuccessIcon from '../../img/success-icon.svg';
import ErrorIcon from '../../img/error-icon.svg';
import WarningIcon from '../../img/warning-icon.svg';

export default function Toast({ setToast, text, type }) {
  let timer;
  const handleAnimationComplete = () => {
    timer = setTimeout(() => {
      setToast(false);
    }, 1500);
  };
  useEffect(() => {
    return () => clearTimeout(timer);
  }, []);

  return (
    <ToastWrap>
      <ToastBox
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 1.3, ease: 'easeInOut' }}
        onAnimationComplete={handleAnimationComplete}
        type={type}
      >
        <img
          src={
            type === 'success'
              ? SuccessIcon
              : type === 'error'
                ? ErrorIcon
                : WarningIcon
          }
          alt=''
        />
        <p>{text}</p>
      </ToastBox>
    </ToastWrap>
  );
}

const ToastWrap = styled.div`
  position: absolute;
  top: 13px;
  left: 13px;
  z-index: 10;
  width: 94%;
`;
const ToastBox = styled(motion.div)`
  width: 100%;
  min-width: 334px;
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: ${(props) =>
    props.type === 'success'
      ? '#faf8ff'
      : props.type === 'error'
        ? '#FFEFF3'
        : '#FFF3E8'};
  border: ${(props) =>
    props.type === 'success'
      ? '1px solid var(--main-color)'
      : props.type === 'error'
        ? '1px solid #FF434B'
        : '1px solid #FF9D43'};
  padding: 24px 22px;
  border-radius: 10px;
  color: var(--font-color);
  font-size: var(--font-md);
  font-weight: var(--font-semi-bold);

  img {
    width: 22px;
    height: 22px;
  }
`;
