import React from 'react';
import styled from 'styled-components';

import { CircleImage } from './Image';

import ProfileDecoImg from '../../../img/profile-deco-img.svg';

export default function ProfileImage(props) {
  const { src, alt, children } = props;
  return (
    <ProfileImgBox>
      <CircleImage src={src} alt={alt || '프로필 이미지'} />
      {children}
    </ProfileImgBox>
  );
}

const ProfileImgBox = styled.div`
  position: relative;
  width: 80px;
  height: 80px;

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
