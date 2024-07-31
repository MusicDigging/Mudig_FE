import styled from 'styled-components';

import { IVideoUrl } from '../../types/RandomMv';
import ReactPlayer from 'react-player';
export default function VideoPlayer({ url }: IVideoUrl) {
  return (
    <VideoBox>
      <ReactPlayer url={url} width='100%' height='100%' controls />
    </VideoBox>
  );
}

const VideoBox = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
`;
