import styled from 'styled-components';
import TestImg from '../../img/thumbnail-img.svg';
import Mudig from '../../img/playlist-mudig-img.svg';
import { useState } from 'react';
export default function PlayListInfo() {
  const [moreInfoView, setMoreInfoView] = useState(false);
  const handleMoreBtn = () => {
    setMoreInfoView(true);
  };
  const handleCloseBtn = () => {
    setMoreInfoView(false);
  };
  return (
    <PlayListInfoWrap>
      {moreInfoView && <ThumbnailBox />}
      <img src={TestImg} alt='썸네일' />
      {moreInfoView ? (
        <MoreInfoBox>
          <p>
            아래의 목록은 2010년대 K-POP 장르에 속하는 드라이브 할 때 적합한
            음악들입니다. 즐겁고 발랄한 느낌이 들며 상대방과 귀여운 분위기를
            공유할 수 있을 것입니다. 좋은 데이트를 즐기세요!
          </p>
          <button onClick={handleCloseBtn}>닫기</button>
        </MoreInfoBox>
      ) : (
        <InfoBox>
          <h2>드라이브 할 때 듣기 좋은 K-POP</h2>
          <div>
            <p>
              아래의 목록은 2010년대 K-POP 장르에 속하는 드라이브 할 때 적합한
              음악들입니다. 즐겁고 발랄한 느낌이 들며 상대방과 귀여운 분위기를
              공유할 수 있을 것입니다. 좋은 데이트를 즐기세요!
            </p>
            <button onClick={handleMoreBtn}>더보기</button>
          </div>
        </InfoBox>
      )}
    </PlayListInfoWrap>
  );
}
const PlayListInfoWrap = styled.div`
  position: relative;
  img {
    position: relative;
    transform: translate(50%, 0);
    margin: 80px 0 25px;
    z-index: 2;
  }
`;
const ThumbnailBox = styled.div`
  position: absolute;
  width: 360px;
  height: 342px;
  background: rgba(15, 15, 16, 0.8);
  z-index: 3;
`;
const InfoBox = styled.div`
  padding: 62px 16px 32px;
  background-color: #fff;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  transform: translateY(-50%);
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
const MoreInfoBox = styled.div`
  position: absolute;
  z-index: 3;
  display: flex;
  transform: translateY(-30px);
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
