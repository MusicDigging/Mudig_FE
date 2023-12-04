import { useQuery } from 'react-query';
import React from 'react';

import { axiosInstance } from '../../library/apis/axiosInstance';

import ProfileSection from '../../components/Profile/ProfileSection';
import MainPlayListSection from '../../components/Profile/MainPlayListSection';
import PlayListSection from '../../components/Profile/PlayListSection';

import * as S from './ProfileStyle';

export default function MyProfile(props) {
  const { user_id } = props;
  const { isLoading, data, isError, error } = useQuery('get-profile', () => {
    return axiosInstance.get('/user/profile/pcohad14/');
  });

  console.log(data);

  if (isLoading) return <>Loading...</>;
  if (isError) return <>{error.message}</>;

  return (
    <S.ProfileWrap>
      <ProfileSection btnType='edit' />
      <MainPlayListSection />
      <PlayListSection />
    </S.ProfileWrap>
  );
}
