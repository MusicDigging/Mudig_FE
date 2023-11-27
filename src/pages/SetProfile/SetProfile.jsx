import React from 'react';
import styled from 'styled-components';
import ProfileImage from '../../components/common/Image/ProfileImage';
import UploadImgBtn from '../../img/selectImg.svg';
import ProfileInput from '../../components/common/Input/ProfileInput';
export default function SetProfile() {
  return (
    <SetProfileWrap>
      <PageNum>2/2</PageNum>
      <SetProfileTitle>
        가입을 축하드려요! <br />
        프로필을 설정해주세요
      </SetProfileTitle>
      <SetProfileBox>
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

        <ProfileInput btnText='다음' />
      </SetProfileBox>
    </SetProfileWrap>
  );
}

const SetProfileWrap = styled.main`
  padding: 56px 16px 24px;
  display: flex;
  flex-direction: column;
`;

const SetProfileBox = styled.div`
  margin-top: 58px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 53px;
`;

const PageNum = styled.span`
  position: absolute;
  top: 24px;
  left: 317px;
  font-size: var(--font-lg);
  color: var(--sub-font-color);
  font-weight: 500;
`;

const SetProfileTitle = styled.h1`
  width: 252px;
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
