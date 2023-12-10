import styled from 'styled-components';
import { Button } from '../Button/Button';
import { ReactComponent as ArrowIcon } from '../../../img/arrow-icon.svg';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalAtom } from '../../../atoms/modalAtom';
import { PlayListAtom } from '../../../library/atom';
export default function Modal() {
  const [playlistData, setPlaylistData] = useRecoilState(PlayListAtom);
  const [isPrivateView, setIsPrivateView] = useState(false);
  const [isPrivate, setIsPrivate] = useState(true);
  const [modalOpen, setModalOpen] = useRecoilState(modalAtom);
  const handleClose = () => {
    setModalOpen(false);
  };
  const handlePrivateView = () => {
    setIsPrivateView(!isPrivateView);
  };
  const handlePrivateCheck = (e) => {
    const ButtonType = e.target.innerText;
    if (ButtonType === '공개') {
      setIsPrivate(false);
    } else {
      setIsPrivate(true);
    }
    setIsPrivateView(false);
  };
  console.log('modal: ', playlistData);
  return (
    <ModalWrap>
      <ModalBox>
        <ModalForm>
          <label>
            <TitleInput
              type='text'
              name='playlistTitle'
              id='playlistTitle'
              defaultValue={playlistData.playlist.title}
              placeholder='플레이리스트의 제목을 입력해주세요.'
            />
          </label>
          <label>
            <ContentInput
              type='text'
              name='playlistDescription'
              id='playlistDescription'
              defaultValue={playlistData.playlist.content}
              placeholder='플레이리스트에 대한 설명을 입력해주세요.'
            />
          </label>
          <PrivateCheckBtn
            type='button'
            onClick={handlePrivateView}
            className={isPrivateView ? 'active' : ''}
          >
            {isPrivate ? '비공개' : '공개'}
            <ArrowIcon fill='black' />
          </PrivateCheckBtn>
          {isPrivateView ? (
            <PrivateCheckBtnBox>
              <ul>
                <li>
                  <button
                    type='button'
                    onClick={handlePrivateCheck}
                    className={isPrivate ? '' : 'active'}
                  >
                    공개
                  </button>
                </li>
                <li>
                  <button
                    type='button'
                    onClick={handlePrivateCheck}
                    className={isPrivate ? 'active' : ''}
                  >
                    비공개
                  </button>
                </li>
              </ul>
            </PrivateCheckBtnBox>
          ) : (
            <BtnBox>
              <Button
                text='취소'
                btnWidth='143px'
                btnBgColor='var(--input-background-color)'
                btnColor='var(--font-color)'
                btnBorder='1px solid var(--input-background-color)'
                onClick={handleClose}
              />
              <Button text='수정' btnWidth='143px' />
            </BtnBox>
          )}
        </ModalForm>
      </ModalBox>
    </ModalWrap>
  );
}
const ModalWrap = styled.div`
  position: absolute;
  z-index: 100;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;
const ModalBox = styled.div`
  height: 393px;
  position: absolute;
  top: 25%;
  left: 5%;
  width: 327px;
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
    border: 1px solid var(--border-color);
    background: rgba(255, 255, 255, 0.6);
  }
`;
const TitleInput = styled.input`
  font-size: var(--font-md);
  font-weight: var(--font-semi-bold);
  line-height: 150%;
`;
const ContentInput = styled.textarea`
  resize: none;
  height: 181px;
  font-weight: var(--font-regular);
  line-height: normal;
`;
const PrivateCheckBtn = styled.button`
  position: relative;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  padding: 8px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  position: relative;
  width: 295px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background-color: #fff;
  font-size: var(--font-md);
  line-height: normal;
  button {
    width: 100%;
    text-align: left;
    padding: 10px 16px;
    border-radius: 9px;
    &:active,
    &.active {
      color: #fff;
      background-color: var(--playlist-info-bg-color);
    }
  }
`;
const BtnBox = styled.div`
  display: flex;
  gap: 8px;
`;
