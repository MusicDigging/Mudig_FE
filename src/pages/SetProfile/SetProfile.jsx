import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import ProfileImage from '../../components/common/Image/ProfileImage';
import UploadImgBtn from '../../img/selectImg.svg';
import ProfileInput from '../../components/common/Input/ProfileInput';
import { userInfoAtom, isLoginAtom, toastAtom } from '../../library/atom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ImgCompression } from '../../library/ImgCompression';
import { useNavigate } from 'react-router-dom';
import SetProfileImage from '../../components/EditProfile/SetProfileImage';
import BasicProfileImage from '../../img/basic-profile-img.svg';
// import { postUserProfile } from '../../library/apis/api';
import { useUserProfile } from '../../hooks/queries/useUserInfo';
import Toast from '../../components/common/Toast';
export default function SetProfile() {
  const navigate = useNavigate();

  const { mutate: postUserProfile } = useUserProfile();
  const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);
  const setIsLogin = useSetRecoilState(isLoginAtom);
  const [genre, setGenre] = useState([]);
  const [previewImg, setPreviewImg] = useState(BasicProfileImage);
  const [uploadImg, setUploadImg] = useState(null);
  const fileInput = useRef(null);
  const userType = userInfo.type;
  const [toast, setToast] = useRecoilState(toastAtom);
  // 장르 선택 함수 props
  const handleChipSelect = (newSelectedChips) => {
    setGenre(newSelectedChips);
    // console.log('장르선택:', newSelectedChips);
  };

  const selectGenre = genre.join(',');

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append('email', userInfo.email);
    formData.append('password', userInfo.password);
    formData.append('name', data.nickName);
    formData.append('about', data.about || '소개글을 작성해주세요.');
    formData.append('genre', selectGenre);
    if (uploadImg !== null) formData.append('image', uploadImg);

    // console.log(uploadImg);
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
    <SetProfileWrap>
      {toast && (
        <Toast setToast={setToast} text={toast.content} type={toast.type} />
      )}
      <PageNum>2/2</PageNum>
      <SetProfileTitle>
        가입을 축하드려요! <br />
        프로필을 설정해주세요
      </SetProfileTitle>
      <SetProfileBox>
        <SetProfileImage
          src={previewImg}
          fileInput={fileInput}
          setUploadImg={setUploadImg}
          setPreviewImg={setPreviewImg}
        />
        <ProfileInputBox>
          {/* 프로필 설정 input, button  */}
          <ProfileInput
            onSubmit={onSubmit}
            btnText='완료'
            onChipSelect={handleChipSelect}
          />
        </ProfileInputBox>
      </SetProfileBox>
    </SetProfileWrap>
  );
}

const SetProfileWrap = styled.div`
  padding: 56px 16px 24px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SetProfileBox = styled.div`
  margin-top: 58px;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const PageNum = styled.span`
  position: absolute;
  top: 24px;
  right: 16px;
  font-size: var(--font-l);
  color: var(--sub-font-color);
  font-weight: 500;
`;

const SetProfileTitle = styled.h1`
  /* width: 252px; */
  font-size: var(--font-xl);
  font-weight: var(--font-bold);
  line-height: 33px;
`;

const ImgUploadBtn = styled.button`
  position: absolute;
  right: -15px;
  bottom: -9px;
  img {
    width: 36px;
  }
`;

const ProfileInputBox = styled.div`
  height: 100%;
`;
