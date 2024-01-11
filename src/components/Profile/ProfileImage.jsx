import React from 'react';
import styled from 'styled-components';

import { CircleImage } from '../../components/common/Image/Image';

import ProfileDecoImg from '../../img/profile-deco-img.svg';
export default function ProfileImage() {
  return (
    <ProfileImgBox>
      <CircleImage src='https://picsum.photos/200/300' alt='프로필 이미지' />
    </ProfileImgBox>
  );
}

const ProfileImgBox = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  margin-bottom: 16px;

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
