import styled from 'styled-components';
import { Button } from '../Button/Button';
import { ReactComponent as ArrowIcon } from '../../../img/arrow-icon.svg';
import { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { modalAtom } from '../../../atoms/modalAtom';
import { PlayListAtom, toastAtom } from '../../../library/atom';
interface PlaylistDesc {
  title: string;
  content: string;
  is_public: boolean;
}

interface Props {
  playlistDesc: PlaylistDesc;
  setPlaylistDesc: React.Dispatch<React.SetStateAction<PlaylistDesc>>;
}

export default function Modal({ playlistDesc, setPlaylistDesc }: Props) {
  const [playlistInfo, setPlaylistInfo] = useRecoilState(PlayListAtom);
  const [isPrivateView, setIsPrivateView] = useState(false);
  const [isPublic, setIsPublic] = useState(playlistDesc.is_public);
  const [modalOpen, setModalOpen] = useRecoilState(modalAtom);
  const setToast = useSetRecoilState(toastAtom);
  // 모달 Close
  const handleClose = () => {
    setPlaylistDesc(playlistInfo.playlist);
    setModalOpen(false);
  };

  // 공개 여부 토글 view 여부
  const handlePrivateView = () => {
    setIsPrivateView(!isPrivateView);
  };

  const handlePrivateCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    const ButtonType = (e.target as HTMLInputElement).innerText;
    if (ButtonType === '공개') {
      setIsPublic(true);
      setPlaylistDesc({ ...playlistDesc, is_public: true });
    } else if (ButtonType === '비공개') {
      setIsPublic(false);
      setPlaylistDesc({ ...playlistDesc, is_public: false });
    }
    setIsPrivateView(false);
  };

  const changeModifyDesc = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = e.target.value;
    if (e.target.name === 'playlistTitle') {
      setPlaylistDesc({ ...playlistDesc, title: `${value}` });
    } else if (e.target.name === 'playlistDescription') {
      setPlaylistDesc({ ...playlistDesc, content: `${value}` });
    }
  };

  const handleModifyClick = () => {
    if (!playlistDesc.title || !playlistDesc.content) {
      setToast({
        content: '제목과 설명은 필수 입력 항목입니다.',
        type: 'warning',
      });
      return;
    }
    setModalOpen(false);
  };

  return (
    <ModalWrap>
      <ModalBox>
        <ModalForm>
          <label>
            <TitleInput
              type='text'
              name='playlistTitle'
              id='playlistTitle'
              defaultValue={playlistDesc.title || playlistInfo.playlist.title}
              placeholder='플레이리스트의 제목을 입력해주세요.'
              autoComplete='off'
              onChange={changeModifyDesc}
              maxLength={50}
              required
            />
          </label>
          <label>
            <ContentTextArea
              name='playlistDescription'
              id='playlistDescription'
              defaultValue={
                playlistDesc.content || playlistInfo.playlist.content
              }
              placeholder='플레이리스트에 대한 설명을 입력해주세요.'
              autoComplete='off'
              onChange={changeModifyDesc}
              maxLength={150}
              required
            />
          </label>
          <PrivateCheckBtn
            type='button'
            onClick={handlePrivateView}
            className={isPrivateView ? 'active' : ''}
          >
            {isPublic ? '공개' : '비공개'}
            <ArrowIcon fill='black' />
          </PrivateCheckBtn>
          {isPrivateView ? (
            <PrivateCheckBtnBox>
              <ul>
                <li>
                  <button
                    type='button'
                    onClick={handlePrivateCheck}
                    className={isPublic ? 'active' : ''}
                  >
                    공개
                  </button>
                </li>
                <li>
                  <button
                    type='button'
                    onClick={handlePrivateCheck}
                    className={isPublic ? '' : 'active'}
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
                btnWidth='50%'
                btnBgColor='var(--input-background-color)'
                btnColor='var(--sub-font-color)'
                btnBorder='1px solid var(--input-background-color)'
                onClick={handleClose}
              />
              <Button
                type='submit'
                text='수정'
                btnBgColor='#E5DCFF'
                btnWidth='50%'
                btnBorder='none'
                btnColor='var(--btn-point-color)'
                onClick={handleModifyClick}
              />
            </BtnBox>
          )}
        </ModalForm>
      </ModalBox>
    </ModalWrap>
  );
}
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
