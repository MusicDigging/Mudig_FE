import React from 'react';
import styled from 'styled-components';

import { Image } from '../common/Image/Image';

import VinylImg from '../../img/vinyl-record-img.svg';
import WhitePlayIcon from '../../img/play-icon-white.svg';

export default function MainPlayListSection() {
  return (
    <MainPlayListSectionWrap>
      <PlayListHeader>
        <h2>대표 플레이리스트</h2>
      </PlayListHeader>
      <MainPlayListInfoBox>
        <button>
          <Image src='https://picsum.photos/200' alt='' />
          <img src={VinylImg} alt='레코드 이미지' />
        </button>
        <p>다가오는 크리스마스를 기다리며</p>
        <p>17곡</p>
      </MainPlayListInfoBox>
    </MainPlayListSectionWrap>
  );
}

const MainPlayListSectionWrap = styled.section`
  padding: 24px 24px 14px;
  h2 {
    margin-bottom: 24px;
  }
`;

const PlayListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainPlayListInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    position: relative;
    margin-bottom: 20px;
    height: 150px;
    display: flex;
    align-items: center;
  }
  button::after {
    content: '';
    position: absolute;
    display: inline-block;
    width: 40px;
    height: 40px;
    left: 27%;
    background: url(${WhitePlayIcon}) no-repeat center/contain;
  }

  button + p {
    margin-bottom: 6px;
  }

  p + p {
    color: var(--extra-font-color);
  }
`;
