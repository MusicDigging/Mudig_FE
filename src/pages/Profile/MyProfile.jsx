import React from 'react';

import ProfileSection from '../../components/Profile/ProfileSection';
import MainPlayListSection from '../../components/Profile/MainPlayListSection';
import PlayListSection from '../../components/Profile/PlayListSection';

import * as S from './ProfileStyle';

export default function MyProfile() {
  return (
    <S.ProfileWrap>
      <ProfileSection btnType='edit' />
      <MainPlayListSection />
      <PlayListSection />
    </S.ProfileWrap>
  );
}
