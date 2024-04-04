import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ReactComponent as ArrowIcon } from '../../../img/arrow-icon.svg';
import { modalAtom } from '../../../atoms/modalAtom';
import { PlayListAtom, toastAtom } from '../../../library/atom';
import { Button } from '../Button/Button';
import { IPlaylistDesc } from '../../../types/playlist';
import * as S from './ModifyModalStyle';

interface Props {
  playlistDesc: IPlaylistDesc;
  setPlaylistDesc: React.Dispatch<React.SetStateAction<IPlaylistDesc>>;
  modalRef: React.RefObject<HTMLDivElement>;
  openButtonRef: React.RefObject<HTMLButtonElement>;
}

export default function ModifyModal({
  playlistDesc,
  setPlaylistDesc,
  modalRef,
  openButtonRef,
}: Props) {
  const [playlistInfo, setPlaylistInfo] = useRecoilState(PlayListAtom);
  const [isPrivateView, setIsPrivateView] = useState(false);
  const [isPublic, setIsPublic] = useState(playlistDesc.is_public);
  const [modalOpen, setModalOpen] = useRecoilState(modalAtom);
  const setToast = useSetRecoilState(toastAtom);
  const modifyButtonRef = useRef<HTMLButtonElement>(null);
  // 모달 Close
  const handleClose = () => {
    setPlaylistDesc(playlistInfo.playlist);
    setModalOpen(false);
    openButtonRef.current?.focus();
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

  const handleFocusModal = (e: React.KeyboardEvent) => {
    if (!e.shiftKey && e.keyCode === 9) {
      e.preventDefault();
      modalRef.current?.focus();
    }
  };

  const handleFocusModifyButton = (e: React.KeyboardEvent) => {
    if (e.shiftKey && e.keyCode === 9) {
      e.preventDefault();
      modifyButtonRef.current?.focus();
    }
  };

  useEffect(() => {
    if (modalOpen) {
      modalRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    const escModalClose = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        handleClose();
      }
    };
    window.addEventListener('keydown', escModalClose);
    return () => window.removeEventListener('keydown', escModalClose);
  }, [setModalOpen]);

  return (
    <S.ModalWrap>
      <S.ModalBox
        role='dialog'
        aria-labelledby='modal-modify'
        tabIndex={0}
        ref={modalRef}
      >
        <h3 id='modal-modify' className='a11y-hidden'>
          플레이리스트 설명 수정
        </h3>
        <S.ModalForm>
          <label htmlFor='playlistTitle' className='a11y-hidden'>
            플레이리스트 제목
          </label>
          <S.TitleInput
            type='text'
            name='playlistTitle'
            id='playlistTitle'
            defaultValue={playlistDesc.title || playlistInfo.playlist.title}
            placeholder='플레이리스트의 제목을 입력해주세요.'
            autoComplete='off'
            onChange={changeModifyDesc}
            onKeyDown={handleFocusModifyButton}
            maxLength={50}
            required
          />
          <label htmlFor='playlistDescription' className='a11y-hidden'>
            플레이리스트 설명
          </label>
          <S.ContentTextArea
            name='playlistDescription'
            id='playlistDescription'
            defaultValue={playlistDesc.content || playlistInfo.playlist.content}
            placeholder='플레이리스트에 대한 설명을 입력해주세요.'
            autoComplete='off'
            onChange={changeModifyDesc}
            maxLength={150}
            required
          />
          <S.PrivateCheckBtn
            type='button'
            onClick={handlePrivateView}
            className={isPrivateView ? 'active' : ''}
          >
            {isPublic ? '공개' : '비공개'}
            <ArrowIcon fill='black' />
          </S.PrivateCheckBtn>
          {isPrivateView ? (
            <S.PrivateCheckBtnBox>
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
            </S.PrivateCheckBtnBox>
          ) : (
            <S.BtnBox>
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
                onKeyDown={handleFocusModal}
                ref={modifyButtonRef}
              />
            </S.BtnBox>
          )}
        </S.ModalForm>
      </S.ModalBox>
    </S.ModalWrap>
  );
}
