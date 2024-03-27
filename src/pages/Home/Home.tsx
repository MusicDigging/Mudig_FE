import React from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../../library/atom';
import * as S from './HomeStyle';
import MainHeader from '../../components/common/Header/MainHeader';
import PlayListTable from '../../components/Home/PlayListTable';
import MyPlayListTable from '../../components/Home/MyPlayListTable';
import useGetHome from '../../hooks/queries/useHome';
import Loading from '../../components/Loading/Loading';
import NotFound from '../NotFound/NotFound';

export default function Home() {
  const { data, isLoading, error } = useGetHome();
  const userInfo = useRecoilValue(userInfoAtom);

  if (isLoading) return <Loading isLoading={isLoading} />;
  if (error) return <NotFound />;

  const { liked_playlist, my_playlist, playlist_all, recommend_pli } = data;

  return (
    <>
      <MainHeader />
      <S.HomeWrap>
        <S.HomeSection>
          {/* 추천 플레이리스트 섹션 */}
          <PlayListTable
            title={`${userInfo.name}님을 위한 플레이리스트`}
            playlistData={recommend_pli}
            liSize={{ width: '152px' }}
            moreLink='/main/recommend'
          />

          {/* 인기 플레이리스트 섹션 */}
          <PlayListTable
            title='지금 핫한🔥 플레이리스트'
            playlistData={liked_playlist}
            liSize={{ width: '118px' }}
            moreLink='/main/hot'
          />

          {/* 내가 생성한 플레이리스트 섹션 */}
          <MyPlayListTable playlistData={my_playlist} />

          {/* 신규 플레이리스트 섹션 */}
          <PlayListTable
            title='신규 플레이리스트'
            playlistData={playlist_all}
            liSize={{ width: '118px' }}
            moreLink='/main/new'
          />
        </S.HomeSection>
      </S.HomeWrap>
    </>
  );
}
