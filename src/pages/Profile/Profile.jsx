import React from 'react';
import ProfileSection from '../../components/Profile/ProfileSection';
import MainPlayListSection from '../../components/Profile/MainPlayListSection';
import PlayListSection from '../../components/Profile/PlayListSection';

import * as S from './ProfileStyle';
  const my_id = 13;
  const user_id = 13;

  return (
    <S.ProfileWrap>
      <ProfileSection
        profileType={user_id === my_id ? 'my' : 'other'}
      />
      <MainPlayListSection />
      <PlayListSection />
    </S.ProfileWrap>
  );
}
