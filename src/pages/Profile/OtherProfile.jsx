import * as S from './ProfileStyle';

import ProfileSection from '../../components/Profile/ProfileSection';
import MainPlayListSection from '../../components/Profile/MainPlayListSection';
import PlayListSection from '../../components/Profile/PlayListSection';

export default function OtherProfile() {
  return (
    <S.ProfileWrap>
      <ProfileSection btnType='follow' />
      <MainPlayListSection />
      <PlayListSection />
    </S.ProfileWrap>
  );
}
