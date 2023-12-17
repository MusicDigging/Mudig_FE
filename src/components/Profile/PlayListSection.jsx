import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import PlayList from '../../components/common/PlayList/PlayList';
import PlayListItem from '../../components/common/PlayList/PlayListItem';

import PlayIcon from '../../img/play-icon.svg';

export default function PlayListSection(props) {
  const { isMyProfile } = props.data;
  const [playlists, setPlaylists] = useState(props.data);

  const handleSortLatestBtn = () => {
    const sortedPlaylists = playlists.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at),
    );
    setPlaylists(sortedPlaylists);
  };

  const handleSortPopularBtn = () => {
    const sortedPlaylists = playlists.sort(
      (a, b) =>
        new Date(b.like_count) - new Date(a.like_count) ||
        new Date(b.created_at) - new Date(a.created_at),
    );
    setPlaylists(sortedPlaylists);
  };

  return (
    <PlayListSectionWrap>
      <PlayListBox>
        <PlayListHeader>
          <h2>{isMyProfile && '내가'} 생성한 플레이리스트</h2>
          {
            <SortBtnBox>
              <button onClick={handleSortLatestBtn}>최신순</button>|
              <button onClick={handleSortPopularBtn}>인기순</button>
            </SortBtnBox>
          }
        </PlayListHeader>
        {playlists.length === 0 && (
          <EmptyPlayList>
            <p>생성한 플레이리스트가 없습니다.</p>
            <Link to='/playlist/create1'>플레이리스트 생성하러 가기</Link>
          </EmptyPlayList>
        )}
        <PlayList>
          {playlists.map((playlist) => (
            <Link
              to={`/playlist/detail/${playlist.id}`}
              key={playlist.id}
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
  padding: 24px 16px 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: #fff;
  h2 {
    font-size: var(--font-md);
  }
`;
const PlayListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  }
`;

const PlayListBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
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
    font-size: var(--font-l);
    color: var(--sub-font-color);
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 44px;
    color: white;
    border-radius: 10px;
    border: 1px solid #fff;
    background: #7d4fff;
  }
`;
