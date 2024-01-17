import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useGetPlaylistMusic } from '../../hooks/queries/usePlaylist';

import MainPlayList from './MainPlayList';
import { Image } from '../common/Image/Image';

import NoteIcon from '../../img/note-icon.svg';
import VinylImg from '../../img/vinyl-record-img.svg';
import WhitePlayIcon from '../../img/play-icon-white.svg';

export default function MainPlayListSection(props) {
  const { id, title, thumbnail, music } = props.data;
  const { data: musicData, isLoading: musicLoading } =
    useGetPlaylistMusic(music);

  if (musicLoading) return;

  return (
    <MainPlayListSectionWrap>
      <PlayListHeader>
        <h2>
          대표 플레이리스트 <img src={NoteIcon} alt='음표 아이콘' />
        </h2>
      </PlayListHeader>
      <MainPlayListInfoBox>
        <Link to={`/playlist/detail/${id}`} state={{ id }}>
          <MainPlayListImgBox>
            <Thumbnail>
              <Image src={thumbnail} alt='플레이리스트 썸네일' />
            </Thumbnail>
            <img src={VinylImg} alt='레코드 이미지' />
          </MainPlayListImgBox>
          <h4>{title}</h4>
        </Link>
        <p>{music.length}곡</p>
      </MainPlayListInfoBox>
      <MainPlayList id={id} data={musicData} />
    </MainPlayListSectionWrap>
  );
}

const MainPlayListSectionWrap = styled.section`
  padding: 24px 0px 24px 24px;
  h2 {
    display: flex;
    align-items: center;
    font-size: var(--font-lg);
    font-weight: var(--font-semi-bold);
  }
`;

const PlayListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainPlayListInfoBox = styled.div`
  padding: 24px 24px 16px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  h4 {
    text-align: center;
    margin-bottom: 6px;
    height: 20px;
  }

  p {
    color: var(--extra-font-color);
  }
`;

const MainPlayListImgBox = styled.div`
  position: relative;
  margin-bottom: 20px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Thumbnail = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  &::after {
    content: '';
    position: absolute;
    display: inline-block;
    width: 40px;
    height: 40px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: url(${WhitePlayIcon}) no-repeat center/contain;
  }
`;
