import React from 'react';
import styled from 'styled-components';

export function CircleImage({ src, alt }) {
  return <CircleImageStyle src={src} alt={alt} />;
}

export function Image({ src, alt }) {
  return <ImageStyle src={src} alt={alt} />;
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
