import React from 'react';
import { useRecoilValue } from 'recoil';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { userInfoAtom } from '../../library/atom';
import { IPlaylistType } from '../../types/playlist';
import * as S from './HomeStyle';
import MyPlayListTable from '../../components/Home/MyPlayListTable';
import NotFound from '../NotFound/NotFound';

// playlistType의 타입 정의
export default function MorePlaylist() {
  const location = useLocation();
  const state = location?.state;
  const { data: playlistData } = state;
  const navigate = useNavigate();
  const { playlistType } = useParams<{ playlistType: IPlaylistType }>();
  const userInfo = useRecoilValue(userInfoAtom);

  if (!playlistData) return null;
  // 컴포넌트 공통 렌더링 로직
  const renderCommonContent = (title: string) => (
    <S.MorePlaylistWrap>
      <S.BackButton onClick={() => navigate(-1)}></S.BackButton>
      <h2 className='morePlaylistName'>{title}</h2>
      <MyPlayListTable
        playlistType={playlistType as IPlaylistType}
        playlistData={playlistData}
      />
    </S.MorePlaylistWrap>
  );

  // 데이터 불러오기 또는 컴포넌트 선택을 위한 로직
  let content;
  switch (playlistType) {
    case 'recommend':
      content = renderCommonContent(`${userInfo.name}님을 위한 플레이리스트`);
      break;
    case 'hot':
      content = renderCommonContent('지금 핫한🔥 플레이리스트');
      break;
    case 'new':
      content = renderCommonContent('신규 플레이리스트');
      break;
    default:
      content = <NotFound />;
  }

  return <div>{content}</div>;
}
