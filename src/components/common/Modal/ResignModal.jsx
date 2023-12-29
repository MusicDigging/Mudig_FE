import React from 'react';
import styled from 'styled-components';
import warningIcon from '../../../img/warning-red-icon.svg';
import { useSetRecoilState } from 'recoil';
import { modalAtom } from '../../../atoms/modalAtom';

export default function ResignModal({ handleResign }) {
  const setModalOpen = useSetRecoilState(modalAtom);

  return (
    <ModalWrap>
      <ModalBox>
        <ModalImg src={warningIcon} alt='' />
        <ModalTextBox>
          <h1>정말로 탈퇴하시겠어요?</h1>
          <p>
            탈퇴 버튼 선택 시, <br /> 계정은 삭제되며 복구되지 않습니다.{' '}
          </p>
        </ModalTextBox>
        <ModalBtnBox>
          <CanlcleBtn onClick={() => setModalOpen(false)}>취소</CanlcleBtn>
          <ResignBtn onClick={handleResign}>탈퇴</ResignBtn>
        </ModalBtnBox>
      </ModalBox>
    </ModalWrap>
  );
}

const ModalWrap = styled.div`
  position: absolute;
  z-index: 100;
  top: 0;
  width: 100%;

  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 322px;
  position: absolute;
  top: 25%;
  left: 5%;
  padding: 20px 16px 16px 16px;
  border-radius: 10px;
  background-color: white;
`;

const ModalTextBox = styled.div`
  margin: 16px 0 16px 0;
  /* width: 238px; */
  h1 {
    /* padding: 16px 0 8px 0; */
    padding-bottom: 8px;
    font-weight: var(--font-bold);
    text-align: center;
    font-size: var(--font-lg);
    line-height: 24px;
  }
  p {
    text-align: center;
    font-size: var(--font-md);
    line-height: 21px;
    color: var(--sub-font-color);
  }
`;

const ModalBtnBox = styled.div`
  display: flex;
  gap: 4px;
`;

const ResignBtn = styled.button`
  width: 143px;
  padding: 8px 16px;
  border-radius: 10px;
  height: 44px;
  background-color: #ff434b;
  font-weight: var(--font-semi-bold);
  color: white;
`;
const CanlcleBtn = styled(ResignBtn)`
  background-color: #f6f6f6;
  color: var(--sub-font-color);
`;

const ModalImg = styled.img``;
