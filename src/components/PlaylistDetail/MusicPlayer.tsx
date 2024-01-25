import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

interface Props {
  pause: boolean;
  setPause: React.Dispatch<React.SetStateAction<boolean>>;
  musicList: string[];
  currMusic: number | null;
  setCurrMusic: React.Dispatch<React.SetStateAction<number | null>>;
}

export default function MusicPlayer(props: Props) {
  const { pause, setPause, musicList, currMusic, setCurrMusic } = props; // 상위 컴포넌트에 playing, setPlaying true로 정의
  const playerRef = useRef<ReactPlayer>(null);
  const [ready, setReady] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);

  const onEnded = () => {
    if (currMusic === musicList.length - 1) setReady(false);
    else setCurrMusic((prev: number | null) => prev && prev + 1);
  };

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  return (
    <>
      <MusicPlayerWrap>
        <ReactPlayer
          url={currMusic !== null ? musicList[currMusic] : ''}
          ref={playerRef}
          className='player'
          playing={!pause} // 재생 상태, true - 재생중 / false - 일시 중지
          controls={false} // 유튜브 재생바 노출 여부
          width='100%'
          height='100%'
          onPlay={() => setPause(false)}
          onPause={() => setPause(true)}
          onEnded={onEnded} // 현재 영상 종료 시
          onReady={() => setReady(true)} // 영상이 로드되어 준비된 상태
          onDuration={setDuration} // 총 재생 시간
          onProgress={({ played }) => !pause && setPlayed(played)} // 현재 재생 시간
        />
        {ready && (
          <ProgressBar>
            <time dateTime='P1S'>{formatTime(played * duration)}</time>
            <input
              type='range'
              min='0'
              max='0.999999'
              step='any'
              value={played}
              style={
                { '--progress': `${played * 100}%` } as React.CSSProperties
              }
              onChange={(e) => {
                setPlayed(parseFloat(e.target.value));
                playerRef.current?.seekTo(parseFloat(e.target.value));
              }}
            />
            <time dateTime='P1S'>{formatTime(duration)}</time>
          </ProgressBar>
        )}
      </MusicPlayerWrap>
    </>
  );
}

const MusicPlayerWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 0;
  padding-top: 56.25%; // 16:9 비율
  top: 0px;
  left: 50%;
  transform: translate(-50%, 0);
  /* margin: 80px 0 25px; */
  z-index: 1;
  .player {
    position: absolute;
    top: 0%;
    left: 0px;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: var(--font-sm);
  color: #fff;
  &:disabled {
    display: none;
  }
  input {
    width: 100%;

    height: 3px;
    border-radius: 10px;
    background: linear-gradient(
      to right,
      #fff var(--progress),
      rgba(250, 250, 250, 0.5) 0
    );

    &::-webkit-slider-thumb {
      -webkit-appearance: none; /* 브라우저의 기본 스타일을 제거 */
      width: 10px; /* 재생 포인트의 너비를 설정 */
      height: 10px; /* 재생 포인트의 높이를 설정 */
      background: #fff; /* 재생 포인트의 배경색을 설정 */
      border-radius: 50%; /* 재생 포인트를 원형으로 만듬 */
      cursor: pointer;
    }
  }
`;
