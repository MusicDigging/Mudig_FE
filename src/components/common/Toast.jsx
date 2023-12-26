import { motion } from 'framer-motion';
import styled from 'styled-components';

export default function Toast({ setToast, text }) {
  const handleAnimationComplete = () => {
    // 애니메이션이 완료되면 setToast를 false로 설정
    setToast(false);
  };
  return (
    <ToastWrap
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 2.0, ease: 'easeInOut' }}
      onAnimationComplete={handleAnimationComplete}
    >
      <p>{text}</p>
    </ToastWrap>
  );
}

const ToastWrap = styled(motion.div)`
  width: 334px;
  height: 60px;
  background-color: var(--btn-point-color);
  padding: 24px 22px;
  border-radius: 10px;
  color: white;
  font-size: var(--font-md);
  font-weight: var(--font-semi-bold);
  font-weight: 500;
`;
