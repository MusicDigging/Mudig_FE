import React from 'react';

import ProfileInput from '../../components/common/Input/ProfileInput';
import SetRepPlaylist from '../../components/EditProfile/SetRepPlaylist';

import UploadImgBtn from '../../img/selectImg.svg';
import ArrowIcon from '../../img/left-arrow-Icon.svg';
import * as S from './EditProfileStyle';

export default function EditProfile() {
  const [repPlaylist, setRepPlaylist] = useState(profile.rep_playlist);
  return (
    <S.EditProfileWrap>
      <S.MoveBackBtn to='/user/profile/my'>
        <img src={ArrowIcon} alt='' />
      </S.MoveBackBtn>
        <SetRepPlaylist
          playlist={playlist}
          repPlaylist={repPlaylist}
          setRepPlaylist={setRepPlaylist}
    </S.EditProfileWrap>
  );
}
