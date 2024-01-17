import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import PlayList from '../../components/common/PlayList/PlayList';
import PlayListItem from '../../components/common/PlayList/PlayListItem';
import PlayIcon from '../../img/play-icon.svg';

export default function PlayListSection(props) {
  const { type, isMyProfile, data: playlists } = props;
  const [sortType, setSortType] = useState(playlists.length ? 'latest' : '');

  const handleSortLatestBtn = () => {
    playlists.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setSortType('latest');
  };

  const handleSortPopularBtn = () => {
    playlists.sort((a, b) => b.like_count - a.like_count);
    setSortType('popular');
  };

  return (
    <PlayListSectionWrap
      maxHeight={
        playlists.length === 1
          ? '150px'
          : playlists.length === 2
            ? '230px'
            : '320px'
      }
    >
      <PlayListBox>
        <PlayListHeader>
          <h2>
            {type === 'myPlaylist' &&
              `${isMyProfile ? '내가 ' : ''}생성한 플레이리스트`}
            {type === 'likedPlaylist' && `좋아요 표시한 플레이리스트`}
          </h2>
          <SortBtnBox>
            {type === 'myPlaylist' && (
              <>
                <button
                  value='latest'
                  onClick={handleSortLatestBtn}
                  className={sortType === 'latest' ? 'active' : ''}
                >
                  최신순
                </button>
                |
                <button
                  value='popular'
                  onClick={handleSortPopularBtn}
                  className={sortType === 'popular' ? 'active' : ''}
                >
                  인기순
                </button>
              </>
            )}
          </SortBtnBox>
        </PlayListHeader>
        {playlists.length === 0 && (
          <EmptyPlayList>
            <p>앗 ! 아직 비어있어요</p>
            {isMyProfile && (
              <Link to='/playlist/create1'>플레이리스트 생성하러 가기</Link>
            )}
          </EmptyPlayList>
        )}
        <PlayList>
          {playlists.map((playlist) => (
            <Link
              key={playlist.id}
              to={`/playlist/detail/${playlist.id}`}
              state={{ id: playlist.id }}
            >
              <PlayListItem
                img={`${playlist.thumbnail}`}
                title={playlist.title}
                info={`${playlist.music.length}곡`}
              >
                <PlayBtnStyle type='button'>
                  <img src={PlayIcon} alt='재생 바로가기 아이콘' />
                </PlayBtnStyle>
              </PlayListItem>
            </Link>
          ))}
        </PlayList>
      </PlayListBox>
    </PlayListSectionWrap>
  );
}
const PlayListSectionWrap = styled.section`
  flex: 1 0 auto;
  min-height: ${(props) => props.maxHeight};
  padding: 0px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  h2 {
    font-size: var(--font-md);
    font-weight: var(--font-semi-bold);
  }
  ul {
    flex: 1 0 0;
    overflow-y: scroll;
  }
  ul::-webkit-scrollbar {
    display: none;
  }
`;
const PlayListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 33px;
`;

const SortBtnBox = styled.div`
  display: flex;
  align-items: center;

  button {
    padding: 8px;
    font-size: var(--font-sm);
  }
  button:focus {
    color: var(--btn-border-color);
    outline: none;
  }

  .active {
    color: var(--btn-border-color);
  }
`;

const PlayListBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px 0 16px;
  border-top: 1.5px solid
    ${(props) => (props.isEmpty ? 'transparent' : '#ededed')};
`;

const PlayBtnStyle = styled.button`
  width: 24px;
  display: flex;
  justify-content: center;
  img {
    width: 14px;
  }
  display: flex;
  gap: 4px;
`;

const EmptyPlayList = styled.div`
  padding: 40px;
  height: 100%;
  display: flex;
  gap: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-size: var(--font-lg);
    color: #b0b0b0;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 44px;
    color: var(--main-color);
    border-radius: 10px;
    border: 1px solid #fff;
    background: #f5f2ff;
  }
`;
