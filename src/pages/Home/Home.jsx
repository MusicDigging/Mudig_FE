import React from 'react';
import { useRecoilValue } from 'recoil';
import { userInfoAtom } from '../../library/atom'; // Use the actual path of 'userInfoAtom'
import * as S from './HomeStyle';
import MainHeader from '../../components/common/Header/MainHeader';
import MyPlayListTable from '../../components/Home/MyPlayListTable';
import PlayListTable from '../../components/Home/PlayListTable';
import useGetHome from '../../hooks/queries/useHome';
import Loading from '../../components/Loading/Loading';
import NotFound from '../NotFound/NotFound';
import { Link } from 'react-router-dom';

export default function Home() {
  const { data, isLoading, error } = useGetHome();
  const userInfo = useRecoilValue(userInfoAtom); // Fetch user info

  if (isLoading) return <Loading isLoading={isLoading} />;
  if (error) return <NotFound />;
  const { liked_playlist, my_playlist, playlist_all, recommend_pli } = data;

  return (
    <S.HomeWrap>
      <MainHeader />
      <S.HomeSection>
        {/* Replace with user's name */}
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
        <h2>신규 플레이리스트</h2>
        <PlayListTable
          liSize={{ width: '118px' }}
          playlistData={playlist_all}
        />
      </S.HomeSection>
    </S.HomeWrap>
  );
}
