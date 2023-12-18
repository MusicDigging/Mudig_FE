import React from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../../library/atom'; // 'userInfoAtom'의 실제 경로를 사용하세요
import * as S from './HomeStyle';
import MainHeader from '../../components/common/Header/MainHeader';
import MyPlayListTable from '../../components/Home/MyPlayListTable';
import PlayListTable from '../../components/Home/PlayListTable';
import useGetHome from '../../hooks/queries/useHome';
import Loading from '../../components/Loading/Loading';
import NotFound from '../NotFound/NotFound';

export default function Home() {
  const { data, isLoading, error } = useGetHome();
  const userInfo = useRecoilValue(userInfoAtom); // 유저 정보 가져오기

  if (isLoading) return <Loading isLoading={isLoading} />;
  if (error) return <NotFound />;
  const { liked_playlist, my_playlist, playlist_all, recommend_pli } = data;

  return (
    <S.HomeWrap>
      <MainHeader />
      <S.HomeSection>
        {/* 유저 이름으로 대체 */}
        <h2 id='bold'>{userInfo.name}님을 위한 플레이리스트</h2>
        <PlayListTable
          liSize={{ width: '152px' }}
          playlistData={recommend_pli}
        />
        <h2>지금 핫한🔥 플레이리스트</h2>
        <PlayListTable
          liSize={{ width: '118px' }}
          playlistData={liked_playlist}
        />
        <h2>내가 생성한 플레이리스트</h2>
        <MyPlayListTable playlistData={my_playlist} />
        <h2>신규 플레이리스트</h2>
        <PlayListTable
          liSize={{ width: '118px' }}
          playlistData={playlist_all}
        />
      </S.HomeSection>
    </S.HomeWrap>
  );
}
