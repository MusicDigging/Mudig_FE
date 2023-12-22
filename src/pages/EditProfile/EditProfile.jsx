import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router';

import { useEditProfile } from '../../hooks/queries/useProfile';

import ProfileInput from '../../components/common/Input/ProfileInput';
import SetRepPlaylist from '../../components/EditProfile/SetRepPlaylist';
import SetProfileImage from '../../components/EditProfile/SetProfileImage';

import ArrowIcon from '../../img/left-arrow-Icon.svg';
import * as S from './EditProfileStyle';

export default function EditProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInput = useRef(null);
  const data = location.state;
  const { playlist, profile } = data;
  const [genre, setGenre] = useState(profile?.genre.split(',') || []);
  const [uploadImg, setUploadImg] = useState(null);
  const [repPlaylist, setRepPlaylist] = useState(profile.rep_playlist);
  const [previewImg, setPreviewImg] = useState(
    profile.image ||
      'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg',
  );
  const { mutate: editProfile } = useEditProfile();

  const onSubmit = async (data) => {
    const formData = new FormData();
    const genreArr = genre.join(',');

    formData.append('name', data.nickName);
    formData.append('about', data.about);
    formData.append('genre', genreArr);
    formData.append('rep_playlist', repPlaylist);
    if (uploadImg !== null) formData.append('image', uploadImg);
    editProfile(formData, {
      onSuccess: () => {
        alert('프로필 수정이 완료되었습니다.');
        navigate(-1);
      },
    });
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
      <S.EditProfileBox>
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
      </S.EditProfileBox>
    </S.EditProfileWrap>
  );
}
