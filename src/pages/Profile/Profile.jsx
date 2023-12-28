import { React, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  useGetProfile,
  useGetFollowing,
  useGetFollower,
} from '../../hooks/queries/useProfile';
import { userInfoAtom } from '../../library/atom';

import ProfileSection from '../../components/Profile/ProfileSection';
import MainPlayListSection from '../../components/Profile/MainPlayListSection';
import PlayListSection from '../../components/Profile/PlayListSection';
import Loading from '../../components/Loading/Loading';

import * as S from './ProfileStyle';

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const my_id = useRecoilValue(userInfoAtom).id;
  const user_id =
    state?.id ||
    (!isNaN(location.pathname.split('/').pop()) &&
      location.pathname.split('/').pop()) ||
    my_id;

  // Fetching 상태 추가
  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
    isFetching: profileFetching,
    refetch: refetchProfile,
  } = useGetProfile(user_id);

  const {
    data: followingData,
    isLoading: followingLoading,
    isError: followingError,
    isFetching: followingFetching,
    refetch: refetchFollowing,
  } = useGetFollowing(user_id);

  const {
    data: followerData,
    isLoading: followerLoading,
    isError: followerError,
    isFetching: followerFetching,
    refetch: refetchFollower,
  } = useGetFollower(user_id);

  useEffect(() => {
    // user_id 변경 시 데이터를 새로 가져오기
    // 프로필, 팔로잉, 팔로워 데이터 fetch 로직
    refetchProfile();
    refetchFollowing();
    refetchFollower();
  }, [user_id]); // user_id가 변경될 때만 실행
  // isLoading 및 isFetching 통합
  const isLoading = profileLoading || followingLoading || followerLoading;
  const isFetching = profileFetching || followingFetching || followerFetching;
  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (profileError || followingError || followerError) {
    navigate('/*');
    return;
  }

  const repPlaylist = profileData.playlist.filter(
    (item) => item.id === profileData.profile.rep_playlist,
  )[0];
  const playlist = profileData.playlist
    .filter((item) => (my_id !== user_id ? item.is_public : item))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <S.ProfileWrap>
      <ProfileSection
        isMyProfile={my_id === user_id}
        data={{
          ...profileData,
          following: followingData,
          follower: followerData,
        }}
      />
      {repPlaylist && <MainPlayListSection data={repPlaylist} />}
      {/* 생성한 플리 */}
      <PlayListSection
        type='myPlaylist'
        data={playlist}
        isMyProfile={my_id === user_id}
      />
      {/* 좋아요한 플리 */}
      {profileData.liked_playlists.length > 0 && (
        <PlayListSection
          type='likedPlaylist'
          data={profileData?.liked_playlists}
          isMyProfile={my_id === user_id}
        />
      )}
    </S.ProfileWrap>
  );
}
