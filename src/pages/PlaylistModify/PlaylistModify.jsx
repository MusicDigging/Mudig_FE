import React from 'react';
import { useRecoilValue } from 'recoil';
import { modalAtom } from '../../atoms/modalAtom';
import Modal from '../../components/common/Modal/Modal';
import PlayListInfo from '../../components/PlaylistDetail/PlayListInfo';
import PlayListModify from '../../components/PlaylistDetail/PlayListModify';
export default function PlaylistModify() {
  const modalOpen = useRecoilValue(modalAtom);
  return (
    <>
      {modalOpen && <Modal />}
      <PlayListInfo />
      <PlayListModify />
    </>
  );
}
