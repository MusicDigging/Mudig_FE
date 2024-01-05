import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useDeletePlaylist } from '../../hooks/queries/usePlaylist';
import { modalAtom } from '../../atoms/modalAtom';
import { userInfoAtom } from '../../library/atom';

import { MiniModalWrap } from '../common/Modal/MiniModal';
import { Image, CircleImage } from '../common/Image/Image';

import PenIcon from '../../img/pen-icon.svg';
import MoreIcon from '../../img/more-icon.svg';
import MudigIcon from '../../img/playlistinfo-mudig.svg';
import ArrowIcon from '../../img/left-arrow-Icon.svg';
import ProfileBadge from '../../img/badge-icon.svg';

export default function PlayListInfo(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { user, playlist, playlistDesc, playing } = props;
  const myId = useRecoilValue(userInfoAtom).id;
  const [moreInfoView, setMoreInfoView] = useState(false);
  const [miniModalOpen, setMiniModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useRecoilState(modalAtom);
  const { mutate: deletePlaylist } = useDeletePlaylist();
  const isModifyPath =
    location.pathname.includes('/playlist/detail/') &&
    location.pathname.includes('/edit');
  const isPlaylistSummary = location.pathname.includes('/playlist/summary');

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
    setModalOpen(true);
  };

  const toggleModal = () => {
    if (miniModalOpen === false) setMiniModalOpen(true);
    else setMiniModalOpen(false);
  };

  const handleDeleteBtnClick = () => {
    const id = playlist.id;
    deletePlaylist(id, {
      onSuccess: () => {
        queryClient.removeQueries('get-playlist-detail');
        alert('플레이리스트가 정상적으로 삭제되었습니다.');
        navigate(-1);
      },
    });
  };

  return (
    <PlayListInfoWrap
      isPlaylistSummary={isPlaylistSummary}
      backgroundUrl={`https://mudigbucket.s3.ap-northeast-2.amazonaws.com/${playlist.thumbnail}`}
    >
      {!isPlaylistSummary && (
        <MoveBackBtn onClick={handleMoveBackBtnClick}>
          <img src={ArrowIcon} alt='뒤로가기' />
        </MoveBackBtn>
      )}
      {(!isPlaylistSummary || isModifyPath) && (
        <MoreBtnBox>
          {user?.id === myId && (
            <button onClick={toggleModal}>
              <img src={MoreIcon} alt='더보기 버튼' />
            </button>
          )}
          {user?.id === myId && miniModalOpen && (
            <MiniModalStyle>
              <button onClick={handleDeleteBtnClick}>플리 삭제</button>
              <Link
                to={`/playlist/detail/${playlist?.id}/edit`}
                state={{ id: playlist?.id }}
              >
                플리 수정
              </Link>
            </MiniModalStyle>
          )}
        </MoreBtnBox>
      )}
      {!playing && (
        <ThumbnailBox isPlaylistSummary={isPlaylistSummary}>
          {isPlaylistSummary && <SummaryTitle>{playlist.title}</SummaryTitle>}
          <Image src={playlist.thumbnail} alt='썸네일' />
        </ThumbnailBox>
      )}
      <InfoBox isPlaylistSummary={isPlaylistSummary}>
        {!isPlaylistSummary && (
          <Title>
            <h2>{playlistDesc?.title || playlist?.title}</h2>
            {isModifyPath && (
              <ModifyBtn onClick={handleModify}>
                <img src={PenIcon} alt='수정' />
              </ModifyBtn>
            )}
          </Title>
        )}
        {!isModifyPath && !isPlaylistSummary && (
          <WriterInfo to={`/user/profile/${user.id}`} state={{ id: user.id }}>
            <CircleImage src={user.image} alt='프로필 이미지' />
            <img src={ProfileBadge} alt='프로필 작성자 배지' />
            <p>{user.name}</p>
          </WriterInfo>
        )}
        <Desc>
          <p>{playlistDesc?.content || playlist?.content}</p>
          {!isModifyPath && <MoreBtn onClick={handleMoreBtn}>더보기</MoreBtn>}
        </Desc>
        <PrivateCheck>
          {(isModifyPath ? playlistDesc?.is_public : playlist.is_public)
            ? '공개'
            : '비공개'}
        </PrivateCheck>
      </InfoBox>
      {/* 더보기 박스 */}
      {moreInfoView && (
        <>
          <ThumbnailBlurBox />
          <MoreInfoBox>
            <h2>{playlistDesc?.title || playlist?.title}</h2>
            <WriterInfo to={`/user/profile/${user.id}`} state={{ id: user.id }}>
              <CircleImage src={user.image} alt='프로필 이미지' />
              <img src={ProfileBadge} alt='프로필 작성자 배지' />
              <p>{user.name}</p>
            </WriterInfo>
            <div>
              <p>{playlistDesc?.content || playlist?.content}</p>
              <button onClick={handleCloseBtn}>닫기</button>
            </div>
          </MoreInfoBox>
        </>
      )}
    </PlayListInfoWrap>
  );
}
const PlayListInfoWrap = styled.section`
  position: relative;
  padding-top: ${(props) => (props.isPlaylistSummary ? '270px' : ' 216px')};
  line-height: normal;

  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(${(props) => props.backgroundUrl}) lightgray 50% / cover
      no-repeat;
    -webkit-filter: blur(10px);
    -moz-filter: blur(10px);
    -o-filter: blur(10px);
    -ms-filter: blur(10px);
    filter: blur(10px);
    transform: scale(1.05);
    z-index: -1;
  }
`;

export const MoveBackBtn = styled.button`
  position: absolute;
  top: 22px;
  left: 16px;
  filter: invert(100%) sepia(75%) saturate(1%) hue-rotate(10deg)
    brightness(104%) contrast(101%);
  z-index: 5;
`;

const ThumbnailBox = styled.div`
  position: absolute;
  width: 180px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  top: 0;
  left: 50%;
  transform: ${(props) =>
    props.isPlaylistSummary
      ? 'translate(-50%, 56px)'
      : 'translate(-50%, 30px)'};
  img {
    height: 180px;
  }
`;
const SummaryTitle = styled.h2`
  width: 180px;
  text-align: center;
  word-break: keep-all;
  line-height: normal;
  font-size: var(--font-lg);
  font-weight: var(--font-semi-bold);
  color: #fff;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: ${(props) =>
    props.isPlaylistSummary ? '53px 16px 0' : '47px 16px 0'};
  background-color: #fff;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const Title = styled.div`
  width: 100%;
  display: flex;

  justify-content: space-between;
  h2 {
    width: 100%;
    font-size: var(--font-lg);
    font-weight: var(--font-semi-bold);
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    white-space: normal;
  }
`;

const Desc = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 16px;
  p {
    color: var(--sub-font-color);
    font-size: var(--font-sm);
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    white-space: normal;
  }
`;

const ModifyBtn = styled.button`
  height: 24px;
`;

const WriterInfo = styled(Link)`
  display: flex;
  gap: 8px;
  align-items: center;

  img:first-child {
    width: 24px;
    height: 24px;
  }

  p {
    font-size: var(--font-sm);
    font-weight: var(--font-semi-bold);
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
  height: 90%;
  backdrop-filter: blur(2px);
  z-index: 3;
`;

const MoreInfoBox = styled.div`
  position: absolute;
  width: 100%;
  z-index: 3;
  display: flex;
  bottom: 17px;
  flex-direction: column;
  gap: 8px;
  padding: 24px 16px 0px;
  background: linear-gradient(180deg, #f5f2ff 0%, #fff 100%);
  color: var(--tertiary-font-color);
  font-size: var(--font-sm);
  line-height: normal;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  h2 {
    width: 100%;
    color: var(--font-color);
    font-size: var(--font-lg);
    font-weight: var(--font-semi-bold);
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-16px, -99%);
    width: 110px;
    height: 76px;
    background: url(${MudigIcon}) no-repeat center/contain;
  }
  button {
    float: right;
    color: var(--font-color);
    font-weight: var(--font-regular);
    align-self: flex-end;
  }
`;

const MoreBtnBox = styled.div`
  position: absolute;
  top: 22px;
  right: 16px;
  z-index: 5;
  img {
    filter: invert(100%) sepia(75%) saturate(1%) hue-rotate(10deg)
      brightness(104%) contrast(101%);
  }
`;
const MiniModalStyle = styled(MiniModalWrap)`
  right: 0;
  top: 32px;
`;
