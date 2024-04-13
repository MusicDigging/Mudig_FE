import { useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalAtom } from '../../atoms/modalAtom';
import { PlayListAtom } from '../../library/atom';
import Modal from '../../components/common/Modal/ModifyModal';
import PlayListInfo from '../../components/PlaylistDetail/PlayListInfo';
import PlayListModifyList from '../../components/PlaylistDetail/PlayListModifyList';
import Information from '../../components/PlaylistDetail/\bPlaylistInfo/PlaylistInfo';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from '../../img/left-arrow-Icon.svg';
import { MoveBackBtn } from '../PlaylistDetail/PlaylistDetail';

export default function PlaylistModify() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalAtom);
  const playlistInfo = useRecoilValue(PlayListAtom);
  const [playlistDesc, setPlaylistDesc] = useState({
    title: playlistInfo.playlist?.title,
    content: playlistInfo.playlist?.content,
    is_public: playlistInfo.playlist?.is_public,
  });
  const modalRef = useRef(null);
  const openButtonRef = useRef(null);
  const handleOpenModifyModal = () => {
    setIsModalOpen(true);
  };
  const handleMoveBackBtnClick = () => {
    navigate(-1);
  };
  return (
    <div>
      <h1 className='a11y-hidden'>플레이리스트 수정</h1>
      <MoveBackBtn onClick={handleMoveBackBtnClick}>
        <img src={ArrowIcon} alt='뒤로가기' />
      </MoveBackBtn>
      {isModalOpen && (
        <Modal
          playlistDesc={playlistDesc}
          setPlaylistDesc={setPlaylistDesc}
          modalRef={modalRef}
          openButtonRef={openButtonRef}
        />
      )}
      {/* <PlayListInfo
        playlist={playlistInfo.playlist}
        playlistDesc={playlistDesc}
        openButtonRef={openButtonRef}
      /> */}
      <Information>
        <Information.Thumbnail />
        <Information.InfoBox>
          <Information.Title modifiedTitle={playlistDesc.title} />
          <Information.ModifyBtn
            isOpenModifyModal={handleOpenModifyModal}
            openButtonRef={openButtonRef}
          />
          <Information.Desc modifiedContent={playlistDesc.content} />
          <Information.PrivateIndicator
            modifiedPublic={playlistDesc.is_public}
          />
        </Information.InfoBox>
      </Information>
      <PlayListModifyList playlistDesc={playlistDesc} />
    </div>
  );
}
