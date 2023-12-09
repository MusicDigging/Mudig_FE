import styled from 'styled-components';
import TestImg from '../../img/thumbnail-img.svg';
import Mudig from '../../img/playlist-mudig-img.svg';
import PenIcon from '../../img/pen-icon.svg';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MusicPlayer from './MusicPlayer';
import { set } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import MusicPlayer from './MusicPlayer';
import { modalAtom } from '../../atoms/modalAtom';

import PenIcon from '../../img/pen-icon.svg';
import TestImg from '../../img/thumbnail-img.svg';
import Mudig from '../../img/playlist-mudig-img.svg';
import ArrowIcon from '../../img/left-arrow-Icon.svg';

export default function PlayListInfo(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [moreInfoView, setMoreInfoView] = useState(false);
  const [modalOpen, setModalOpen] = useRecoilState(modalAtom);

  const handleMoveBackBtnClick = () => {
    navigate(-1);
  };

  const handleMoreBtn = () => {
    setMoreInfoView(true);
  };
  const handleCloseBtn = () => {
    setMoreInfoView(false);
  };
  const handleModify = () => {
    // Modal Open
    setModalOpen(true);
  };
  const isModifyPath =
    location.pathname.includes('/playlist/detail/') &&
    location.pathname.includes('/edit');
  const isPlaylistSummary = location.pathname.includes('/playlist/summary');
  return (
    <PlayListInfoWrap>
      <MoveBackBtn onClick={handleMoveBackBtnClick}>
        <img src={ArrowIcon} alt='뒤로가기' />
      </MoveBackBtn>
      {isPlaylistSummary && (
        <SummaryTitle>
          드라이브 할 때 듣기 좋은 추천 플레이리스트 입니다!
        </SummaryTitle>
      )}
      {playing ? (
        <MusicPlayer playing={playing} setPlaying={setPlaying} />
      ) : (
        <Thumbnail src={TestImg} alt='썸네일' />
      )}
      <InfoBox>
        {!isPlaylistSummary && <h2>드라이브 할 때 듣기 좋은 K-POP</h2>}
        <div>
          <p>
            아래의 목록은 2010년대 K-POP 장르에 속하는 드라이브 할 때 적합한
            음악들입니다. 즐겁고 발랄한 느낌이 들며 상대방과 귀여운 분위기를
            공유할 수 있을 것입니다. 좋은 데이트를 즐기세요!
          </p>
          {isModifyPath ? (
            <ModifyBtn onClick={handleModify}>
              <img src={PenIcon} alt='수정' />
            </ModifyBtn>
          ) : (
            <MoreBtn onClick={handleMoreBtn}>더보기</MoreBtn>
          )}
        </div>
        <PrivateCheck>비공개</PrivateCheck>
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
const PlayListInfoWrap = styled.section`
  padding-top: 216px;
  position: relative;
  background-color: #c7c6c6;
  line-height: normal;
`;

export const MoveBackBtn = styled.button`
  position: absolute;
  top: 22px;
  left: 16px;
`;

const Thumbnail = styled.img`
  position: absolute;
  top: 76px;
  transform: translate(50%, 0);
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
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 62px 16px 0px;
  background-color: #fff;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  h2 {
    font-size: var(--font-lg);
    font-weight: var(--font-semi-bold);
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
  }
`;

const MoreBtn = styled.button`
      white-space: nowrap;
      color: #575757;
      font-size: var(--font-sm);
`;

const PrivateCheck = styled.p`
  font-size: var(--font-sm);
  color: var(--sub-font-color);
`;
const ThumbnailBlurBox = styled.div`
  position: absolute;
  top: 0;
  width: 360px;
  height: 100%;
  background: rgba(15, 15, 16, 0.8);
  z-index: 3;
`;

const MoreInfoBox = styled.div`
  position: absolute;
  z-index: 3;
  display: flex;
  bottom: 0px;
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
const ModifyBtn = styled.button`
  position: absolute;
  right: 0;
  transform: translate(-50%, -100%);
`;
