import React from 'react';
import styled from 'styled-components';
import VideoPlayer from '../components/RandomMv/VideoPlayer';
import VideoInfo from '../components/RandomMv/VideoInfo';
export default function RandomMv() {
  return (
    <>
      <PlayerWrap>
        <VideoPlayer
          url={'https://www.youtube.com/embed/jIG4AaIy-5k?si=uaOtD3J9A6ul7_ix'}
        />
        <VideoInfo title={'Get A Guitar'} views={'RIIZE · 조회수 428만회'} />
      </PlayerWrap>
      <PlayerWrap>
        <VideoPlayer
          url={'https://www.youtube.com/embed/iTWYa0t5COk?si=Ie3Aly8haYDOIMkM'}
        />
        <VideoInfo
          title={'Sleep Well'}
          views={`${'d4dv'} · 조회수 ${1125}만회 `}
        />
      </PlayerWrap>
      <PlayerWrap>
        <VideoPlayer
          url={'https://www.youtube.com/embed/hLvWy2b857I?si=5PFepg7TfnH6H8we'}
        />
        <VideoInfo
          title={'Perfect Night'}
          views={`${'LE SSERAFIM (르세라핌)'} · 조회수 ${3959}만회 `}
        />
      </PlayerWrap>
    </>
  );
}

const PlayerWrap = styled.div`
  padding: 8px 16px;
  font-size: var(--font-md);
`;
