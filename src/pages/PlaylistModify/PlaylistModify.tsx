import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalAtom } from '../../atoms/modalAtom';
import Modal from '../../components/common/Modal/Modal';
import PlayListInfo from '../../components/PlaylistDetail/PlayListInfo';
import PlayListModify from '../../components/PlaylistDetail/PlayListModify';
import { useState } from 'react';
import { PlayListAtom, toastAtom } from '../../library/atom';
import Toast from '../../components/common/Toast';

interface PlaylistDesc {
  title: string;
  content: string;
  is_public: boolean;
}
export default function PlaylistModify() {
  const modalOpen = useRecoilValue(modalAtom);
  const [toast, setToast] = useRecoilState(toastAtom);
  const [playlistInfo, setPlaylistInfo] = useRecoilState(PlayListAtom);
  const [playlistDesc, setPlaylistDesc] = useState({
    // 플리 설명 state
    title: playlistInfo.playlist?.title,
    content: playlistInfo.playlist?.content,
    is_public: playlistInfo.playlist?.is_public,
  });
  return (
    <PlaylistModifyBox>
      {toast && (
        <Toast setToast={setToast} text={toast.content} type={toast.type} />
      )}
      {modalOpen && (
        <Modal playlistDesc={playlistDesc} setPlaylistDesc={setPlaylistDesc} />
      )}
      <PlayListInfo
        playlist={playlistInfo.playlist}
        playlistDesc={playlistDesc}
      />
      <PlayListModify playlistDesc={playlistDesc} />
    </PlaylistModifyBox>
  );
}

const PlaylistModifyBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
