import React from 'react';
import styled from 'styled-components';
import { CircleImage } from '../../components/common/Image/Image';
import UploadProfile from '../../components/common/\bUploadProfile/UploadProfile';
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
      <ImageBox>
        {/* <CircleImage src={ProfileImg} alt='프로필이미지'></CircleImage> */}
        <UploadProfile />
      </ImageBox>
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
  line-height: 33px;
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
`;

const ImageBox = styled.div`
  width: 90px;
  height: 90px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
