import React from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../../library/atom';
import * as S from './HomeStyle';
import MainHeader from '../../components/common/Header/MainHeader';
import MyPlayListTable from '../../components/Home/MyPlayListTable';
import PlayListTable from '../../components/Home/PlayListTable';
import useGetHome from '../../hooks/queries/useHome';
import Loading from '../../components/Loading/Loading';
import NotFound from '../NotFound/NotFound';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const { data, isLoading, error } = useGetHome();
  const userInfo = useRecoilValue(userInfoAtom);
  const navigate = useNavigate();
  if (isLoading) return <Loading isLoading={isLoading} />;
  if (error) return <NotFound />;
  const { liked_playlist, my_playlist, playlist_all, recommend_pli } = data;
  const handleMoreClick = (playlistType, data) => {
    navigate(
      `/main/${playlistType}?data=${encodeURIComponent(JSON.stringify(data))}`,
    );
  };

  return (
    <S.HomeWrap>
      <MainHeader />
      <S.HomeSection>
        <S.PlaylistNameBox
          onClick={() => handleMoreClick('recommend', recommend_pli)}
        >
          <h2 id='bold'>{userInfo.name}님을 위한 플레이리스트</h2>
          <S.MoreBtn />
        </S.PlaylistNameBox>
        <PlayListTable
          liSize={{ width: '152px' }}
          playlistData={recommend_pli}
        />
        <S.PlaylistNameBox
          onClick={() => handleMoreClick('hot', liked_playlist)}
        >
          <h2>지금 핫한🔥 플레이리스트</h2>
          <S.MoreBtn />
        </S.PlaylistNameBox>
        <PlayListTable
          liSize={{ width: '118px' }}
          playlistData={liked_playlist}
        />
        <Link to='/user/profile/my'>
          <S.PlaylistNameBox>
            <h2>내가 생성한 플레이리스트</h2>
            <S.MoreBtn />
          </S.PlaylistNameBox>
        </Link>
        {my_playlist && my_playlist.length > 0 ? (
          <MyPlayListTable playlistData={my_playlist} />
        ) : (
          <S.MyPlayListNoneInfo>
            <p id='MyPlayListNoneInfoText'>앗 ! 아직 비어있어요</p>
            <Link to='/playlist/create1'>
              <button id='MyPlayListNoneInfoBtn'>
                플레이리스트 생성하러 가기
              </button>
            </Link>
          </S.MyPlayListNoneInfo>
        )}
        <S.PlaylistNameBox onClick={() => handleMoreClick('new', playlist_all)}>
          <h2>신규 플레이리스트</h2>
          <S.MoreBtn />
        </S.PlaylistNameBox>
        <PlayListTable
          liSize={{ width: '118px' }}
          playlistData={playlist_all}
        />
      </S.HomeSection>
    </S.HomeWrap>
  );
}
