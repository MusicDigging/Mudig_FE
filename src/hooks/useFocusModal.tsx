import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { modalAtom } from '../atoms/modalAtom';

interface Props {
  modalRef: React.RefObject<HTMLDivElement>; // modal에 포커스를 이동할 수 있도록 modal 컨테이너의 Ref를 전달받음
}
// 키보드 접근 시 모달 포커스 유지할 수 있는 hooks
export default function useFocusModal({ modalRef }: Props) {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalAtom);

  // 모달로 포커스 이동 (keyCode 9는 Tab)
  const handleFocusModal = (
    e: React.KeyboardEvent,
    modalRef: React.RefObject<HTMLDivElement>,
  ) => {
    if (!e.shiftKey && e.keyCode === 9) {
      e.preventDefault();
      modalRef.current?.focus();
    }
  };

  const handleFocusLastButton = (
    e: React.KeyboardEvent,
    lastBtnRef: React.RefObject<HTMLButtonElement>,
  ) => {
    if (e.shiftKey && e.keyCode === 9) {
      e.preventDefault();
      lastBtnRef.current?.focus();
    }
  };

  const escModalClose = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      modalRef.current?.focus();
    }

    window.addEventListener('keydown', escModalClose);
    return () => window.removeEventListener('keydown', escModalClose);
  }, []);

  return { handleFocusModal, handleFocusLastButton };
}
