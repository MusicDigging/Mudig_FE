import React from 'react';
import styled, { keyframes } from 'styled-components';

export default function MusicWave() {
  return (
    <MusicWaveWrap>
      <div className='wave-bar'></div>
      <div className='wave-bar'></div>
      <div className='wave-bar'></div>
    </MusicWaveWrap>
  );
}

const WaveAnimation = keyframes`
  0% {
    height: 4px;
  }

  50% {
    height: 14px;
  }

  100% {
    height: 4px;
  }
`;

const MusicWaveWrap = styled.div`
  width: 32px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 5px;

  .wave-bar {
    width: 1.5px;
    height: 14px;
    border-radius: 10px;
    background-color: #7d4fff;
    animation: ${WaveAnimation} 1s ease-in-out infinite;
  }

  .wave-bar:nth-child(2) {
    animation-delay: 0.1s;
  }

  .wave-bar:nth-child(3) {
    animation-delay: 0.2s;
  }

  .wave-bar:nth-child(4) {
    animation-delay: 0.3s;
  }
`;
