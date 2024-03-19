import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PlayList from '../../components/common/PlayList/PlayList';
import PlayListItem from '../../components/common/PlayList/PlayListItem';
import PlayIcon from '../../img/play-icon.svg';

interface IPlaylistItem {
  id: string;
  thumbnail: string;
  title: string;
  music: string[];
}

interface Props {
  playlistData: IPlaylistItem[];
}
export default function MyPlayListTable({ playlistData }: Props) {
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
                key={item.id}
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
