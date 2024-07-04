import styled from 'styled-components';

const ModalWrap = styled.div`
  position: absolute;
  z-index: 8;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;
const ModalBox = styled.div`
  position: absolute;
  top: 25%;
  left: 5%;
  min-width: 327px;
  width: 90%;
  padding: 16px;
  border-radius: 10px;
  background-color: #fff;
  h2 {
    margin: 40px 0 0;
  }
`;
const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  input,
  textarea {
    width: 100%;
    padding: 8px 16px;
    border-radius: 10px;
    border: 1px solid var(--modal-border-color);
    background: rgba(255, 255, 255, 0.6);
  }
`;
const TitleInput = styled.input`
  font-size: var(--font-md);
  font-weight: var(--font-semi-bold);
  line-height: 150%;
`;
const ContentTextArea = styled.textarea`
  resize: none;
  height: 181px;
  font-weight: var(--font-regular);
  line-height: normal;
  color: var(--tertiary-font-color);
  font-size: var(--font-md);
`;
const PrivateCheckBtn = styled.button`
  position: relative;
  border-radius: 10px;
  border: 1px solid var(--modal-border-color);
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-md);
  svg {
    transform: rotate(90deg);
  }
  &:active,
  &.active {
    border: 1px solid var(--btn-point-color);
    color: var(--btn-point-color);
    svg {
      transform: rotate(270deg);
      fill: var(--btn-point-color);
    }
  }
`;
const PrivateCheckBtnBox = styled.div`
  min-width: 295px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid var(--modal-border-color);
  background-color: #fff;
  line-height: normal;
  button {
    width: 100%;
    text-align: left;
    padding: 10px 16px;
    border-radius: 9px;
    font-size: var(--font-md);
    &:active,
    &.active {
      color: var(--btn-point-color);
      background-color: #e5dcff;
      font-weight: var(--font-semi-bold);
    }
  }
`;
const BtnBox = styled.div`
  display: flex;
  gap: 8px;
  button {
    font-size: var(--font-md);
    font-weight: var(--font-semi-bold);
  }
`;

export {
  ModalWrap,
  ModalBox,
  ModalForm,
  TitleInput,
  ContentTextArea,
  PrivateCheckBtn,
  PrivateCheckBtnBox,
  BtnBox,
};
