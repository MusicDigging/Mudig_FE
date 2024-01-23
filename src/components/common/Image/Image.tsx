import React from 'react';
import styled from 'styled-components';

import DefaultImg from '../../../img/basic-profile-img.svg';

export interface Props {
  src: string | undefined;
  alt?: string;
  children?: React.ReactNode;
}

export function Image({ src, alt }: Props) {
  // 이미지 주소 필터링
  const filteredSrc =
    src?.startsWith('karlo') || src?.startsWith('profile')
      ? `https://mudigbucket.s3.ap-northeast-2.amazonaws.com/${src}`
      : src;
  return <ImageStyle src={filteredSrc} alt={alt} />;
}

export function CircleImage({ src, alt }: Props) {
  let filteredSrc;
  if (src === 'profile/basic.png') {
    filteredSrc = DefaultImg;
  } else if (src?.startsWith('karlo') || src?.startsWith('profile')) {
    filteredSrc = `https://mudigbucket.s3.ap-northeast-2.amazonaws.com/${src}`;
  } else {
    filteredSrc = src;
  }
  return <CircleImageStyle src={filteredSrc} alt={alt} />;
}

export const ImageStyle = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
  object-position: 50% 0;
`;

const CircleImageStyle = styled(ImageStyle)`
  border-radius: 50%;
`;
