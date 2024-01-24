import React from 'react';
import { useRecoilValue } from 'recoil';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { userInfoAtom } from '../../library/atom';
import * as S from './HomeStyle';
import MyPlayListTable from '../../components/Home/MyPlayListTable';
import NotFound from '../NotFound/NotFound';

// playlistType의 타입 정의
type PlaylistType = 'recommend' | 'hot' | 'new';

// playlistData의 구조에 대한 타입 정의 (예시)
interface PlaylistData {
  // 데이터 구조에 맞게 타입을 정의합니다.
}

export default function MorePlaylist() {
  const navigate = useNavigate();
  const { playlistType } = useParams<{ playlistType: PlaylistType }>(); // useParams 타입 지정
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const data = query.get('data');
  const playlistData: PlaylistData = data
    ? JSON.parse(decodeURIComponent(data))
    : null; // JSON.parse에 대한 타입 지정
  const userInfo = useRecoilValue(userInfoAtom);

  // 데이터 불러오기 또는 컴포넌트 선택을 위한 로직
  let content;
  switch (playlistType) {
    case 'recommend':
      // 'recommend' 경로에 대한 데이터 또는 컴포넌트
      content = (
        <S.MorePlaylistWrap>
          <S.BackButton onClick={() => navigate(-1)}></S.BackButton>
          <h2 className='morePlaylistName'>
            {userInfo.name}님을 위한 플레이리스트
          </h2>
          <MyPlayListTable playlistData={playlistData} />
        </S.MorePlaylistWrap>
      );
      break;
    case 'hot':
      // 'hot' 경로에 대한 데이터 또는 컴포넌트
      content = (
        <S.MorePlaylistWrap>
          <S.BackButton onClick={() => navigate(-1)}></S.BackButton>
          <h2 className='morePlaylistName'>지금 핫한🔥 플레이리스트</h2>
          <MyPlayListTable playlistData={playlistData} />
        </S.MorePlaylistWrap>
      );
      break;
    case 'new':
      // 'new' 경로에 대한 데이터 또는 컴포넌트
      content = (
        <S.MorePlaylistWrap>
          <S.BackButton onClick={() => navigate(-1)}></S.BackButton>
          <h2 className='morePlaylistName'>신규 플레이리스트</h2>
          <MyPlayListTable playlistData={playlistData} />
        </S.MorePlaylistWrap>
      );
      break;
    default:
      // 일치하는 경로가 없을 경우
      content = <NotFound />;
  }

  return <div>{content}</div>;
}
