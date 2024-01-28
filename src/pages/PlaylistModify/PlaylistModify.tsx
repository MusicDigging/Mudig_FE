import styled from 'styled-components';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalAtom } from '../../atoms/modalAtom';
import { PlayListAtom } from '../../library/atom';
import Modal from '../../components/common/Modal/Modal';
import PlayListInfo from '../../components/PlaylistDetail/PlayListInfo';
import PlayListModifyList from '../../components/PlaylistDetail/PlayListModifyList';

export default function PlaylistModify() {
  const modalOpen = useRecoilValue(modalAtom);
  const [playlistInfo, setPlaylistInfo] = useRecoilState(PlayListAtom);
  const [playlistDesc, setPlaylistDesc] = useState({
    title: playlistInfo.playlist?.title,
    content: playlistInfo.playlist?.content,
    is_public: playlistInfo.playlist?.is_public,
  });
  return (
    <PlaylistModifyBox>
      {modalOpen && (
        <Modal playlistDesc={playlistDesc} setPlaylistDesc={setPlaylistDesc} />
      )}
      <PlayListInfo
        playlist={playlistInfo.playlist}
        playlistDesc={playlistDesc}
      />
      <PlayListModifyList playlistDesc={playlistDesc} />
    </PlaylistModifyBox>
  );
}

const PlaylistModifyBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
