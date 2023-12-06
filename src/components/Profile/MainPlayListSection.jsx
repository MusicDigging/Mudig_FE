import React from 'react';
import styled from 'styled-components';

import MainPlayList from './MainPlayList';
import { Image } from '../common/Image/Image';

import NoteIcon from '../../img/note-icon.svg';
import VinylImg from '../../img/vinyl-record-img.svg';
import WhitePlayIcon from '../../img/play-icon-white.svg';
import { Link } from 'react-router-dom';

export default function MainPlayListSection() {
  return (
    <MainPlayListSectionWrap>
      <PlayListHeader>
        <h2>
          대표 플레이리스트 <img src={NoteIcon} alt='음표 아이콘' />
        </h2>
      </PlayListHeader>
      <MainPlayListInfoBox>
        <MainPlayListImg>
          <Image src='https://picsum.photos/200' alt='' />
          <img src={VinylImg} alt='레코드 이미지' />
        </MainPlayListImg>
        <Link>다가오는 크리스마스를 기다리며</Link>
        <p>17곡</p>
      </MainPlayListInfoBox>
      <MainPlayList data={music} />
    </MainPlayListSectionWrap>
  );
}

const MainPlayListSectionWrap = styled.section`
  padding: 24px 24px 14px;
  h2 {
    display: flex;
    align-items: center;
  }
  border-bottom: 6px solid #f1f1f5;
`;

const PlayListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainPlayListInfoBox = styled.div`
  margin: 24px 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;

  a + a {
    margin-bottom: 6px;
  }

  p {
    color: var(--extra-font-color);
  }
`;

const MainPlayListImg = styled(Link)`
  position: relative;
  margin-bottom: 20px;
  height: 150px;
  display: flex;
  align-items: center;
  &::after {
    content: '';
    position: absolute;
    display: inline-block;
    width: 40px;
    height: 40px;
    left: 27%;
    background: url(${WhitePlayIcon}) no-repeat center/contain;
  }
`;
