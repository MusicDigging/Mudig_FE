import React from 'react';
import * as S from './HomeStyle';
import MainHeader from '../../components/common/Header/MainHeader';
import MyPlayListTable from '../../components/Home/MyPlayListTable';
import PlayListTable from '../../components/Home/PlayListTable';
import useGetHome from '../../hooks/queries/useHome';
// import { privateInstance } from '../../library/apis/axiosInstance';
import Loading from '../../components/Loading/Loading';
import NotFound from '../NotFound/NotFound';
import { useRecoilState } from 'recoil';
import { userInfoAtom } from '../../library/atom';

export default function Home() {
  // privateInstance
  //   .get('/playlist/')
  //   .then((response) => {
  //     console.log(response.data); // 여기에서 응답 데이터를 처리합니다.
  //   })
  //   .catch((error) => {
  //     console.error('API 요청 중 오류 발생:', error);
  //   });
  const { data, isLoading, error } = useGetHome();
  // const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  // const userAccountname = userInfo.accountname;
  // console.log(userInfo);
  if (isLoading) return <Loading isLoading={isLoading} />;
  if (error) return <NotFound />;
  const { liked_playlist, my_playlist, playlist_all, recommend_pli } = data;
  // console.log({ liked_playlist, my_playlist, playlist_all, recommend_pli });
  return (
    <S.HomeWrap>
      <MainHeader />
      <S.HomeSection>
        <h2 id='bold'>고길동2님을 위한 플레이리스트</h2>
        <PlayListTable
          liSize={{ width: '152px' }}
          playlistData={liked_playlist}
        />
        <h2>지금 핫한🔥 플레이리스트</h2>
        <PlayListTable
          liSize={{ width: '118px' }}
          playlistData={recommend_pli}
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
