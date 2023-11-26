import React from 'react';
import styled from 'styled-components';
import Iframe from 'react-iframe';
import addIcon from '../../src/img/add-icon.svg';
export default function RandomMv() {
  return (
    <PlayerWrap>
      <VideoBox>
        <Iframe
          url='https://www.youtube.com/embed/iUw3LPM7OBU?si=7FvkFDbPbyUI8OPN'
          title='randomMv'
          width='100%'
          height='100%'
          allowFullScreen
        />
      </VideoBox>
      <InfoWrap>
        <InfoBox>
          <p>지극히 사적인 얘기</p>
          <span>다비치 · 조회수 105만회 </span>
        </InfoBox>
        <img src={addIcon} alt='뮤비 추가 버튼' />
      </InfoWrap>
    </PlayerWrap>
  );
}

const PlayerWrap = styled.div`
  padding: 0 16px;
  font-size: var(--font-md);
`;

const VideoBox = styled.div`
  width: 328px;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
`;

const InfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;

const InfoBox = styled.div`
  display: flex;
  gap: 3px;
  flex-direction: column;

  p {
    font-weight: var(--font-bold);
  }

  span {
    color: #575757;
  }
`;
