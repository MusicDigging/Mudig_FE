import React, { useState, useRef } from 'react';
import ProfileInput from '../../components/common/Input/ProfileInput';
import { userInfoAtom, isLoginAtom, signUpInfoAtom } from '../../library/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import SetProfileImage from '../../components/EditProfile/SetProfileImage';
import BasicProfileImage from '../../img/basic-profile-img.svg';
import * as S from './SetProfileStyle';
import { useUserProfile } from '../../hooks/queries/useUserInfo';
import { IUserProfile } from '../../types/profile';
const formData = new FormData();
export default function SetProfile() {
  const navigate = useNavigate();
  const { mutate: postUserProfile } = useUserProfile();
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const signupInfo = useRecoilValue(signUpInfoAtom);
  const setIsLogin = useSetRecoilState(isLoginAtom);
  const [genre, setGenre] = useState<string[]>([]);
  const [previewImg, setPreviewImg] = useState(BasicProfileImage);
  const [uploadImg, setUploadImg] = useState<File | null>(null);
  const fileInput = useRef(null);

  const handleChipSelect = (newSelectedChips: string[]) => {
    setGenre(newSelectedChips);
  };

  const selectGenre = genre.join(',');

  const handleUserInfo = (data: IUserProfile) => {
    formData.append('email', signupInfo.email);
    formData.append('password', signupInfo.password ?? '');
    formData.append('name', data.nickName);
    formData.append('about', data.about || '소개글을 작성해주세요.');
    formData.append('genre', selectGenre);
    if (uploadImg !== null) formData.append('image', uploadImg);
  };

  const SubmitUserProfile = async (data: IUserProfile) => {
    handleUserInfo(data);
    postUserProfile(formData, {
      onSuccess: (data) => {
        const { user, token } = data;
        const { id, email, name, image, genre, about, rep_playlist } = user;
        const { access, refresh } = token;
        localStorage.setItem('token', access);
        localStorage.setItem('refreshToken', refresh);
        setIsLogin(true);
        setUserInfo({
          id,
          email,
          name,
          image,
          genre,
          about,
          rep_playlist,
          token,
        });
        navigate('/main');
      },
      onError: (error) => {
        console.error('유저 등록 실패', error);
      },
    });
  };

  return (
    <S.SetProfileWrap>
      <S.PageNum>2/2</S.PageNum>
      <S.SetProfileTitle>
        가입을 축하드려요! <br />
        프로필을 설정해주세요
      </S.SetProfileTitle>
      <S.SetProfileBox>
        <SetProfileImage
          src={previewImg}
          fileInput={fileInput}
          setUploadImg={setUploadImg}
          setPreviewImg={setPreviewImg}
        />
        <S.ProfileInputBox>
          <ProfileInput
            onSubmit={SubmitUserProfile}
            btnText='완료'
            onChipSelect={handleChipSelect}
          />
        </S.ProfileInputBox>
      </S.SetProfileBox>
    </S.SetProfileWrap>
  );
}
