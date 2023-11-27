import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';

export default function MusicPlayer(props) {
  const { playing, setPlaying, playlist } = props; // 상위 컴포넌트에 playing, setPlaying true로 정의
  const [curr, setCurr] = useState(
    'https://youtu.be/sqgxcCjD04s?si=ePXJiYzUtjTZ7g_e',
  );

  const onEnded = () => {
    setCurr('https://youtu.be/ZXmoJu81e6A?si=cqMWOLxy-4PF0dxg');
    setPlaying(true);
  };

  return (
    <>
      <MusicPlayerWrap>
        <ReactPlayer
          className='player'
          playing={playing} // 재생 상태, true - 재생중 / false - 일시 중지
          url={curr} // 링크 배열로 삽입 가능(종료 시 onEnded없이도 자동으로 다음 인덱스의 링크 재생)
          controls={false} // 유튜브 재생바 노출 여부
          width='100%'
          height='100%'
          borderRadius='10pxs'
          poster={'https://picsum.photos/200'}
          onEnded={onEnded} // 현재 영상 종료 시
        />
      </MusicPlayerWrap>
    </>
  );
}

const MusicPlayerWrap = styled.div`
  position: relative;
  border-radius: 10px;
  width: 328px;
  height: 180px;
  left: 50%;
  transform: translate(-50%, 0);
  margin: 80px 0 25px;
  z-index: 2;
  .player {
    position: absolute;
    top: 0%;
    left: 0px;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;
  }
`;
