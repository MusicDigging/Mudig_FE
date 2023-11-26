import React from 'react';
import styled from 'styled-components';
import { CircleImage } from '../../components/common/Image/Image';
import ProfileDecoImg from '../../img/profile-deco-img.svg';
import UploadImgBtn from '../../img/selectImg.svg';
import ProfileInput from '../../components/common/Input/ProfileInput';
export default function SetProfile() {
  return (
    <SetProfileWrap>
      <PageNum>2/2</PageNum>
      <SetProfileBox>
        <SetProfileTitle>
          가입을 축하드려요! <br />
          프로필을 설정해주세요
        </SetProfileTitle>
      </SetProfileBox>
      <ProfileImgBox>
        <CircleImage src='https://picsum.photos/200/300' alt='프로필 이미지' />
        <ImgUploadBtn type='button'>
          <img src={UploadImgBtn} alt='이미지 업로드 버튼' />
          <input
            type='file'
            accept='image/jpg,impge/png,image/jpeg'
            style={{ display: 'none' }}
          />
        </ImgUploadBtn>
      </ProfileImgBox>

      <ProfileInput />
    </SetProfileWrap>
  );
}

const SetProfileWrap = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const SetProfileBox = styled.div`
  display: flex;
  position: relative;
  top: 56px;
  left: 16px;
  line-height: 27px;
`;

const PageNum = styled.span`
  position: absolute;
  top: 24px;
  left: 317px;
  font-size: var(--font-lg);
  color: var(--sub-font--color);
  font-weight: 500;
`;

const SetProfileTitle = styled.h1`
  width: 252px;
  font-size: var(--font-xl);
  font-weight: var(--font-bold);
  line-height: 33px;
`;

const ProfileImgBox = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  top: 179px;
  left: 50%;
  transform: translate(-50%, -70%);
  &::after {
    content: '';
    background: url(${ProfileDecoImg}) no-repeat center/contain;
    display: inline-block;
    position: absolute;
    width: 120px;
    height: 60px;
    top: -50%;
    left: 50%;
    transform: translate(-50%, 50%);
  }
`;

const ImgUploadBtn = styled.button`
  position: absolute;
  right: -15px;
  bottom: -9px;
  img {
    width: 36px;
  }
`;
