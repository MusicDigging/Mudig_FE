import styled from 'styled-components';
import { Button } from '../Button/Button';
import CloseIcon from '../../../img/close-icon.svg';
import ArrowIcon from '../../../img/arrow-icon.svg';
import { useState } from 'react';
export default function Modal(props) {
  const { title } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [isPrivateView, setIsPrivateView] = useState(false);
  const handleClose = () => {
    setModalOpen(false);
  };
  const handlePrivateSetting = () => {
    setIsPrivateView(true);
  };
  return (
    <ModalWrap>
      <ModalBox>
        <h2>{title}</h2>
        {!isPrivateView ? (
          <ContentBox>
            <p>공개</p>
            <button onClick={handlePrivateSetting}>
              <img src={ArrowIcon} alt='더보기' />
            </button>
          </ContentBox>
        ) : (
          <PickBtnBox>
            <button>공개</button>
            <button>비공개</button>
          </PickBtnBox>
        )}

        <Button text='확인' btnWidth='295px' />
        <CloseBtn onClick={handleClose}>
          <img src={CloseIcon} alt='닫기' />
        </CloseBtn>
      </ModalBox>
    </ModalWrap>
  );
}
const ModalWrap = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  width: 360px;
  height: 800px;
  background: rgba(0, 0, 0, 0.5);
`;
const ModalBox = styled.div`
  /* position: fixed; */
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 327px;
  padding: 16px;
  border-radius: 10px;
  background-color: #fff;
  top: 0;
  transform: translate(5%, 100%);
  h2 {
    margin: 40px 0 0;
  }
`;
const ContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  font-size: var(--font-md);
  padding: 12px 16px;
  background-color: var(--input-background-color);
  line-height: normal;
  button {
    height: 24px;
  }
`;
const PickBtnBox = styled.div`
  width: 295px;
  button {
    display: block;
    width: 100%;
    height: 44px;
    text-align: left;
    padding: 12px 16px;
    border: 1px solid var(--input-background-color);
    font-size: var(--font-md);
    color: var(--font-color);
    &:first-child {
      border-radius: 10px 10px 0px 0px;
      border-bottom: none;
    }
    &:last-child {
      border-radius: 0px 0px 10px 10px;
    }
    &:active {
      background-color: var(--input-background-color);
    }
  }
`;
const CloseBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  margin: 16px;
`;
