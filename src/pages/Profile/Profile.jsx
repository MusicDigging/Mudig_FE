import React from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation } from 'react-router-dom';

import {
  useGetProfile,
  useGetFollowing,
  useGetFollower,
} from '../../hooks/queries/useProfile';
import { userInfoAtom } from '../../library/atom';

import ProfileSection from '../../components/Profile/ProfileSection';
import MainPlayListSection from '../../components/Profile/MainPlayListSection';
import PlayListSection from '../../components/Profile/PlayListSection';

import * as S from './ProfileStyle';

export default function Profile() {
  const location = useLocation();
  const state = location.state;
  const my_id = useRecoilValue(userInfoAtom).id;
  const user_id =
    state?.id ||
    (!isNaN(location.pathname.split('/').pop()) &&
      location.pathname.split('/').pop()) ||
    my_id;

  const {
    data: profileData,
    isLoading: profileLoading,
    isFetching: profileFetching,
  } = useGetProfile(user_id);
  const { data: followingData, isLoading: followingLoading } =
    useGetFollowing(user_id);
  const { data: followerData, isLoading: followerLoading } =
    useGetFollower(user_id);

  if (profileLoading || profileFetching || followingLoading || followerLoading)
    return;
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
      <PlayListSection data={playlist} isMyProfile={my_id === user_id} />
    </S.ProfileWrap>
  );
}
