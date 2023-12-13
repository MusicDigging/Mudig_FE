import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PlayList from '../../components/common/PlayList/PlayList';
import PlayListItem from '../../components/common/PlayList/PlayListItem';
import PlayIcon from '../../img/play-icon.svg';

export default function MyPlayListTable({ playlistData }) {
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
                info={item.music.length}
              >
                <PlayBtnStyle type='button'>
                  <img src={PlayIcon} alt='재생 바로가기 아이콘' />
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
  background-color: #fff;
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
`;
