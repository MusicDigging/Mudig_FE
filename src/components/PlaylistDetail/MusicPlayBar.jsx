import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { userInfoAtom, PlayListAtom } from '../../library/atom';
import {
  useDeletePlaylist,
  useLikePlaylist,
} from '../../hooks/queries/usePlaylist';

import MiniModal from '../common/Modal/MiniModal';

import PlayIcon from '../../img/play-icon.svg';
import PauseIcon from '../../img/pause-Icon.svg';
import MoreIcon from '../../img/more-icon.svg';
import ShareIcon from '../../img/share-icon.svg';
import LikeIcon from '../../img/like-icon.svg';
import LikeActiveIcon from '../../img/like-active-icon.svg';

export default function MusicPlayBar(props) {
  const navigate = useNavigate();
  const myId = useRecoilValue(userInfoAtom).id;
  const { mutate: deletePlaylist } = useDeletePlaylist();
  const {
    playlist,
    userId,
    playlistId,
    playing,
    setPlaying,
    pause,
    setPause,
    setCurrMusic,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    if (isModalOpen === false) setIsModalOpen(true);
    else setIsModalOpen(false);
  };
  const { mutate: likePlaylist } = useLikePlaylist();

  const handlePlayBtn = () => {
    if (!playing && pause) {
      setPlaying(true);
      setPause(false);
      setCurrMusic(0);
    } else {
      setPause(!pause);
    }
  };

  const handleDeleteBtnClick = () => {
    const id = playlistId;
    deletePlaylist(id, {
      onSuccess: () => {
        alert('플레이리스트가 정상적으로 삭제되었습니다.');
        navigate(-1);
      },
    });
  };

  const handleShareBtnClick = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('URL이 복사되었습니다.');
  };

  const handleLikeBtnClick = () => {
    const data = { playlist_id: playlistId };
    likePlaylist(data);
  };

  return (
    <PlayBarWrap>
      <button onClick={handleShareBtnClick}>
        <img src={ShareIcon} alt='공유하기 버튼' />
      </button>
      <PlayBtn onClick={handlePlayBtn}>
        <img
          src={playing && !pause ? PauseIcon : PlayIcon}
          alt='재생/멈춤 버튼'
        />
      </PlayBtn>
      <MoreBtnBox>
        {userId === myId ? (
          <button onClick={toggleModal}>
            <img src={MoreIcon} alt='더보기 버튼' />
          </button>
        ) : (
          <LikeBtn onClick={handleLikeBtnClick}>
            <img
              src={playlist.like_playlist ? LikeActiveIcon : LikeIcon}
              alt='좋아요'
            />
            <p>{playlist.like_count}</p>
          </LikeBtn>
        )}
        {userId === myId && isModalOpen && (
          <MiniModal>
            <button onClick={handleDeleteBtnClick}>플리 삭제</button>
            <Link
              to={`/playlist/detail/${playlistId}/edit`}
              state={{ id: playlistId }}
            >
              플리 수정
            </Link>
          </MiniModal>
        )}
      </MoreBtnBox>
    </PlayBarWrap>
  );
}

const PlayBarWrap = styled.div`
  background-color: #fff;
  padding: 10px 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 35px;

  button img {
    vertical-align: middle;
  }
`;

const PlayBtn = styled.button`
  width: 62px;
  height: 62px;
  border-radius: 50%;
  box-shadow: 0px -2px 20px 0px rgba(215, 176, 243, 0.25);
`;

const MoreBtnBox = styled.div`
  position: relative;
`;

const LikeBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0px;
  font-size: var(--font-md);
  max-width: 24px;

  p {
    margin-top: 4px;
    height: 24px;
    font-size: var(--font-sm);
    color: var(--sub-font-color);
  }

  img {
    width: 24px;
    height: 100%;
  }
`;
