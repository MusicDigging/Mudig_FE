import React, { useState } from 'react';

import styled from 'styled-components';

import { Playlist } from '../../types/playlist';
import { useLikePlaylist } from '../../hooks/queries/usePlaylist';

import MiniModal from '../common/Modal/MiniModal';

import PlayIcon from '../../img/play-icon.svg';
import PauseIcon from '../../img/pause-Icon.svg';
import ShareIcon from '../../img/share-icon.svg';
import LikeIcon from '../../img/like-icon.svg';
import LikeActiveIcon from '../../img/like-active-icon.svg';

interface Props {
  playlist: Playlist;
  playlistId: number;
  pause: boolean;
  setPause: React.Dispatch<React.SetStateAction<boolean>>;
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrMusic: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function MusicPlayBar(props: Props) {
  const {
    playlist,
    playlistId,
    playing,
    setPlaying,
    pause,
    setPause,
    setCurrMusic,
  } = props;

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
      <LikeBtn onClick={handleLikeBtnClick}>
        <img
          src={playlist.like_playlist ? LikeActiveIcon : LikeIcon}
          alt='좋아요'
        />
        <p>{playlist.like_count}</p>
      </LikeBtn>
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
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
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
