import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export default function Toast({ setToast, text }) {
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
    <ToastWrap
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1.3, ease: 'easeInOut' }}
      onAnimationComplete={handleAnimationComplete}
    >
      <p>{text}</p>
    </ToastWrap>
  );
}

const ToastWrap = styled(motion.div)`
  width: 334px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--btn-point-color);
  padding: 24px 22px;
  border-radius: 10px;
  color: white;
  font-size: var(--font-md);
  font-weight: var(--font-semi-bold);
`;