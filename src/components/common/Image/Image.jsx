import React from 'react';
import styled from 'styled-components';

import DefaultImg from '../../../img/default-user-img.svg';

export function Image({ src, alt }) {
  // 이미지 주소 필터링
  const filterdSrc =
    src?.startsWith('karlo') || src?.startsWith('profile')
      ? `https://mudigbucket.s3.ap-northeast-2.amazonaws.com/${src}`
      : src;
  return <ImageStyle src={filterdSrc} alt={alt} />;
}

export function CircleImage({ src, alt }) {
  const filterdSrc =
    src?.startsWith('karlo') || src?.startsWith('profile')
      ? `https://mudigbucket.s3.ap-northeast-2.amazonaws.com/${src}`
      : src || DefaultImg;
  return <CircleImageStyle src={filterdSrc} alt={alt} />;
}

export const ImageStyle = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
  object-position: 0 0;
`;

const CircleImageStyle = styled(ImageStyle)`
  border-radius: 50%;
`;
