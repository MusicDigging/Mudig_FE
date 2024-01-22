import styled from 'styled-components';

export const EditProfileWrap = styled.main`
  height: 100%;
`;

export const EditProfileBox = styled.div`
  padding: 72px 16px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  height: 100%;
  gap: 40px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MoveBackBtn = styled.button`
  position: absolute;
  top: 22px;
  left: 16px;
`;
export const ToastBox = styled.div`
  position: absolute;
  top: 13px;
  left: 50%;
  transform: translate(-50%);
  z-index: 10;
`;
