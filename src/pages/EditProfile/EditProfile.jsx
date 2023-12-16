import React, { useState, useRef } from 'react';
import ProfileInput from '../../components/common/Input/ProfileInput';
import SetProfileImage from '../../components/EditProfile/SetProfileImage';
import SetRepPlaylist from '../../components/EditProfile/SetRepPlaylist';

import ArrowIcon from '../../img/left-arrow-Icon.svg';
import * as S from './EditProfileStyle';
import { useLocation } from 'react-router';

export default function EditProfile() {
  const fileInput = useRef(null);
  const location = useLocation();
  const data = location.state;
  const { playlist, profile } = data;
  const [genre, setGenre] = useState(profile?.genre.split(',') || []);
  const [uploadImg, setUploadImg] = useState('');
  const [repPlaylist, setRepPlaylist] = useState(profile.rep_playlist);
  const [previewImg, setPreviewImg] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg',
  );

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('name', data.nickName);
    formData.append('about', data.about);
    formData.append('genre', genre.join(','));
    formData.append('image', uploadImg);
    formData.append('rep_playlist', repPlaylist);
  };

  const handleChipSelect = (newSelectedChips) => {
    setGenre(newSelectedChips);
    console.log('장르선택:', newSelectedChips);
  };

  return (
    <S.EditProfileWrap>
      <S.MoveBackBtn to='/user/profile/my'>
        <img src={ArrowIcon} alt='' />
      </S.MoveBackBtn>
      <SetProfileImage
        src={previewImg}
        fileInput={fileInput}
        setUploadImg={setUploadImg}
        setPreviewImg={setPreviewImg}
      />
      <ProfileInput
        onSubmit={onSubmit}
        profile={profile}
        btnText='변경하기'
        onChipSelect={handleChipSelect}
      >
        <SetRepPlaylist
          playlist={playlist}
          repPlaylist={repPlaylist}
          setRepPlaylist={setRepPlaylist}
        />
      </ProfileInput>
    </S.EditProfileWrap>
  );
}
