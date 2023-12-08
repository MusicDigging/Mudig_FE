import React from 'react';

import {
  useGetProfile,
  useGetFollowing,
  useGetFollower,
} from '../../hooks/queries/useProfile';

import ProfileSection from '../../components/Profile/ProfileSection';
import MainPlayListSection from '../../components/Profile/MainPlayListSection';
import PlayListSection from '../../components/Profile/PlayListSection';

import * as S from './ProfileStyle';

export default function Profile(props) {
  const my_id = 25;
  const user_id = 12;
  const { data: profileData, isLoading: profileLoading } =
    useGetProfile(user_id);
  const { data: followingData, isLoading: followingLoading } =
    useGetFollowing(user_id);
  const { data: followerData, isLoading: followerLoading } =
    useGetFollower(user_id);

  if (profileLoading || followingLoading || followerLoading)
    return <>Loading...</>;

  const repPlaylist = profileData.playlist.filter(
    (item) => item.id === profileData.profile.rep_playlist,
  )[0];
  const playlist = profileData.playlist.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at),
  );
  console.log(repPlaylist);
  return (
    <S.ProfileWrap>
      <ProfileSection
        isMyProfile={my_id === user_id ? true : false}
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
