import React from 'react';
import styled from 'styled-components';
import ProfileImage from '../../components/common/Image/ProfileImage';

import UploadImgBtn from '../../img/selectImg.svg';
import ArrowIcon from '../../img/left-arrow-Icon.svg';

import ProfileInput from '../../components/common/Input/ProfileInput';
export default function EditProfile() {
  return (
    <EditProfileWrap>
      <MoveBackBtn>
        <img src={ArrowIcon} alt='' />
      </MoveBackBtn>
      <ProfileImage src='https://picsum.photos/200/300'>
        <ImgUploadBtn type='button'>
          <img src={UploadImgBtn} alt='이미지 업로드 버튼' />
          <input
            type='file'
            accept='image/jpg,impge/png,image/jpeg'
            style={{ display: 'none' }}
          />
        </ImgUploadBtn>
      </ProfileImage>
      <ProfileInput btnText='변경하기' />
    </EditProfileWrap>
  );
}
const MoveBackBtn = styled.button`
  position: absolute;
  top: 22px;
  left: 16px;
`;

const EditProfileWrap = styled.main`
  padding: 72px 16px 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  gap: 40px;
`;

const ImgUploadBtn = styled.button`
  position: absolute;
  right: -15px;
  bottom: -9px;
  img {
    width: 36px;
  }
`;
