import React from 'react';
import styled from 'styled-components';

import { CircleImage } from './Image';

import DefauldImg from '../../../img/basic-profile-img.svg';
import ProfileDecoImg from '../../../img/profile-deco-img.svg';

export default function ProfileImage(props) {
  const { src, alt, children } = props;
  const filteredSrc =
    src?.startsWith('karlo') || src?.startsWith('profile')
      ? `https://mudigbucket.s3.ap-northeast-2.amazonaws.com/${src}`
      : src || DefauldImg;

  return (
    <ProfileImgBox>
      <CircleImage src={filteredSrc} alt={alt || '프로필 이미지'} />
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
