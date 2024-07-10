import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PlayList from '../../components/common/PlayList/PlayList';
import PlayListItem from '../../components/common/PlayList/PlayListItem';
import PlayIcon from '../../img/play-icon.svg';
import * as S from '../../pages/Home/HomeStyle';
import { IPlaylistType } from '../../types/playlist';

interface IPlaylistItem {
  id: string;
  thumbnail: string;
  title: string;
  music: string[];
}

interface Props {
  playlistType: IPlaylistType;
  playlistData: IPlaylistItem[];
}

export default function MyPlayListTable({ playlistType, playlistData }: Props) {
  return (
    <MyPlayListTableWrap>
      {playlistType === 'my' && (
        <Link to='/user/profile/my'>
          <S.PlaylistNameBox>
            <h2>내가 생성한 플레이리스트</h2>
            <S.MoreBtn aria-label='더보기' />
          </S.PlaylistNameBox>
        </Link>
      )}
      {playlistData && playlistData.length > 0 ? (
        <PlayListBox>
          <PlayList>
            {playlistData.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/playlist/detail/${item.id}`}
                  state={{ id: item.id }}
                >
                  <PlayListItem
                    img={item.thumbnail}
                    title={item.title}
                    info={`${item.music.length}곡`}
                  >
                    <PlayBtnStyle type='button'>
                      <img
                        id='playImg'
                        src={PlayIcon}
                        alt='재생 바로가기 아이콘'
                      />
                    </PlayBtnStyle>
                  </PlayListItem>
                </Link>
              </li>
            ))}
          </PlayList>
        </PlayListBox>
      ) : (
        <S.MyPlayListNoneInfo>
          <p>앗! 아직 비어있어요.</p>
          <Link to='/playlist/create1'>
            <Link to='/playlist/create1'>플레이리스트 생성하러 가기</Link>
          </Link>
        </S.MyPlayListNoneInfo>
      )}
    </MyPlayListTableWrap>
  );
}

const MyPlayListTableWrap = styled.section`
  border-radius: 8px 8px 0 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PlayListBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 16px 0 16px;
`;

const PlayBtnStyle = styled.button`
  display: flex;
  gap: 4px;

  #playImg {
    width: 14px;
    height: 14px;
  }
`;
