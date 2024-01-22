import { useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate, useLocation } from 'react-router';

import { FormData, Profile } from '../../types/profile';
import { toastAtom, userInfoAtom } from '../../library/atom';
import { useEditProfile } from '../../hooks/queries/useProfile';
import { useMyPlayList } from '../../hooks/queries/usePlaylist';

import Toast from '../../components/common/Toast';
import ProfileInput from '../../components/common/Input/ProfileInput';
import SetRepPlaylist from '../../components/EditProfile/SetRepPlaylist';
import SetProfileImage from '../../components/EditProfile/SetProfileImage';

import ArrowIcon from '../../img/left-arrow-Icon.svg';
import * as S from './EditProfileStyle';
import React from 'react';

export default function EditProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInput = useRef<HTMLInputElement>(null);
  const data = location.state as { profile: Profile };
  const { profile } = data;
  const { data: myPlaylistData, isLoading } = useMyPlayList();
  const [genre, setGenre] = useState<string[]>(profile?.genre.split(',') || []);
  const [uploadImg, setUploadImg] = useState<File | null>(null);
  const [toast, setToast] = useRecoilState(toastAtom);
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const [repPlaylist, setRepPlaylist] = useState<number | null>(
    profile.rep_playlist,
  );
  const [previewImg, setPreviewImg] = useState<string>(
    profile.image ||
      'https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg',
  );

  const { mutate: editProfile } = useEditProfile();

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    const genreArr = genre.join(',');

    formData.append('name', data.nickName);
    formData.append('about', data.about);
    formData.append('genre', genreArr);
    if (repPlaylist !== null) {
      formData.append('rep_playlist', repPlaylist.toString());
    }
    if (uploadImg !== null) formData.append('image', uploadImg);
    editProfile(formData, {
      onSuccess: () => {
        setToast({ content: '프로필 수정이 완료되었습니다.', type: 'success' });
        // userInfoAtom 상태 업데이트
        navigate(-1);
        setUserInfo((prevUserInfo) => {
          if (prevUserInfo !== null) {
            return {
              ...prevUserInfo,
              name: data.nickName,
              about: data.about,
              rep_playlist: repPlaylist,
              genre: genreArr,
            };
          } else {
            return prevUserInfo;
          }
        });
      },
    });
  };

  const handleChipSelect = (newSelectedChips: string[]) => {
    setGenre(newSelectedChips);
  };

  const handleMoveBackBtnClick = () => {
    navigate(-1);
  };

  if (isLoading) return null;

  return (
    <S.EditProfileWrap>
      {toast && (
        <Toast setToast={setToast} text={toast.content} type={toast.type} />
      )}
      <S.MoveBackBtn onClick={handleMoveBackBtnClick}>
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
            publicPlaylist={myPlaylistData.myplaylist}
            repPlaylist={repPlaylist}
            setRepPlaylist={setRepPlaylist}
          />
        </ProfileInput>
      </S.EditProfileBox>
    </S.EditProfileWrap>
  );
}