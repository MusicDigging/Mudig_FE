import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PlayList from '../../components/common/PlayList/PlayList';
import PlayListItem from '../../components/common/PlayList/PlayListItem';
import PlayIcon from '../../img/play-icon.svg';

interface PlaylistItem {
  id: string;
  thumbnail: string;
  title: string;
  music: string[];
}

interface MyPlayListTableProps {
  playlistData: PlaylistItem[];
}
export default function MyPlayListTable({
  playlistData,
}: MyPlayListTableProps) {
  return (
    <MyPlayListTableWrap>
      <PlayListBox>
        <PlayList>
          {playlistData.map((item) => (
            <Link
              to={`/playlist/detail/${item.id}`}
              key={item.id}
              state={{ id: item.id }}
            >
              <PlayListItem
                key={item.id} // Assuming each item has a unique 'id'
                img={item.thumbnail}
                title={item.title}
                info={`${item.music.length}곡`}
              >
                <PlayBtnStyle type='button'>
                  <img id='playImg' src={PlayIcon} alt='재생 바로가기 아이콘' />
                </PlayBtnStyle>
              </PlayListItem>
            </Link>
          ))}
        </PlayList>
      </PlayListBox>
    </MyPlayListTableWrap>
  );
}

const MyPlayListTableWrap = styled.section`
  border-radius: 8px 8px 0 0;
  background-color: transperate;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 16px 0;
`;

const PlayListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const PlayBtnStyle = styled.button`
  display: flex;
  gap: 4px;

  #playImg {
    width: 14px;
    height: 14px;
  }
`;
