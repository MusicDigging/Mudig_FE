import React from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { userInfoAtom } from '../../library/atom';
import * as S from './HomeStyle';
import MyPlayListTable from '../../components/Home/MyPlayListTable';
import NotFound from '../NotFound/NotFound';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function MorePlaylist() {
  const navigate = useNavigate();
  const { playlistType } = useParams(); // 여기에서 playlistType은 'recommend', 'hot', 'new' 중 하나가 될 것입니다.
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const data = query.get('data');
  const playlistData = data ? JSON.parse(decodeURIComponent(data)) : null;
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
