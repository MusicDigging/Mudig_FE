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
  const my_id = 13;
  const user_id = 13;
  const { data: profileData, isLoading: profileLoading } =
    useGetProfile(user_id);
  const { data: followingData, isLoading: followingLoading } =
    useGetFollowing(user_id);
  const { data: followerData, isLoading: followerLoading } =
    useGetFollower(user_id);

  if (profileLoading || followingLoading || followerLoading)
    return <>Loading...</>;

  // console.log(profileData, followerData, followingData);

  return (
    <S.ProfileWrap>
      <ProfileSection
        profileType={user_id === my_id ? 'my' : 'other'}
        data={{
          ...profileData,
          following: followingData,
          follower: followerData,
        }}
      />
      {/* profileData?.profile.rep_playlist && */}
      <MainPlayListSection data={profileData?.profile.rep_playlist} />
      <PlayListSection data={profileData.playlist} />
    </S.ProfileWrap>
  );
}
