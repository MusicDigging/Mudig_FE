import React from 'react';
import styled from 'styled-components';
import Iframe from 'react-iframe';
export default function VideoPlayer({ url }) {
  return (
    <VideoBox>
      <Iframe
        url={url}
        title='MusicVideo'
        width='100%'
        height='100%'
        allowFullScreen
      />
    </VideoBox>
  );
}

const VideoBox = styled.div`
  width: 328px;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
`;
