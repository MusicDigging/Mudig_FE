import { React, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  useGetProfile,
  useGetFollowing,
  useGetFollower,
} from '../../hooks/queries/useProfile';
import { toastAtom, userInfoAtom } from '../../library/atom';

import ProfileSection from '../../components/Profile/ProfileSection';
import MainPlayListSection from '../../components/Profile/MainPlayListSection';
import PlayListSection from '../../components/Profile/PlayListSection';
import Loading from '../../components/Loading/Loading';

import * as S from './ProfileStyle';
import Toast from '../../components/common/Toast';

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
  const [toast, setToast] = useRecoilState(toastAtom);
  // Fetching 상태 추가
  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
    refetch: refetchProfile,
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
      {toast && (
        <Toast setToast={setToast} text={toast.content} type={toast.type} />
      )}
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
