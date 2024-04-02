import { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { modalAtom } from '../../atoms/modalAtom';
import { PlayListAtom } from '../../library/atom';
import Modal from '../../components/common/Modal/Modal';
import PlayListInfo from '../../components/PlaylistDetail/PlayListInfo';
import PlayListModifyList from '../../components/PlaylistDetail/PlayListModifyList';

export default function PlaylistModify() {
  const modalOpen = useRecoilValue(modalAtom);
  const playlistInfo = useRecoilValue(PlayListAtom);
  const [playlistDesc, setPlaylistDesc] = useState({
    title: playlistInfo.playlist?.title,
    content: playlistInfo.playlist?.content,
    is_public: playlistInfo.playlist?.is_public,
  });
  const modalRef = useRef(null);
  const openButtonRef = useRef(null);
  return (
    <div>
      <h1 className='a11y-hidden'>플레이리스트 수정</h1>
      {modalOpen && (
        <Modal
          playlistDesc={playlistDesc}
          setPlaylistDesc={setPlaylistDesc}
          modalRef={modalRef}
          openButtonRef={openButtonRef}
        />
      )}
      <PlayListInfo
        playlist={playlistInfo.playlist}
        playlistDesc={playlistDesc}
        openButtonRef={openButtonRef}
      />
      <PlayListModifyList playlistDesc={playlistDesc} />
    </div>
  );
}
