import styled from 'styled-components';
import TestImg from '../../img/thumbnail-img.svg';
import Mudig from '../../img/playlist-mudig-img.svg';

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
export default function PlayListInfo() {
  const location = useLocation();
  const [moreInfoView, setMoreInfoView] = useState(false);
  const handleMoreBtn = () => {
    setMoreInfoView(true);
  };
  const handleCloseBtn = () => {
    setMoreInfoView(false);
  };
  return (
    <PlayListInfoWrap>
      {location.pathname === '/playlist/summary' && (
        <SummaryTitle>
          드라이브 할 때 듣기 좋은 추천 플레이리스트 입니다!
        </SummaryTitle>
      )}
      <img src={TestImg} alt='썸네일' />
      <InfoBox>
        {location.pathname !== '/playlist/summary' && (
          <h2>드라이브 할 때 듣기 좋은 K-POP</h2>
        )}
        <div>
          <p>
            아래의 목록은 2010년대 K-POP 장르에 속하는 드라이브 할 때 적합한
            음악들입니다. 즐겁고 발랄한 느낌이 들며 상대방과 귀여운 분위기를
            공유할 수 있을 것입니다. 좋은 데이트를 즐기세요!
          </p>
          <button onClick={handleMoreBtn}>더보기</button>
        </div>
      </InfoBox>
      {moreInfoView && (
        <>
          <ThumbnailBlurBox />
          <MoreInfoBox>
            <p>
              아래의 목록은 2010년대 K-POP 장르에 속하는 드라이브 할 때 적합한
              음악들입니다. 즐겁고 발랄한 느낌이 들며 상대방과 귀여운 분위기를
              공유할 수 있을 것입니다. 좋은 데이트를 즐기세요!
            </p>
            <button onClick={handleCloseBtn}>닫기</button>
          </MoreInfoBox>
        </>
      )}
    </PlayListInfoWrap>
  );
}
const PlayListInfoWrap = styled.div`
  position: relative;
  background-color: #c7c6c6;
  img {
    transform: translate(50%, 20%);
    margin: 40px 0 0;
    z-index: 2;
  }
`;
const SummaryTitle = styled.h2`
  top: 0;
  left: 0;
  transform: translate(50%, 130%);
  width: 180px;
  text-align: center;
  word-break: keep-all;
  line-height: normal;
  font-size: var(--font-lg);
  font-weight: var(--font-semi-bold);
`;
const InfoBox = styled.div`
  padding: 62px 16px 32px;
  background-color: #fff;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  h2 {
    font-size: var(--font-lg);
    font-weight: var(--font-semi-bold);
    margin-bottom: 8px;
  }
  div {
    display: flex;
    align-items: center;
    p {
      color: var(--sub-font-color);
      font-size: var(--font-sm);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    button {
      white-space: nowrap;
      color: #575757;
      font-size: var(--font-sm);
    }
  }
`;
const ThumbnailBlurBox = styled.div`
  position: absolute;
  top: 0;
  width: 360px;
  height: 346px;
  background: rgba(15, 15, 16, 0.8);
  z-index: 3;
`;
const MoreInfoBox = styled.div`
  position: absolute;
  z-index: 3;
  display: flex;
  bottom: 10px;
  flex-direction: column;
  padding: 16px;
  background-color: var(--playlist-info-bg-color);
  color: #fff;
  font-size: var(--font-sm);
  line-height: normal;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-10%, -99%);
    width: 124px;
    height: 78px;
    background: url(${Mudig}) no-repeat center/contain;
  }
  button {
    color: var(--playlist-info-sub-color);
    font-weight: var(--font-regular);
    align-self: flex-end;
  }
`;
