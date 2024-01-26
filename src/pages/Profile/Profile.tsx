import React from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  useGetProfile,
  useGetFollowing,
  useGetFollower,
} from '../../hooks/queries/useProfile';
import { IPlaylist } from '../../types/playlist';
import { userInfoAtom } from '../../library/atom';

import Loading from '../../components/Loading/Loading';
import ProfileSection from '../../components/Profile/ProfileSection';
import PlayListSection from '../../components/Profile/PlayListSection';
import MainPlayListSection from '../../components/Profile/MainPlayListSection';

import * as S from './ProfileStyle';

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const my_id = useRecoilValue(userInfoAtom)?.id;
  const user_id =
    state?.id ||
    (!isNaN(Number(location.pathname.split('/').pop())) &&
      Number(location.pathname.split('/').pop())) ||
    my_id;
  // Fetching 상태 추가
  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
    // refetch: refetchProfile,
  } = useGetProfile(user_id);

  const {
    data: followingData,
    isLoading: followingLoading,
    isError: followingError,
  } = useGetFollowing(user_id);

  const {
    data: followerData,
    isLoading: followerLoading,
    isError: followerError,
  } = useGetFollower(user_id);

  const isLoading = profileLoading || followingLoading || followerLoading;

  if (isLoading) {
    return <Loading />;
  }

  if (profileError || followingError || followerError) {
    navigate('/*');
    // return;
  }

  const repPlaylist = profileData.playlist.filter(
    (item: IPlaylist) => item.id === profileData.profile.rep_playlist,
  )[0];

  const playlist = profileData.playlist
    .filter((item: IPlaylist) => (my_id !== user_id ? item.is_public : item))
    .sort(
      (a: IPlaylist, b: IPlaylist) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );

  return (
    <S.ProfileWrap>
      <ProfileSection
        isMyProfile={my_id === user_id}
        data={{
          ...profileData,
          following: followingData,
          follower: followerData,
          UserId: user_id,
        }}
      />
      {repPlaylist && <MainPlayListSection data={repPlaylist} />}
      {/* 생성한 플리 */}
      <PlayListSection
        type='myPlaylist'
        data={playlist}
        isMyProfile={my_id === user_id}
        isEmpty={!repPlaylist}
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
